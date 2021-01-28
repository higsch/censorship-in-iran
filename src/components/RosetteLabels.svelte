<script>
  import { css } from '../actions/css';
  import { colorControl } from '../stores/control';
  import { generateLabels } from '../utils/labels';

  import RosetteLabelsCanvasPane from './RosetteLabelsCanvasPane.svelte';

  export let cluster = {};
  export let parentMinDim = 0;

  let labels = [];

  $: data = cluster.data.filter((d) => d.draw);

  $: dimensions = {
      x: cluster.xAbsolute - cluster.r,
      y: cluster.yAbsolute - cluster.maxDiameter / 2,
      width: 2 * cluster.r + cluster.xSpacing,
      height: cluster.maxDiameter
    };

  $: shiftedData = data.filter((d) => d.draw).map((d) => {
      return {
        ...d,
        x: d.x - dimensions.x,
        y: d.y - dimensions.y
      };
    });

  $: {
    const { name, values } = $colorControl.find((c) => c.selected) || {};
    if (name) {
      console.log([...new Set(data.reduce((acc, cur) => [...acc, cur[name]], []).flat())])
      labels = [...new Set(data.reduce((acc, cur) => [...acc, cur[name]], []).flat())]
        .map((value) => {
          const { color } = values.find((v) => v.value === value);
          return {
            value,
            color
          };
        });
    }
  }
</script>

<div
  class="rosette-labels"
  use:css={{x: `${dimensions.x}px`, y: `${dimensions.y}px`, width: `${dimensions.width}px`,height: `${dimensions.height}px`}}
>
  <!-- <RosetteLabelsCanvasPane
    data={shiftedData}
    labels={labels}
  /> -->
  <div
    class="labels-text-pane"
    use:css={{marginLeft: `${2 * cluster.r + cluster.xSpacing / 2}px`}}
  >
    {#each labels as label (label)}
      <div
        class="label-text"
        use:css={{color: label.color}}  
      >
        {label.value}
      </div>
    {/each}
  </div>
</div>

<style>
  .rosette-labels {
    position: absolute;
    z-index: 6;
    left: var(--x);
    top: var(--y);
    display: flex;
    width: var(--width);
    height: var(--height);
    border: 1px solid white;
  }

  .labels-text-pane {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    height: 100%;
    margin-left: var(--marginLeft);
    border: 1px solid red;
  }

  .label-text {
    margin: 0.2rem 0;
    color: var(--color);
  }
</style>
