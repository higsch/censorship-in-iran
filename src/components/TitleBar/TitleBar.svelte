<script>
  import { groupControl, colorControl } from '../../stores/control';
  import { hoveredLabel, selectedDatum } from '../../stores/selection';
  import { defaultColor, background } from '../../utils/colors';
  import { css } from '../../actions/css';

  import Title from './Title.svelte';
  import Intro from './Intro.svelte';

  // function handleInfoTitlesClick(e) {
  //   const { detail: { selectGroup, selectColor, hoverColor } = {} } = e || {};

  //   if (selectGroup && selectGroup !== $groupControl.find((d) => d.selected).name) {
  //     groupControl.select(selectGroup);
  //     selectedDatum.set(null);
  //   }

  //   if (selectColor && selectColor !== $colorControl.find((d) => d.selected).name) {
  //     colorControl.select(selectColor);
  //     selectedDatum.set(null);
  //   }

  //   if (hoverColor) {
  //     hoveredLabel.set({
  //       name: selectColor,
  //       value: hoverColor
  //     });
  //   }
  // }
</script>

<div
  class="title-bar"
  use:css={{defaultColor, background}}
>
  <div class="title-bar-content">
    <Title />
    <Intro />
    <div class="separator"></div>
    <!-- <ControlExplainer />
    <InfoTitles
      data={data}
      on:click={handleInfoTitlesClick}
    />
    <div class="separator"></div> -->
  </div>
</div>

<style>
  .title-bar {
    width: 100%;
  }

  .title-bar-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1000px;
    height: 100%;
    margin: 0 auto;
    padding: 0.3em 2em;
    font-size: 0.9em;
  }

  .separator {
    width: 70%;
    max-width: 200px;
    height: 1px;
    margin: 0.3em auto 0 auto;
    background: linear-gradient(
                  90deg,
                  var(--background) 0%,
                  var(--defaultColor) 10%,
                  var(--defaultColor) 90%,
                  var(--background) 100%
                );
  }
</style>
