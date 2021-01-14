<script>
  import { grouping } from '../stores/control';

  import GroupingButton from './GroupingButton.svelte';

  function handleGroupingButtonClick(e) {
    grouping.select(e.detail);
  }
</script>

<div class="control-pane">
  {#each $grouping as group (group.id)}
    <GroupingButton
      group={group}
      on:click={handleGroupingButtonClick}
    />
  {/each}
</div>

<style>
  .control-pane {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
</style>
