<script>
  import Canvas from '../components/Canvas.svelte';
  import RosetteLabelLine from './RosetteLabelLine.svelte';

  export let cluster;
  export let colorControlName = 'none';
  export let labels = [];
  export let parentWidth = 0;
  export let parentHeight = 0;

  const contextName = 'canvas-rosette-label';

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
>
  <Canvas
    width={parentWidth}
    height={parentHeight}
    center={false}
    contextName={contextName}
  >
    {#if (labels.length > 0)}
      {#each renderedData as d (d.id)}
        <RosetteLabelLine
          d={d}
          label={labels.find((l) => l.value === d[colorControlName])}
          contextName={contextName}
        />
      {/each}
    {/if}
  </Canvas>
</div>

<style>
  .rosette-label-canvas-pane {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 7;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
