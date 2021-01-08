<script>
  import Canvas from './Canvas.svelte';

  let width = 0;
  let height = 0;
</script>

<div
  class="canvas-pane-wrapper"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  <Canvas
    width={width}
    height={height}
  />
</div>

<style>
  .canvas-pane-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
