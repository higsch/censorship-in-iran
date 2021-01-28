<script>
  import {
    getContext,
    onMount,
    onDestroy,
    afterUpdate } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { interpolateHcl } from 'd3';

  export let d;
  export let label;
  export let contextName = 'canvas-rosette-label';
  
  const { register, deregister, invalidate } = getContext(contextName);
  const growDuration = 1200;

  let dX, dY, labelX1, labelY1, labelX2, labelY2;

  const color = tweened('#DAE2F5', {
    duration: growDuration,
    interpolate: interpolateHcl
  });

  function draw(ctx) {
    if (!label || !d || !labelX1 || !labelY1 || !labelX2 || !labelY2 || !$dX || !$dY) return;

    const controlX = $dX + (labelX1 - $dX) / 1.6;
    const controlY1 = $dY;
    const controlY2 = labelY1;

    ctx.globalAlpha = 0.2;

    ctx.beginPath();
    ctx.moveTo($dX, $dY);
    ctx.bezierCurveTo(controlX, controlY1, controlX, controlY2, labelX1, labelY1);
    ctx.lineTo(labelX2, labelY2);
    ctx.strokeStyle = $color;
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

  $: ({ x1: labelX1, y1: labelY1, x2: labelX2, y2: labelY2 } = label || {});

  $: if (labelX1 && !dX) dX = tweened(labelX1, {
    duration: growDuration,
    easing: cubicOut
  });

  $: if (labelY1 && !dY) dY = tweened(labelY1, {
    duration: growDuration,
    easing: cubicOut
  });

  $: if (d && dX && dY) {
      dX.set(d.absX);
      dY.set(d.absY);
    }

  $: if (label) color.set(label.color);
</script>
