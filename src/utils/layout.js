const goldenRatio = (1 + Math.sqrt(5)) / 2;

export const layoutPhyllotaxis = (
    data,
    radius = 5,
    radiusOffset = radius / 2,
    spacing = 10,
    theta = 2 * Math.PI / goldenRatio
  ) => {
  const dataCoords = data.map((d, i) => {
    const scaledTheta = theta * i;
    const scaledRadius = spacing * Math.sqrt(i) + radiusOffset;
    return {
      ...d,
      r: radius,
      x: Math.cos(scaledTheta) * scaledRadius,
      y: Math.sin(scaledTheta) * scaledRadius
    };
  });

  return dataCoords;
};
