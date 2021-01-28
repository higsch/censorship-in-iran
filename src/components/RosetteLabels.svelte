<script>
  import { rollups } from 'd3';

  import { css } from '../actions/css';
  import { colorControl } from '../stores/control';
  import { t } from '../stores/i18n';

  import RosetteLabelsCanvasPane from './RosetteLabelsCanvasPane.svelte';

  export let cluster = {};

  let colorControlName = 'none';
  let colorControlValues = [];
  let labels = [];
  let labelElements = [];

  function getLabels (data, controlName, controlValues) {
    const newLabels = rollups(data, (d) => d.length, (d) => d[controlName])
      .map((d) => {
        const value = d[0];
        const { color } = controlValues.find((v) => v.value === value);
        return {
          name: controlName,
          value,
          n: d[1],
          color
        };
      })
      .sort((a, b) => a.n < b.n ? 1 : -1);

    return newLabels;
  }

  $: textPaneMarginLeft = 2 * cluster.r + cluster.xSpacing / 2;

  $: data = cluster.data.filter((d) => d.draw);

  $: dimensions = {
      x: cluster.xAbsolute - cluster.r,
      y: cluster.yAbsolute - cluster.maxDiameter / 2,
      width: 2 * cluster.r + cluster.xSpacing,
      height: cluster.maxDiameter
    };

  $: ({ name: colorControlName, values: colorControlValues } = $colorControl.find((c) => c.selected) || {});

  $: if (colorControlName) labels = getLabels(data, colorControlName, colorControlValues);

  $: labelElementDimensions = labelElements.map((l, i) => {
      const label = labels[i];

      const { width = 0, height = 0 } = l ? l.getBoundingClientRect() : {};
      const { offsetLeft: x = 0, offsetTop: y = 0 } = l || {};

      return {
        ...label,
        x: x,
        y: y + height / 2,
        width,
        height
      };
    });
</script>

<div
  class="rosette-labels"
  use:css={{x: `${dimensions.x}px`, y: `${dimensions.y}px`, width: `${dimensions.width}px`,height: `${dimensions.height}px`}}
>
  <RosetteLabelsCanvasPane
    cluster={cluster}
    colorControlName={colorControlName}
    labels={labelElementDimensions}
  />
  <div
    class="labels-text-pane"
    use:css={{marginLeft: `${textPaneMarginLeft}px`}}
  >
    {#each labels as { name, value, color, element }, i}
      <div
        class="label-text"
        bind:this={labelElements[i]}
        use:css={{color: color}}  
      >
        {$t(`groupingvalues.${name}.${value}`)}
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
    padding: 0 1rem 0 0;
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
