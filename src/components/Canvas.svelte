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
    register(fn) {
      drawFunctions.push(fn);
    },
    deregister(fn) {
      drawFunctions.splice(drawFunctions.indexOf(fn), 1);
    },
  });

  onMount(() => {
    let frameId;

    function update() {
      if (!ctx) return;

      ctx.clearRect(-width / 2, -height / 2, width, height);
      
      drawFunctions.forEach((fn) => {
        ctx.save();
        fn(ctx);
        ctx.restore();
      });
      
      frameId = requestAnimationFrame(update);
    }

    frameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frameId);
    };
  });

  $: ctx = setupCanvas(canvas, width, height, pixelRatio);
</script>

<canvas bind:this={canvas} />
<slot />
