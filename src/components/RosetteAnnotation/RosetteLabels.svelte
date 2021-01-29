<script>
  import { createEventDispatcher } from 'svelte';
  import { rollups } from 'd3';

  import { css } from '../../actions/css';
  
  import RosetteLabel from './RosetteLabel.svelte';

  export let cluster = {};
  export let colorControlName = 'none';
  export let colorControlValues = [];
  export let hoveredLabel;

  const dispatch = createEventDispatcher();

  let showLabels = true;
  let labels = [];

  function handleLabelHover(e) {
    const { detail } = e;
    if (detail) {
      dispatch('hover', {
        clusterId: cluster.id,
        ...e.detail
      });
    } else if (cluster) {
      dispatch('hover', null);
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
  
  $: showLabels = cluster.xSpacing > 100 && dimensions.height > 200;

  $: if (colorControlName && colorControlValues.length) {
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
    {#if (showLabels && colorControlName && colorControlName !== 'none')}
      {#each labels as { name, value, color, n } (`${name}.${value}`)}
        <RosetteLabel
          name={name}
          value={value}
          n={n}
          color={color}
          hovered={hoveredLabel && hoveredLabel.name === name && hoveredLabel.value === value}
          on:hover={handleLabelHover}
        />
      {/each}
    {/if}
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
    overflow: hidden;
    /* border: 1px solid white; */
  }

  .labels-text-pane {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin: 0 1rem 0 var(--marginLeft);
    /* border: 1px solid red; */
  }
</style>
