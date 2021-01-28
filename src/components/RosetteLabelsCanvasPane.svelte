<script>
  import Canvas from './Canvas.svelte';
  import RosetteLabelLine from './RosetteLabelLine.svelte';

  export let data = [];
  export let labels = [];

  let width = 0;
  let height = 0;

  $: renderedData = data.filter((d) => d.draw);
</script>

<div
  class="rosette-label-canvas-pane"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  <Canvas
    width={width}
    height={height}
    contextName="canvas-rosette-label"
  >
    {#each renderedData as d (d.id)}
      <RosetteLabelLine
        d={d}
      />
    {/each}
  </Canvas>
</div>

<style>
  .rosette-label-canvas-pane {
    position: absolute;
    z-index: 7;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
