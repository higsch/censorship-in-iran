<script>
  import { rollups } from 'd3';

  import { css } from '../actions/css';
  import { colorControl } from '../stores/control';
  import { t } from '../stores/i18n';

  import RosetteLabelsCanvasPane from './RosetteLabelsCanvasPane.svelte';

  export let cluster = {};
  export let parentMinDim = 0;

  let labels = [];

  function getLabels (data, controlName, controlValues) {
    const allLabels = data.reduce((acc, cur) => [...acc, cur[controlName]], []).flat();

    labels = rollups(data, (d) => d.length, (d) => d[controlName])
      .map((d) => {
        const value = d[0];
        const { color } = controlValues.find((v) => v.value === value);
        return {
          name: controlName,
          value,
          n: d[1],
          color
        }
      })
      .sort((a, b) => a.n < b.n ? 1 : -1);

    return labels;
  }

  $: data = cluster.data.filter((d) => d.draw);

  $: dimensions = {
      x: cluster.xAbsolute - cluster.r,
      y: cluster.yAbsolute - cluster.maxDiameter / 2,
      width: 2 * cluster.r + cluster.xSpacing,
      height: cluster.maxDiameter
    };

  $: {
    // color control
    const { name, values } = $colorControl.find((c) => c.selected) || {};
    if (name) {
      // get labels from rosette members
      labels = getLabels(data, name, values);
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
        {$t(`groupingvalues.${label.name}.${label.value}`)}
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
    /* border: 1px solid white; */
  }

  .labels-text-pane {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    height: 100%;
    margin-left: var(--marginLeft);
    /* border: 1px solid red; */
  }

  .label-text {
    margin: 0.2rem 0;
    color: var(--color);
  }
</style>
