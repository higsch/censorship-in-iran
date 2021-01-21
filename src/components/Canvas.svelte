<script>
  import { onDestroy, setContext, createEventDispatcher } from 'svelte';

  import { setupCanvas } from '../utils/canvas';

  export let width = 0;
  export let height = 0;
  export let pixelRatio = window.devicePixelRatio || 1;;

  const dispatch = createEventDispatcher();
  const drawFunctions = [];

  let canvas;
  let ctx;
  let pendingInvalidation = false;
  let frameId;

  setContext('canvas', {
    register(fn) {
      drawFunctions.push(fn);
    },
    deregister(fn) {
      drawFunctions.splice(drawFunctions.indexOf(fn), 1);
    },
    invalidate() {
			if (pendingInvalidation) return;
			pendingInvalidation = true;
			frameId = requestAnimationFrame(update);
		}
  });

  function handleClick(e) {
    const { layerX: x, layerY: y } = e;
    dispatch('click', {
      x: x - width / 2,
      y: y - height / 2
    });
  }

  function update() {
    if (!ctx) return;

    ctx.clearRect(-width / 2, -height / 2, width, height);
    
    drawFunctions.forEach((fn) => {
      ctx.save();
      fn(ctx);
      ctx.restore();
    });
    
    pendingInvalidation = false;
  }

  onDestroy(() => {
    if (frameId) {
      cancelAnimationFrame(frameId);
    }
  });

  $: ctx = setupCanvas(canvas, width, height, pixelRatio);
</script>

<canvas
  bind:this={canvas}
  on:click={handleClick}
/>
<slot />
