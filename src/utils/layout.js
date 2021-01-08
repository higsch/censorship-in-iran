const goldenRatio = (1 + Math.sqrt(5)) / 2;
const irrational2 = 1 + Math.sqrt(2);
const irrational3 = (9 + Math.sqrt(221)) / 10;

export const layoutPhyllotaxis = (
    data,
    radiusScale,
    radius = 2,
    radiusOffset = radius / 2,
    spacing = 2.5,
    theta = 2 * Math.PI / irrational3
  ) => {
  const scaledSpacing = radiusScale(spacing);
  const scaledRadiusOffset = radiusScale(radiusOffset);

  const dataCoords = data.map((d, i) => {
    const scaledTheta = theta * i;
    const scaledRadius = scaledSpacing * Math.sqrt(i) + scaledRadiusOffset;

    return {
      ...d,
      r: radiusScale(radius),
      x: Math.cos(scaledTheta) * scaledRadius,
      y: Math.sin(scaledTheta) * scaledRadius
    };
  });

  return dataCoords;
};
