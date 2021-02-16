<script>
  import { batchLayoutClusters, layoutBar } from '../utils/layout';
  import { radiusScale, createRadiusScale } from '../stores/scales';
  import { groupControl, colorControl } from '../stores/control';
  import { hoveredDatum, selectedDatum } from '../stores/selection';

  import ControlPane from './Controls/ControlPane.svelte';
  import RosettesBackground from './Rosettes/RosettesBackground.svelte';
  import RosettesCanvasPane from './Rosettes/RosettesCanvasPane.svelte';
  import RosettesForeground from './Rosettes/RosettesForeground.svelte';
  import DatumTooltip from './RosetteAnnotation/DatumTooltip.svelte';
  import Profile from './Profile/Profile.svelte';

  export let data = [];

  let width = 0;
  let height = 0;
  let renderedData = [];
  let showClusterTitles = true;
  let showLabels = false;

  let selectedGroup;
  let selectedColor;

  function handleProfileClose() {
    $selectedDatum = null;
  }

  $: maxDim = Math.min(2000, Math.max(width, height));
  $: radiusScale.set(createRadiusScale(maxDim));

  $: {
    selectedGroup = $groupControl.find((c) => c.selected);
    selectedColor = $colorControl.find((c) => c.selected);

    showClusterTitles = !$selectedDatum && selectedGroup && selectedGroup.show;
    showLabels = !$selectedDatum && selectedColor && selectedColor.show && selectedGroup.name !== selectedColor.name;

    const clustersData = batchLayoutClusters(selectedGroup, selectedColor, data, $radiusScale);
    renderedData = layoutBar(clustersData, width, height, showLabels);
  }

  $: if ($selectedDatum) $hoveredDatum = null;
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
    <RosettesBackground
      data={renderedData}
    />
    <RosettesCanvasPane
      data={renderedData}
    />
    <RosettesForeground
      data={renderedData}
      showClusterTitles={showClusterTitles}
      showLabels={showLabels}
    />
    {#if ($hoveredDatum)}
      <DatumTooltip
        tooltip={$hoveredDatum}
        parentWidth={width}
        parentHeight={height}
        selectedColor={selectedColor}
      />
    {/if}
    {#if ($selectedDatum)}
      <Profile
        datum={$selectedDatum}
        on:close={handleProfileClose}
      />
    {/if}
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
