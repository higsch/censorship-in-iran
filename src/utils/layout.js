import { Delaunay } from 'd3';
import { createSimulation } from './force';
import { summitSort } from './math';

const goldenRatio = (1 + Math.sqrt(5)) / 2;
const irrational2 = 1 + Math.sqrt(2);
const irrational3 = (9 + Math.sqrt(221)) / 10;

const radiusFactor = 1;

const layoutPhyllotaxis = (
    data,
    radiusScale,
    lastId,
    radius = 2,
    radiusOffset = radius / 2,
    spacing = 2.5,
    theta = 2 * Math.PI / irrational2
  ) => {
  const scaledSpacing = radiusScale(spacing);
  const scaledRadiusOffset = radiusScale(radiusOffset);

  // add dummy data for clipping
  const finalRadius = scaledSpacing * Math.sqrt(lastId) + scaledRadiusOffset;
  const nDummies = Math.round(2 * finalRadius * Math.PI / (2 * radius + scaledSpacing));
  const addedData = Array.from({length: nDummies}).map((_) => {
    return {
      id: ++lastId,
      draw: false
    };
  });
  const extendedData = [...data.map((d) => ({...d, draw: true})), ...addedData];

  const phyllotaxisData = extendedData.map((d, i) => {
    const scaledTheta = theta * i;
    const scaledRadius = scaledSpacing * Math.sqrt(i) + scaledRadiusOffset;

    return {
      ...d,
      r: radiusScale(radius),
      x: Math.cos(scaledTheta) * scaledRadius,
      y: Math.sin(scaledTheta) * scaledRadius,
      withinClusterIndex: i
    };
  });

  return {
    phyllotaxisData,
    lastId
  };
};

const layoutVoronoi = (cluster) => {
  const { outerR: r, data } = cluster;
  const delaunay = Delaunay.from(data, (d) => d.x, (d) => d.y);
  const voronoi = delaunay.voronoi([-r, -r, r, r]);
  const voronoiData = data.map((d, i) => {
    return {
      ...d,
      voronoiPath: voronoi.renderCell(i)
    };
  });

  return {
    ...cluster,
    delaunay,
    data: voronoiData
  };
};

export const batchLayoutClusters = (selectedGrouping, selectedColor, data, radiusScale) => {
  const { values, name: groupingName } = selectedGrouping;
  const clusters = values.map((v) => v.value);

  let lastId = Math.max(...data.map((d) => +d.id));

  const clustersData = clusters.map((cluster) => {
    const clusterData = data.filter((d) => d[groupingName] === cluster);
    if (selectedColor) {
      clusterData.sort((a, b) => a[selectedColor.name] < b[selectedColor.name] ? 1 : -1);
    }
    const { phyllotaxisData, lastId: newLastId } = layoutPhyllotaxis(clusterData, radiusScale, lastId);
    lastId = newLastId;
    return phyllotaxisData;
  })
  .map((d, i) => {
    return {
      id: i,
      name: clusters[i],
      r: Math.max(...d.filter((dd) => dd.draw).map((dd) => [Math.abs(dd.x), Math.abs(dd.y)]).flat()),
      outerR: Math.max(...d.map((dd) => [Math.abs(dd.x), Math.abs(dd.y)]).flat()),
      color: selectedGrouping.color,
      data: d,
      length: d.filter((d) => d.draw).length
    };
  })
  .map((d) => {
    const voronoiData = layoutVoronoi(d);
    return voronoiData;
  });

  return clustersData;
};

export const layoutForce = (clustersData, width, height) => {
  return new Promise((resolve) => {
    let data = [...clustersData];

    function simulationTicked() {
      data = data.map((d) => {
        const radius = d.r * radiusFactor;
        return {
          ...d,
          x: Math.max(-width / 2 + radius, Math.min(width / 2 - radius, d.x)),
          y: Math.max(-height / 2 + radius, Math.min(height / 2 - radius, d.y))
        }
      });
    }

    function simulationEnded() {
      resolve(data);
    }

    createSimulation(clustersData, simulationTicked, simulationEnded);
  });
};

export const layoutBar = (clustersData, width, height, minimalSpacing = width / 2) => {
  const data = [...clustersData];
  data.sort((a, b) => a.r > b.r ? -1 : 1);

  // distribute the clusters to different bars
  let barId = 0;
  const createBar = () => ({
    id: barId++,
    clusters: [],
    occupiedWidth: 0,
    maxDiameter: 0
  });
  const bars = [];

  let bar = createBar();
  data.forEach((cluster) => {
    const diameter = 2 * cluster.r * radiusFactor;
    if (width - bar.occupiedWidth < diameter + minimalSpacing) {
      bars.push({...bar});
      bar = createBar();
    }
    bar.clusters.push(cluster);
    bar.occupiedWidth += diameter;
    bar.maxDiameter = Math.max(bar.maxDiameter, diameter);
  });
  bars.push({...bar});

  // sort the enrties per bar and set x coordinates
  const xBars = bars.map((bar) => {
    const sortedClusters = summitSort(bar.clusters);
    const widthReductionFactor = 0.95;
    const xSpacing = (widthReductionFactor * width - sortedClusters.reduce((acc, cur) => acc + 2 * cur.r * radiusFactor, 0)) / (sortedClusters.length);
    let x = (1 - widthReductionFactor) / 2 * width;
    const spacedClusters = sortedClusters.map((cluster, i, arr) => {
      if (i === 0) {
        x += cluster.r * radiusFactor;
      } else {
        x += (arr[i - 1].r + cluster.r) * radiusFactor + xSpacing;
      }

      return {
        ...cluster,
        x,
        xSpacing
      };
    });
    return {
      ...bar,
      clusters: spacedClusters
    };
  });

  // set y coordinates
  const ySpacing = (height - xBars.reduce((acc, cur) => acc + cur.maxDiameter, 0)) / (xBars.length + 1);
  let y = 0;
  const xyBars = xBars.map((bar, i, arr) => {
    if (i === 0) {
      y += ySpacing + bar.maxDiameter / 2;
    } else {
      y += (arr[i - 1].maxDiameter + bar.maxDiameter) / 2 + ySpacing;
    }
    return {
      ...bar,
      ySpacing,
      y: Math.min(y, height - bar.maxDiameter / 2)
    };
  });

  // unfold from bar array
  let result = [];
  xyBars.forEach((bar) => {
    result = [
      ...result,
      ...bar.clusters.map((cluster) => {
        return {
          ...cluster,
          x: cluster.x - width / 2,
          y: bar.y - height / 2,
          xAbsolute: cluster.x,
          yAbsolute: bar.y,
          ySpacing: bar.ySpacing,
          maxDiameter: bar.maxDiameter
        };
      })
    ];
  });

  return result;
};
