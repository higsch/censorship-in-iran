<script>
  import { hoveredLabel } from '../../stores/selection';
  import { groupControl, colorControl } from '../../stores/control';

  import RosetteLabels from '../RosetteAnnotation/RosetteLabels.svelte';
  
  export let data = [];
  export let showLabels = false;

  let groupControlName;
  let colorControlName;
  let colorControlValues;

  function handleLabelHover(e) {
    const { detail } = e;
    if (detail) {
      hoveredLabel.set(detail);
    } else {
      hoveredLabel.set(null);
    }
  }

  function handleClick(e) {
    const { detail: { name } = {}} = e || {};
    if (name) {
      groupControl.select(name);
    }
  }

  $: ({ name: groupControlName } = $groupControl.find((c) => c.selected) || {});
  $: ({ name: colorControlName, values: colorControlValues } = $colorControl.find((c) => c.selected) || {});
</script>

<div
  class="rosette-foreground"
>
  {#if (showLabels)}
    {#each data as cluster (cluster.id)}
      <RosetteLabels
        cluster={cluster}
        groupControlName={groupControlName}
        colorControlName={colorControlName}
        colorControlValues={colorControlValues}
        hoveredLabel={$hoveredLabel}
        on:hover={handleLabelHover}
        on:click={handleClick}
      />
    {/each}
  {/if}
</div>

<style>
  .rosette-foreground {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 15;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
</style>
