<script>
  import Canvas from './Canvas.svelte';
  import RosetteLabelLine from './RosetteLabelLine.svelte';

  export let cluster;
  export let colorControlName = 'none';
  export let labels = [];

  let width = 0;
  let height = 0;
  let renderedData = [];
  
  $: renderedData = cluster.data.map((d) => {
      return {
        ...d,
        absX: d.x + cluster.r,
        absY: d.y + cluster.r + ((cluster.maxDiameter / 2 - cluster.r))
      };
    });
</script>

<div
  class="rosette-label-canvas-pane"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  <Canvas
    width={width}
    height={height}
    center={false}
    contextName="canvas-rosette-label"
  >
    {#each renderedData as d (d.id)}
      <RosetteLabelLine
        d={d}
        label={labels.find((l) => l.value === d[colorControlName])}
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
