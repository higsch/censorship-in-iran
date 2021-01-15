<script>
  import Canvas from './Canvas.svelte';
  import Tile from './Tile.svelte';

  export let data = [];

  let width = 0;
  let height = 0;

  let flatData = [];

  $: {
    flatData = [];
    data.forEach((c) => {
      c.data.forEach((d) => {
        if (d.draw) {
          flatData = [...flatData, {
            ...d,
            cluster: c
          }];
        }
      });
    });
  }
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
    {#each flatData as d (d.id)}
      <Tile
        d={d}
        startX={Math.random() * width - width / 2}
        startY={Math.random() * height - height / 2}
      />
    {/each}
  </Canvas>
</div>

<style>
  .canvas-pane-wrapper {
    width: 100%;
    flex: 1;
  }
</style>
