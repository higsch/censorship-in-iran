<script>
  import { selectedDatum } from '../../stores/selection';
  import {
    selection as selectionColor,
    white,
    getControlColor } from '../../utils/colors';
  import { colorControl } from '../../stores/control';
  import { hoveredLabel } from '../../stores/selection';
  import { relativePath } from '../../utils/path';
  import { layoutForce } from '../../utils/layout';

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
    let tmpFlatData = [];
    data.forEach((c) => {
      c.data.forEach((d) => {
        if (d.draw) {
          const [ path, pathX, pathY ] = relativePath(d.voronoiPath);
          tmpFlatData = [...tmpFlatData, {
            ...d,
            cluster: c,
            color: getControlColor(d, $colorControl.find((c) => c.selected)),
            path,
            x: c.x + pathX,
            y: c.y + pathY
          }];
        }
      });
    });

    if ($selectedDatum) {
      layoutForce(tmpFlatData, width, height).then((res) => tmpFlatData = res);
    }

    flatData = tmpFlatData;
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
        hovered={$hoveredLabel && $hoveredLabel.value.includes(d[$hoveredLabel.name])}
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
