<script>
  import { labelDimensions } from '../../stores/labels';

  import Tentacles from '../RosetteAnnotation/Tentacles.svelte';

  export let data = [];
</script>

<div class="rosette-background">
  {#each data as cluster (cluster.id)}
    <Tentacles
      cluster={cluster}
      labelDimensions={$labelDimensions[cluster.id]}
    />
  {/each}
</div>

<style>
  .rosette-background {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
</style>
