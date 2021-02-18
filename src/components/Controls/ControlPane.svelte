<script>
  import { groupControl, colorControl } from '../../stores/control';
  import { background } from '../../utils/colors';
  import { css } from '../../actions/css';

  import ControlButton from './ControlButton.svelte';

  export let height = 0;

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
  }

  $: buttonArray = [...new Set([...$groupControl, ...$colorControl].filter((d) => d.show).map((d) => d.name))];
</script>

<div
  class="control-pane"
  bind:clientHeight={height}
  use:css={{background}}
>
  <div class="color-control-buttons">
    {#each buttonArray as controlName, i (controlName)}
      <ControlButton
        name={controlName}
        groupControl={$groupControl.find((d) => d.name === controlName)}
        colorControl={$colorControl.find((d) => d.name === controlName)}
        showExplanation={i === 0}
        on:click={handleButtonClick}
      />
    {/each}
  </div>
</div>

<style>
  .control-pane {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0 0 0.5em 0;
  }

  .control-pane > div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 3em 1.1em 3em;
    background-color: var(--background);
    opacity: 0.8;
    border: none;
    border-bottom-left-radius: 0.2em;
    border-bottom-right-radius: 0.2em;
  }
</style>
