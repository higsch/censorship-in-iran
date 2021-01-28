<script>
  import { getContext, onMount, onDestroy, afterUpdate } from 'svelte';

  export let d = null;
  export let label = null;

  const contextName = 'canvas-rosette-label';
  const { register, deregister, invalidate } = getContext(contextName);

  function draw(ctx) {
    if (!label || !d) return;

    const { x: labelX, y: labelY, color } = label;
    const { absX: dX, absY: dY } = d;

    if (!labelX || !labelY || !dX || !dY) return;

    const controlX = dX + (labelX - dX) / 1.2;

    ctx.globalAlpha = 0.2;

    ctx.beginPath();
    ctx.moveTo(dX, dY);
    ctx.bezierCurveTo(controlX, dY, controlX, labelY, labelX, labelY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  onMount(() => {
    register(draw);
    invalidate();
    
    return () => {
      deregister(draw);
    };
  });

	afterUpdate(invalidate);
  onDestroy(invalidate);
</script>
