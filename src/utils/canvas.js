export const setupCanvas = (canvas, width = 0, height = 0, pixelRatio = 1, center = true) => {
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx.scale(pixelRatio, pixelRatio);

  if (center) {
    ctx.translate(width / 2, height / 2);
  }

  return ctx;
};
