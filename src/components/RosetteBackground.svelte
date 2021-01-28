<script>
  import RosetteLabels from './RosetteLabels.svelte';
  
  export let data = [];
  export let showLabels = false;
</script>

<div
  class="rosette-background"
>
  {#if (showLabels)}
    {#each data as cluster (cluster.id)}
      <RosetteLabels
        cluster={cluster}
      />
    {/each}
  {/if}
</div>

<style>
  .rosette-background {
    position: absolute;
    z-index: 5;
    width: 100%;
    height: 100%;
  }
</style>
