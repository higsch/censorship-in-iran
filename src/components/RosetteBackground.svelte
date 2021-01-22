<script>
  import RosetteLabel from './RosetteLabel.svelte';
  
  export let data = [];
</script>

<div
  class="rosette-background"
>
  {#each data as cluster (cluster.id)}
    <RosetteLabel
      cluster={cluster}
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
