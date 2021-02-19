<script>
  import { groupControl, colorControl } from '../../stores/control';
  import { hoveredLabel } from '../../stores/selection';

  import ControlExplainer from './ControlExplainer.svelte';
  import InfoTitles from './InfoTitles.svelte';

  export let data;

  function handleInfoTitlesClick(e) {
    const { detail: { selectGroup, selectColor, hoverColor } = {} } = e || {};

    console.log($groupControl.find((d) => d.selected))
    if (selectGroup && selectGroup !== $groupControl.find((d) => d.selected).name) {
      groupControl.select(selectGroup);
    }

    if (selectColor && selectColor !== $colorControl.find((d) => d.selected).name) {
      colorControl.select(selectColor);
    }

    if (hoverColor) {
      hoveredLabel.set({
        name: selectColor,
        value: hoverColor
      });
    }
  }
</script>

<div
  class="title-bar"
>
  <div class="title-bar-content">
    <ControlExplainer />
    <InfoTitles
      data={data}
      on:click={handleInfoTitlesClick}
    />
  </div>
</div>

<style>
  .title-bar {
    width: 100%;
  }

  .title-bar-content {
    display: flex;
    width: 100%;
    max-width: 1000px;
    height: 100%;
    margin: 0 auto;
    padding: 0 2em;
  }
</style>
