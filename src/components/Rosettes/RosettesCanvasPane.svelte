<script>
  import { selectedDatum } from '../../stores/selection';
  import {
    selection as selectionColor,
    white,
    getControlColor } from '../../utils/colors';
  import { colorControl } from '../../stores/control';
  import { hoveredLabel } from '../../stores/selection';

  import Canvas from '../Canvas.svelte';
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
    const selectedColor = $colorControl.find((c) => c.selected);
    
    flatData = [];
    data.forEach((c) => {
      c.data.forEach((d) => {
        if (d.draw) {
          flatData = [...flatData, {
            ...d,
            cluster: c,
            color: getControlColor(d, selectedColor)
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
        strokeColor={white}
        selectionColor={selectionColor.selected1}
        selected={$selectedDatum && $selectedDatum.id === d.id}
        hovered={$hoveredLabel && d[$hoveredLabel.name] === $hoveredLabel.value}
        anyHovered={$hoveredLabel}
      />
    {/each}
  </Canvas>
</div>

<style>
  .canvas-pane-wrapper {
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
  }
</style>
