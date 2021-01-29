<script>
  import { createEventDispatcher } from 'svelte';
  import { rollups } from 'd3';

  import { css } from '../actions/css';
  import { colorControl } from '../stores/control';
  import { t } from '../stores/i18n';

  export let cluster = {};
  export let hoveredLabel;

  const dispatch = createEventDispatcher();

  let colorControlName = 'none';
  let colorControlValues = [];
  let labels = [];

  function handleMouseEnter(name, value) {
    if (!name) {
      dispatch('hover', null);
    } else if (cluster) {
      dispatch('hover', {
        clusterId: cluster.id,
        name,
        value
      });
    }
  }

  function setLabels (data, controlName, controlValues) {
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
  }

  $: textPaneMarginLeft = 2 * cluster.r + cluster.xSpacing / 10;

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
>
  <div
    class="labels-text-pane"
    use:css={{marginLeft: `${textPaneMarginLeft}px`}}
  >
    {#each labels as { name, value, color, n } (`${name}.${value}`)}
      <div
        class="label-text"
        class:hovered={hoveredLabel && hoveredLabel.name === name && hoveredLabel.value === value}
        use:css={{color: color}}
        on:mouseenter={() => handleMouseEnter(name, value)}
        on:mouseleave={() => handleMouseEnter(null)}
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
    height: 100%;
    margin-left: var(--marginLeft);
    padding: 0 1rem 0 0;
    /* border: 1px solid red; */
  }

  .label-text {
    display: flex;
    margin: 0.3rem 0;
    padding: 0 0.4rem;
    font-size: 0.9rem;
    color: #DAE2F5;
    pointer-events: all;
    user-select: none;
    cursor: pointer;
    border-left: 2px solid transparent;
    transition: border-left 0.2s ease-out;
  }

  .label-text.hovered {
    border-left: 2px solid var(--color);
  }

  .label-text .number {
    display: inline-block;
    min-width: 1.6rem;
    font-size: inherit;
    font-weight: bold;
    text-align: right;
  }

  .label-text.hovered .number {
    color: var(--color);
  }

  .label-text .description {
    display: inline-block;
    margin: 0 0.2rem;
    color: var(--color);
    font-size: inherit;
    opacity: 0.8;
  }
</style>
