<script>
  import CanvasPane from './CanvasPane.svelte';

  export let data = [];
</script>

<div
  class="visualization-wrapper"
>
  <CanvasPane />
</div>

<style>
  .visualization-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
