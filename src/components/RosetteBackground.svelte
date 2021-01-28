<script>
  import RosetteLabels from './RosetteLabels.svelte';
  
  export let data = [];
  export let showLabels = false;

  let width = 0;
  let height = 0;

  $: minDim = Math.min(width, height);
</script>

<div
  class="rosette-background"
  bind:clientWidth={width}
  bind:clientHeight={height}
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
