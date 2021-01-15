<script>
  import { selectedDatum } from '../stores/selection';
  import { global as globalColor } from '../utils/colors';

  import Canvas from './Canvas.svelte';
  import Tile from './Tile.svelte';

  export let data = [];

  let width = 0;
  let height = 0;

  let flatData = [];

  function handleClick(e) {
    const { detail: {x, y} } = e;
    const selected = data.map((cluster) => {
      const index = cluster.delaunay.find(x - cluster.x, y - cluster.y);
      const datum = cluster.data[index];
      return datum;
    })
    .find((d) => d.draw);

    selectedDatum.set(selected);
  }

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
    on:click={handleClick}
  >
    {#each flatData as d (d.id)}
      <Tile
        d={d}
        startX={Math.random() * width - width / 2}
        startY={Math.random() * height - height / 2}
        strokeColor={globalColor.background1}
        selected={$selectedDatum && $selectedDatum.id === d.id}
      />
    {/each}
  </Canvas>
</div>

<style>
  .canvas-pane-wrapper {
    width: 100%;
    flex: 1;
    overflow: hidden;
    cursor: pointer;
  }
</style>
