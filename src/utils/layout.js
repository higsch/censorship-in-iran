const goldenRatio = (1 + Math.sqrt(5)) / 2;

export const layoutPhyllotaxis = (
    data,
    radiusScale,
    radius = 1,
    radiusOffset = radius / 2,
    spacing = radius * 2,
    theta = 2 * Math.PI / goldenRatio
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
