<script>
  import { layoutPhyllotaxis } from '../utils/layout';
  import { getMinDim } from '../utils/math';
  import { radiusScale, createRadiusScale } from '../utils/scales';

  import CanvasPane from './CanvasPane.svelte';

  export let data = [];

  let width = 0;
  let height = 0;

  $: minDim = getMinDim(width, height);
  $: radiusScale.set(createRadiusScale(minDim));
  
  $: renderedData = layoutPhyllotaxis(data, $radiusScale);
</script>

<div
  class="visualization-wrapper"
  bind:clientWidth={width}
  bind:clientHeight={height}
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
