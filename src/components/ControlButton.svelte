<script>
  import { createEventDispatcher } from 'svelte';
  import { t } from '../stores/i18n';
  import { css } from '../actions/css';

  import Diamond from './Diamond.svelte';

  export let control = {};

  const dispatch = createEventDispatcher();
  const color = '#DAE2F5';

  function handleClick() {
    dispatch('click', control.name);
  }
</script>

<div
  class="grouping-button"
  class:selected={control.selected}
  use:css={{color}}
  on:click={handleClick}
>
  <div class="content">
    <span class="diamond-wrapper">
      <Diamond
        color={color}
        filled={control.selected}
      />
    </span>
    <span class="name">
      {$t(`grouping.${control.name}`)}
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
