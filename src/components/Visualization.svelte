<script>
  import { batchLayoutClusters, layoutBar } from '../utils/layout';
  import { radiusScale, createRadiusScale } from '../stores/scales';
  import { groupControl, colorControl } from '../stores/control';
  import { hoveredDatum, selectedDatum } from '../stores/selection';
  import { dir, i18nReady } from '../stores/i18n';

  import TitleBar from './TitleBar/TitleBar.svelte';
  import ControlPane from './Controls/ControlPane.svelte';
  import RosettesBackground from './Rosettes/RosettesBackground.svelte';
  import RosettesCanvasPane from './Rosettes/RosettesCanvasPane.svelte';
  import RosettesForeground from './Rosettes/RosettesForeground.svelte';
  import DatumTooltip from './RosetteAnnotation/DatumTooltip.svelte';
  import Profile from './Profile/Profile.svelte';
  import LoadingSpinner from './LoadingSpinner.svelte';

  export let data = [];

  let width = 0;
  let height = 0;
  let headerHeight = 0;
  let renderedData = [];
  let showClusterTitles = true;
  let showLabels = false;

  let selectedGroup;
  let selectedColor;

  function handleProfileClose() {
    selectedDatum.set(null);
  }

  function handleKeydown(e) {
    if (e.keyCode === 27) handleProfileClose();
  }

  $: maxDim = Math.sqrt(width * height);
  $: radiusScale.set(createRadiusScale(maxDim));

  $: drawMargin = {
      top: headerHeight + 50,
      right: 0,
      bottom: 30,
      left: 0
    };

  $: if (data && data.length && width > 0) {
    selectedGroup = $groupControl.find((c) => c.selected);
    selectedColor = $colorControl.find((c) => c.selected);

    // if (renderedData.length) $selectedDatum = {d: renderedData[0].data[21], pos: []};
    
    showClusterTitles = !$selectedDatum && selectedGroup.show;
    showLabels = !$selectedDatum && selectedColor.show && selectedGroup.name !== selectedColor.name;

    const clustersData = batchLayoutClusters(selectedGroup, selectedColor, data, $radiusScale);
    renderedData = layoutBar(clustersData, width, height, drawMargin, $dir, showLabels);
  }

  $: if ($selectedDatum) $hoveredDatum = null;
</script>

<svelte:window on:keydown={handleKeydown}/>

<div
  class="visualization-wrapper"
>
  {#if (!renderedData || renderedData.length === 0)}
    <LoadingSpinner />
  {/if}
  <div
    class="visualization-header"
    bind:clientHeight={headerHeight}  
  >
    <TitleBar />
    <ControlPane
      topOffset={headerHeight}
    />
  </div>
  <div
    class="draw-wrapper"
    bind:clientWidth={width}
    bind:clientHeight={height}
  >
    <RosettesBackground
      data={renderedData}
      showClusterTitles={showClusterTitles}
    />
    <RosettesCanvasPane
      data={renderedData}
    />
    <RosettesForeground
      data={renderedData}
      showLabels={showLabels}
    />
    {#if ($selectedDatum)}
      <Profile
        datum={$selectedDatum.d}
        topOffset={headerHeight}
        on:close={handleProfileClose}
      />
    {/if}
  </div>
  {#if ($hoveredDatum && !$selectedDatum)}
    <DatumTooltip
      tooltip={$hoveredDatum}
      parentWidth={width}
      parentHeight={height}
      selectedGroup={selectedGroup}
      selectedColor={selectedColor}
    />
  {/if}
</div>

<style>
  .visualization-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  
  .visualization-header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 90;
    width: 100%;
    pointer-events: none;
  }

  .draw-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
