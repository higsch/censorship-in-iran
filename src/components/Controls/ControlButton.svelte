<script>
  import { createEventDispatcher } from 'svelte';
  import { t } from '../../stores/i18n';
  import { css } from '../../actions/css';

  import Diamond from '../Diamond.svelte';

  export let name;
  export let groupControl = {};
  export let colorControl = {};
  export let color = '#DAE2F5';

  const dispatch = createEventDispatcher();

  function handleClick(type) {
    dispatch('click', {
      type,
      name
    });
  }
</script>

<div
  class="grouping-button"
  use:css={{color}}
>
  <div class="content">
    <span
      class="group-diamond-wrapper"
      on:click={() => handleClick('group')}
    >
      <Diamond
        color={color}
        filled={groupControl.selected}
        turn={45}
      />
    </span>
    <span
      class="color-diamond-wrapper"
      on:click={() => handleClick('color')}
    >
      <Diamond
        color={color}
        filled={colorControl.selected}
      />
    </span>
    <span class="name">
      {$t(`grouping.${name}`)}
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
    height: 1.3em;
  }

  .group-diamond-wrapper, .color-diamond-wrapper {
    width: 1.4em;
    height: 1.4em;
    margin: 0.1em;
  }

  .name {
    margin: 0 0.2rem;
  }
</style>
