<script>
  import { batchLayoutClusters, layoutForce, layoutBar } from '../utils/layout';
  import { getMinDim } from '../utils/math';
  import { radiusScale, createRadiusScale } from '../stores/scales';
  import { grouping } from '../stores/control';

  import ControlPane from './ControlPane.svelte';
  import CanvasPane from './CanvasPane.svelte';

  export let data = [];

  let width = 0;
  let height = 0;
  let renderedData = [];

  $: minDim = getMinDim(width, height);
  $: radiusScale.set(createRadiusScale(minDim));

  $: {
    const selectedGrouping = $grouping.find((g) => g.selected);

    if (selectedGrouping) {
      const clustersData = batchLayoutClusters(selectedGrouping, data, $radiusScale);
      renderedData = layoutBar(clustersData, width, height);
    }
  }
</script>

<div
  class="visualization-wrapper"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  <ControlPane />
  <CanvasPane
    data={renderedData}
  />
</div>

<style>
  .visualization-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
</style>
