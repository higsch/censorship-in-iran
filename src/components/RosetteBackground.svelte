<script>
  import RosetteLabels from './RosetteLabels.svelte';
  
  export let data = [];

  let width = 0;
  let height = 0;

  $: minDim = Math.min(width, height);
</script>

<div
  class="rosette-background"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  {#each data as cluster (cluster.id)}
    <RosetteLabels
      cluster={cluster}
      parentMinDim={minDim}
    />
  {/each}
</div>

<style>
  .rosette-background {
    position: absolute;
    z-index: 5;
    width: 100%;
    height: 100%;
  }
</style>
