<script>
  import { batchLayoutClusters, layoutBar } from '../utils/layout';
  import { getMinDim } from '../utils/math';
  import { radiusScale, createRadiusScale } from '../stores/scales';
  import { groupingControl, colorControl } from '../stores/control';

  import ControlPane from './ControlPane.svelte';
  import CanvasPane from './CanvasPane.svelte';
  import RosetteBackground from './RosetteBackground.svelte';

  export let data = [];

  let width = 0;
  let height = 0;
  let renderedData = [];

  $: minDim = getMinDim(width, height);
  $: radiusScale.set(createRadiusScale(minDim));

  $: {
    const selectedGrouping = $groupingControl.find((c) => c.selected);
    const selectedColor = $colorControl.find((c) => c.selected);

    if (selectedGrouping) {
      const clustersData = batchLayoutClusters(selectedGrouping, selectedColor, data, $radiusScale);
      renderedData = layoutBar(clustersData, width, height);
    }
  }
</script>

<div
  class="visualization-wrapper"
>
  <ControlPane />
  <div
    class="draw-wrapper"
    bind:clientWidth={width}
    bind:clientHeight={height}
  >
    <RosetteBackground
      data={renderedData}
    />
    <CanvasPane
      data={renderedData}
    />
  </div>
</div>

<style>
  .visualization-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .draw-wrapper {
    position: relative;
    flex: 1;
    width: 100%;
    overflow: hidden;
  }
</style>
