<script>
  import { layoutPhyllotaxis } from '../utils/layout';

  import CanvasPane from './CanvasPane.svelte';

  export let data = [];

  $: renderedData = layoutPhyllotaxis(data);
</script>

<div
  class="visualization-wrapper"
>
  <CanvasPane
    data={renderedData}
  />
</div>

<style>
  .visualization-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
