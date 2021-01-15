<script>
  import { createEventDispatcher } from 'svelte';
  import { t } from '../stores/i18n';
  import { css } from '../actions/css';

  import Diamond from './Diamond.svelte';

  export let group = {};

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('click', group.name);
  }
</script>

<div
  class="grouping-button"
  class:selected={group.selected}
  use:css={{color: group.color}}
  on:click={handleClick}
>
  <div class="content">
    <span class="diamond-wrapper">
      <Diamond
        color={group.color}
        filled={group.selected}
      />
    </span>
    <span class="name">
      {$t(`grouping.${group.name}`)}
    </span>
  </div>
</div>

<style>
  .grouping-button {
    height: 2em;
    margin: 0 0.3em;
    cursor: pointer;
    user-select: none;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0 0.2em;
    color: var(--color);
  }

  span {
    display: block;
    height: 1.3em;
  }

  .diamond-wrapper {
    width: 1.2em;
    height: 1.2em;
    margin: 0.3em;
  }

  .grouping-button:hover .name,
  .grouping-button.selected .name {
    border-bottom: 0.2em solid var(--color);
  }
</style>
