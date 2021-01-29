<script>
  import { hoveredLabel } from '../stores/selection';

  import RosetteLabels from './RosetteLabels.svelte';
  
  export let data = [];
  export let showLabels = false;

  function handleLabelHover(e) {
    const { detail } = e;
    if (detail) {
      hoveredLabel.set(detail);
    } else {
      hoveredLabel.set(null);
    }
  }
</script>

<div
  class="rosette-background"
>
  {#if (showLabels)}
    {#each data as cluster (cluster.id)}
      <RosetteLabels
        cluster={cluster}
        on:hover={handleLabelHover}
      />
    {/each}
  {/if}
</div>

<style>
  .rosette-background {
    position: absolute;
    z-index: 15;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
</style>
