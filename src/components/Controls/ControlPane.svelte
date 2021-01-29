<script>
  import { groupControl, colorControl } from '../../stores/control';
  import { defaultColor } from '../../utils/colors';

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
    }
  }

  $: buttonArray = [...new Set([...$groupControl, ...$colorControl].map((d) => d.name))];
</script>

<div class="control-pane">
  <!-- <div class="grouping-control-buttons">
    {#each $groupControl as group (group.id)}
      <ControlButton
        control={group}
        color={defaultColor}
        on:click={handleGroupingButtonClick}
      />
    {/each}
  </div>
  <div class="color-control-buttons">
    {#each $colorControl as color (color.id)}
      <ControlButton
        control={color}
        on:click={handleColorButtonClick}
      />
    {/each}
  </div> -->
  <div class="color-control-buttons">
    {#each buttonArray as controlName (controlName)}
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .control-pane > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
</style>
