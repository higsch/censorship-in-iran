<script>
  import { groupingControl, colorControl } from '../stores/control';

  import ControlButton from './ControlButton.svelte';

  function handleGroupingButtonClick(e) {
    groupingControl.select(e.detail);
  }
  
  function handleColorButtonClick(e) {
    colorControl.select(e.detail);
  }
</script>

<div class="control-pane">
  <div class="grouping-control-buttons">
    {#each $groupingControl as group (group.id)}
      <ControlButton
        control={group}
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
