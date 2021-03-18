<script>
  import { createEventDispatcher } from 'svelte';
  import { rollups } from 'd3';

  import { css } from '../../actions/css';
  import { intersect } from '../../utils/math';
  import { t, dir } from '../../stores/i18n';
  import { defaultColor, background } from '../../utils/colors';
  
  import RosetteLabel from './RosetteLabel.svelte';

  export let cluster = {};
  export let groupControlName = 'none';
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
    if (!colorControlName || colorControlValues.length === 0) return;

    const allLabels = rollups(data, (d) => d.length, (d) => d[controlName])
      .map((d) => {
        const value = d[0];
        const { color } = controlValues.find((v) => v.value === value);
        return {
          name: controlName,
          valueName: value,
          value: [value],
          n: d[1],
          color
        };
      });
      // .sort((a, b) => a.n < b.n ? 1 : -1);
      
    const colorOrder = [...new Set(cluster.data.map((d) => d[colorControlName]))].reverse();

    const allLabelsSorted = colorOrder.reduce((acc, cur) => {
      const filteredData = allLabels.filter((d) => d.valueName === cur);
      return [...acc, ...filteredData];
    }, []);
    
    let otherLabel = [];
    const maxLabels = Math.max(5, cluster.length / 40);
    if (allLabelsSorted.length > maxLabels) {
      const lastLabels = allLabelsSorted.splice(maxLabels);
      otherLabel = [{
        name: controlName,
        valueName: 'other',
        value: lastLabels.map((d) => d.value).flat(),
        n: lastLabels.reduce((acc, cur) => acc + cur.n, 0),
        color: '#EEEEEE'
      }];
    }
    
    labels = [...allLabelsSorted, ...otherLabel];
  }

  $: textPaneMarginHorizontal = 2 * cluster.r + cluster.xSpacing / 10;
  
  $: data = cluster.data.filter((d) => d.draw);
  
  $: dimensions = cluster.paneDimensions;
  
  $: showLabels = cluster.xSpacing > 200 && dimensions.height > 200;

  $: setLabels(data, colorControlName, colorControlValues);
</script>

<div
  class="rosette-labels"
  use:css={{x: `${dimensions.x}px`,
            y: `${dimensions.y}px`,
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            marginHorizontal: `${textPaneMarginHorizontal}px`,
            defaultColor,
            background}}
>
  <div
    class="labels-text-pane {$dir}"
  >
    {#if (showLabels && colorControlName && colorControlName !== 'none' && groupControlName !== colorControlName)}
      <h3>{$t(`grouping.${colorControlName}`)}</h3>
      <div class="separator"></div>
      {#each labels as { name, valueName, value, color, n }, i (`${name}.${valueName}.${i}`)}
        <RosetteLabel
          name={name}
          valueName={valueName}
          value={value}
          n={n}
          color={color}
          hovered={hoveredLabel && hoveredLabel.name === name && intersect(value, hoveredLabel.value)}
          anyHovered={hoveredLabel}
          on:hover={handleLabelHover}
          on:click
        />
      {/each}
    {/if}
  </div>
</div>

<style>
  .rosette-labels {
    position: absolute;
    left: 0;
    top: 0;
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
    /* border: 1px solid red; */
  }

  .labels-text-pane.ltr {
    margin: 0 1.5em 0 var(--marginHorizontal);
  }

  .labels-text-pane.rtl {
    margin: 0 var(--marginHorizontal) 0 1.5em;
  }

  h3 {
    color: var(--defaultColor);
    font-family: var(--font02);
    font-size: 0.8em;
    font-weight: 300;
    text-align: center;
    opacity: 0.7;
  }

  .separator {
    width: 100%;
    height: 1px;
    margin: 0.3em auto 0.3em auto;
    background: linear-gradient(
                  90deg,
                  var(--background) 0%,
                  var(--defaultColor) 10%,
                  var(--defaultColor) 90%,
                  var(--background) 100%
                );
  }
</style>
