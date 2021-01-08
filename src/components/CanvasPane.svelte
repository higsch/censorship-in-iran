<script>
  import Canvas from './Canvas.svelte';
  import Tile from './Tile.svelte';

  export let data = [];

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
  >
    {#each data as cluster (cluster.id)}
      {#each cluster.data as d (d.id)}
        <Tile
          d={d}
          cluster={cluster}
        />
      {/each}
    {/each}
  </Canvas>
</div>

<style>
  .canvas-pane-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
