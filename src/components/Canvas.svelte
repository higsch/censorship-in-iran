<script>
  import { onMount, setContext } from "svelte";

  import { setupCanvas } from '../utils/canvas';

  export let width = 0;
  export let height = 0;
  export let pixelRatio = window.devicePixelRatio || 1;;

  const drawFunctions = [];

  let canvas;
  let ctx;

  setContext('canvas', {
    register(drawFn) {
      drawFunctions.push(drawFn);
    },
    unregister(drawFn) {
      drawFunctions.splice(drawFunctions.indexOf(drawFn), 1);
    },
  });

  onMount(() => {
    let frameId;

    function update() {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      
      drawFunctions.forEach((drawFn) => {
        drawFn(ctx);
      });

      ctx.restore();
      frameId = requestAnimationFrame(update);
    }

    frameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frameId);
    };
  });

  $: if (canvas) ctx = setupCanvas(canvas, width, height, pixelRatio);
</script>

<canvas
  bind:this={canvas}
/>
<slot />
