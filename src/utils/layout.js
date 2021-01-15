import { Delaunay } from 'd3';

const goldenRatio = (1 + Math.sqrt(5)) / 2;
const irrational2 = 1 + Math.sqrt(2);
const irrational3 = (9 + Math.sqrt(221)) / 10;

export const layoutPhyllotaxis = (
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
      y: Math.sin(scaledTheta) * scaledRadius
    };
  });

  return {
    phyllotaxisData,
    lastId
  };
};

export const layoutVoronoi = (cluster) => {
  const { outerR: r, data } = cluster;
  const scaledRadius = r * 1.2;
  const voronoi = Delaunay.from(data, (d) => d.x, (d) => d.y).voronoi([-scaledRadius, -scaledRadius, scaledRadius, scaledRadius]);
  const voronoiData = data.map((d, i) => {
    return {
      ...d,
      voronoiPath: voronoi.renderCell(i)
    };
  });

  return {
    ...cluster,
    data: voronoiData
  };
};
