<script>
  import { tick } from 'svelte';
  import { fade } from 'svelte/transition';
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
  let labelElementDimensions = [];

  async function setLabels (data, controlName, controlValues) {
    labels = rollups(data, (d) => d.length, (d) => d[controlName])
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

    await tick();
    
    labelElementDimensions = labelElements.filter((l) => l).map((l, i) => {
      const label = labels[i];

      const { width = 0, height = 0 } = l ? l.getBoundingClientRect() : {};
      const { offsetLeft: x = 0, offsetTop: y = 0} = l;

      return {
        ...label,
        x,
        y: y + height / 2,
        width,
        height
      };
    });
  }

  $: textPaneMarginLeft = 2 * cluster.r + cluster.xSpacing / 3;

  $: data = cluster.data.filter((d) => d.draw);

  $: dimensions = {
      x: cluster.xAbsolute - cluster.r,
      y: cluster.yAbsolute - cluster.maxDiameter / 2 - cluster.data[0].r,
      width: 2 * cluster.r + cluster.xSpacing,
      height: cluster.maxDiameter + 2 * cluster.data[0].r
    };

  $: ({ name: colorControlName, values: colorControlValues } = $colorControl.find((c) => c.selected) || {});

  $: if (colorControlName) {
      setLabels(data, colorControlName, colorControlValues);
    }
</script>

<div
  class="rosette-labels"
  use:css={{x: `${dimensions.x}px`, y: `${dimensions.y}px`, width: `${dimensions.width}px`, height: `${dimensions.height}px`}}
  transition:fade
>
  <RosetteLabelsCanvasPane
    cluster={cluster}
    colorControlName={colorControlName}
    labels={labelElementDimensions}
    parentWidth={dimensions.width}
    parentHeight={dimensions.height}
  />
  <div
    class="labels-text-pane"
    use:css={{marginLeft: `${textPaneMarginLeft}px`}}
  >
    {#each labels as { name, value, color, n }, i (value)}
      <div
        class="label-text"
        bind:this={labelElements[i]}
        use:css={{color: color}}  
      >
        <span class="number">{n}</span>
        <span class="description">{$t(`groupingvalues.${name}.${value}`)}</span>
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
    display: flex;
    margin: 0.2rem 0;
    padding: 0 0.4rem;
    font-size: 0.9rem;
    color: #DAE2F5;
  }

  .label-text .number {
    display: inline-block;
    min-width: 1.8rem;
    font-size: inherit;
    font-weight: bold;
    text-align: right;
  }

  .label-text .description {
    margin: 0 0.2rem;
    color: var(--color);
    font-size: inherit;
    opacity: 0.8;
  }
</style>
