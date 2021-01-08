const goldenRatio = (1 + Math.sqrt(5)) / 2;

export const layoutPhyllotaxis = (data, radius = 7, theta = 2 * Math.PI / goldenRatio, thetaOffset = 0) => {
  const dataCoords = data.map((d, i) => {
    const scaledTheta = theta * i;
    const scaledRadius = radius * Math.sqrt(i);
    return {
      ...d,
      r: radius,
      x: Math.cos(scaledTheta) * scaledRadius,
      y: Math.sin(scaledTheta) * scaledRadius
    };
  });

  return dataCoords;
};
