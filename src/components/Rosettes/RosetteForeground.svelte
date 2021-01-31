<script>
  import { hoveredLabel } from '../../stores/selection';
  import { groupControl, colorControl } from '../../stores/control';
  import { defaultColor } from '../../utils/colors';

  import RosetteTitle from '../RosetteAnnotation/RosetteTitle.svelte';
  import RosetteLabels from '../RosetteAnnotation/RosetteLabels.svelte';
  
  export let data = [];
  export let showClusterTitles = true;
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

  $: ({ name: groupControlName } = $groupControl.find((c) => c.selected) || {});
  $: ({ name: colorControlName, values: colorControlValues } = $colorControl.find((c) => c.selected) || {});
</script>

<div
  class="rosette-foreground"
>
  {#if (showClusterTitles)}
    {#each data as cluster (cluster.id)}
      <RosetteTitle
        cluster={cluster}
        groupControlName={groupControlName}
        textColor={defaultColor}
      />
    {/each}
  {/if}
  {#if (showLabels)}
    {#each data as cluster (cluster.id)}
      <RosetteLabels
        cluster={cluster}
        groupControlName={groupControlName}
        colorControlName={colorControlName}
        colorControlValues={colorControlValues}
        hoveredLabel={$hoveredLabel}
        on:hover={handleLabelHover}
      />
    {/each}
  {/if}
</div>

<style>
  .rosette-foreground {
    position: absolute;
    z-index: 15;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
</style>
