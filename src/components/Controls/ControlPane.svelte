<script>
  import { groupControl, colorControl } from '../../stores/control';
  import { hoveredLabel, selectedDatum } from '../../stores/selection';

  import ControlExplainer from './ControlExplainer.svelte';
  import ControlButton from './ControlButton.svelte';

  let buttonArray = [];

  function handleButtonClick(e) {
    const { type, name } = e.detail;
    switch (type) {
      case 'group':
        groupControl.select(name);
        break;
      case 'color':
        colorControl.select(name);
        break;
      case 'all':
        groupControl.select(name, true);
        colorControl.select(name, true);
        break;
    }
    hoveredLabel.set(null);
    selectedDatum.set(null);
  }

  $: buttonArray = [...new Set([...$groupControl, ...$colorControl].filter((d) => d.show).map((d) => d.name))];
</script>

<div
  class="control-pane"
>
  <ControlExplainer />
  <div class="control-buttons">
    {#each buttonArray as controlName, i (controlName)}
      <ControlButton
        name={controlName}
        groupControl={$groupControl.find((d) => d.name === controlName)}
        colorControl={$colorControl.find((d) => d.name === controlName)}
        on:click={handleButtonClick}
      />
    {/each}
  </div>
</div>

<style>
  .control-pane {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 1em 0;
  }

  .control-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 3em 1.1em 3em;
  }
</style>
