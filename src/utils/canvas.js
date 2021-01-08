export const setupCanvas = (canvas, width, height, pixelRatio) => {
  const ctx = canvas.getContext('2d');

  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;

  ctx.scale(pixelRatio, pixelRatio);

  return ctx;
};
