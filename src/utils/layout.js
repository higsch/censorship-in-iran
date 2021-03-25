import { Delaunay, rollups } from 'd3';
import { forceSimulation, forceRadial } from 'd3-force';
import { summitSort } from './math';
import { statusOrder } from '../inputs/orders';

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

const sortClusterDataByCategoryN = (data, selectedColor) => {
  if (!selectedColor) return data;

  const { name } = selectedColor;
  if (!name) return data;
  
  let orderedCategories = [];
  if (name === 'status') {
    orderedCategories = statusOrder;
  } else {
    orderedCategories = rollups(data, (d) => d.length, (d) => d[name])
      .sort((a, b) => a[1] > b[1] ? 1 : -1)
      .map((d) => d[0]);
  }
  
  const orderedData = orderedCategories.reduce((acc, cur) => {
    const filteredData = data.filter((d) => d[name] === cur);
    return [...acc, ...filteredData];
  }, []);

  return orderedData;
};

export const batchLayoutClusters = (selectedGrouping, selectedColor, data, radiusScale) => {
  const { values, name: groupingName } = selectedGrouping;
  const clusters = values.map((v) => v.value);
  
  let lastId = Math.max(...data.map((d) => +d.id));

  const clustersData = clusters.map((cluster) => {
    const clusterData = data.filter((d) => d[groupingName] === cluster);
    const sortedClusterData = sortClusterDataByCategoryN(clusterData, selectedColor);
    const { phyllotaxisData, lastId: newLastId } = layoutPhyllotaxis(sortedClusterData, radiusScale, lastId);
    lastId = newLastId;
    return phyllotaxisData;
  })
  .map((d, i) => {
    const length = d.filter((d) => d.draw).length;
    return {
      id: i,
      name: clusters[i],
      r: Math.max(...d.filter((dd) => dd.draw).map((dd) => [Math.abs(dd.x), Math.abs(dd.y)]).flat()) * (length < 2 ? 3 : 1),
      outerR: Math.max(...d.map((dd) => [Math.abs(dd.x), Math.abs(dd.y)]).flat()),
      color: selectedGrouping.color,
      data: d,
      length
    };
  })
  .map((d) => {
    const voronoiData = layoutVoronoi(d);
    return voronoiData;
  });

  return clustersData;
};

export const layoutBar = (
    clustersData,
    width,
    height,
    margin,
    dir,
    showLabels = false,
    minXSpacing = width / 2,
    maxYSpacing = 100
  ) => {
  // copy and sort data by radius
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
    if (width - bar.occupiedWidth < diameter + minXSpacing) {
      bars.push({...bar});
      bar = createBar();
    }
    bar.clusters.push(cluster);
    bar.occupiedWidth += diameter;
    bar.maxDiameter = Math.max(bar.maxDiameter, diameter);
  });
  bars.push({...bar});

  // sort the entries per bar and set x coordinates
  const xBars = bars.map((bar) => {
    const sortedClusters = summitSort(bar.clusters);
    const allDiameters = sortedClusters.reduce((acc, cur) => acc + 2 * cur.r * radiusFactor, 0);
    const xSpacing = (width - allDiameters) / (sortedClusters.length + 1);
    let x = xSpacing;

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
  const ySpacing = Math.min(maxYSpacing, 1.2 * (height - margin.top - margin.bottom - xBars.reduce((acc, cur) => acc + cur.maxDiameter, 0)) / xBars.length);
  let y = margin.top;
  const xyBars = xBars.map((bar, i, arr) => {
    if (i === 0) {
      y += bar.maxDiameter / 2;
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
          maxDiameter: bar.maxDiameter,
          paneDimensions: {
            x: cluster.x - cluster.r - (dir === 'rtl' ? cluster.xSpacing : 0),
            y: bar.y - bar.maxDiameter / 2 - cluster.data[0].r,
            width: 2 * cluster.r + cluster.xSpacing,
            height: bar.maxDiameter + 2 * cluster.data[0].r
          }
        };
      })
    ];
  });

  return result;
};

export const layoutForce = (data, width, height) => {
  return new Promise((resolve) => {
    let dataCopy = [...data];

    const radius = 0.9 * Math.max(width, height) / 2;
    const x = 0;
    const y = 0;

    forceSimulation()
      .nodes(dataCopy)
      .force('center', forceRadial().radius((_, i) => radius + 10 * (i % 10)).x(x).y(y))
      .on('end', () => resolve(dataCopy))
      .tick(300);
  });
};
