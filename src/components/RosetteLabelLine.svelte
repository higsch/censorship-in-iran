<script>
  import { getContext, onMount, onDestroy, afterUpdate } from 'svelte';

  export let d = null;
  export let label = null;
  export let clusterRadius = 0;

  const contextName = 'canvas-rosette-label';
  const { register, deregister, invalidate } = getContext(contextName);

  function draw(ctx) {
    if (!label || !d) return;

    const { x: labelX, y: labelY } = label;
    let { absX: dX, absY: dY } = d;

    // console.log(d)
    ctx.beginPath();
    ctx.arc(labelX, labelY, 5, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(dX, dY, 5, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();
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
