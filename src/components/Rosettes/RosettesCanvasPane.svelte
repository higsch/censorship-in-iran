<script>
  import { hoveredDatum, selectedDatum } from '../../stores/selection';
  import {
    white,
    background,
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

  function findDelaunay(x, y) {
    const found = data.map((cluster) => {
      const index = cluster.delaunay.find(x - cluster.x, y - cluster.y);
      const d = cluster.data[index];
      return {
        d,
        pos: {
          x: x + cluster.xAbsolute,
          y: y + cluster.yAbsolute
        }
      };
    })
    .find((d) => d && d.d.draw);

    return found ? found : null;
  }

  function handleHover(e) {
    const { detail: { x, y } = {} } = e || {};
    const hovered = findDelaunay(x, y);
    hoveredDatum.set(hovered);
  }

  function handleClick(e) {
    const { detail: {x, y} } = e;
    const selected = findDelaunay(x, y);
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
  class:hovered={$hoveredDatum}
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  <Canvas
    width={width}
    height={height}
    on:mousemove={handleHover}
    on:click={handleClick}
  >
    {#each flatData as d (d.id)}
      <Tile
        d={d}
        startX={Math.random() * width - width / 2}
        startY={Math.random() * height - height / 2}
        strokeColor={white}
        selectColor={background}
        selected={$hoveredDatum && $hoveredDatum.d.id === d.id}
        hovered={$hoveredLabel && $hoveredLabel.value.includes(d[$hoveredLabel.name])}
        anyHovered={$hoveredLabel}
      />
    {/each}
  </Canvas>
</div>

<style>
  .canvas-pane-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .hovered {
    cursor: pointer;
  }
</style>
