<script>
  import { batchLayoutClusters, layoutBar } from '../utils/layout';
  import { radiusScale, createRadiusScale } from '../stores/scales';
  import { groupControl, colorControl } from '../stores/control';

  import ControlPane from './Controls/ControlPane.svelte';
  import RosettesCanvasPane from './Rosettes/RosettesCanvasPane.svelte';
  import RosetteForeground from './Rosettes/RosetteForeground.svelte';

  export let data = [];

  let width = 0;
  let height = 0;
  let renderedData = [];
  let showLabels = false;

  $: maxDim = Math.min(2000, Math.max(width, height));
  $: radiusScale.set(createRadiusScale(maxDim));

  $: {
    const selectedGrouping = $groupControl.find((c) => c.selected);
    const selectedColor = $colorControl.find((c) => c.selected);

    if (selectedGrouping) {
      showLabels = selectedColor && selectedColor.name !== 'none';
      const clustersData = batchLayoutClusters(selectedGrouping, selectedColor, data, $radiusScale);
      renderedData = layoutBar(clustersData, width, height, showLabels);
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
    <RosetteForeground
      data={renderedData}
      showLabels={showLabels}
    />
    <RosettesCanvasPane
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
