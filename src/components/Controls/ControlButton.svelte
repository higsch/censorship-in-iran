<script>
  import { createEventDispatcher } from 'svelte';
  import { t } from '../../stores/i18n';
  import { css } from '../../actions/css';
  import { defaultColor, yellow } from '../../utils/colors';

  import Diamond from '../Diamond.svelte';

  export let name;
  export let groupControl = {};
  export let colorControl = {};
  export let showExplanation = false;

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
  use:css={{color1: defaultColor, color2: yellow}}
>
  <div
    class="content"
  >
    <span
      class="group-diamond-wrapper turned"
      on:click={() => handleClick('group')}
    >
      <Diamond
        color={defaultColor}
        filled={groupControl.selected}
      />
    </span>
    <span
      class="color-diamond-wrapper"
      on:click={() => handleClick('color')}
    >
      <Diamond
        color={yellow}
        filled={colorControl.selected}
      />
    </span>
    <span
      class="name"
      on:click={() => handleClick('all')}  
    >
      {$t(`grouping.${name}`)}
    </span>
  </div>
  {#if (showExplanation)}
    <div class="explanation">
      <span class="group-explanation-line">
        <span class="group-explanation-label">Grouping</span>
      </span>
      <span class="color-explanation-line">
        <span class="color-explanation-label">Coloring</span>
      </span>
    </div>
  {/if}
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
    color: var(--color1);
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

  .turned {
    transform: rotate(45deg);
  }

  .explanation {
    position: relative;
  }

  .group-explanation-line {
    position: absolute;
    display: inline-block;
    left: 0.6em;
    width: 0.5em;
    height: 0.5em;
    border-right: 1px solid var(--color1);
    border-bottom: 1px solid var(--color1);
  }

  .group-explanation-label {
    position: absolute;
    display: inline-block;
    right: 0.7em;
    color: var(--color1);
    font-size: 0.8em;
  }

  .color-explanation-line {
    position: absolute;
    display: inline-block;
    left: 2.6em;
    width: 0.5em;
    height: 0.5em;
    border-left: 1px solid var(--color2);
    border-bottom: 1px solid var(--color2);
  }

  .color-explanation-label {
    position: absolute;
    display: inline-block;
    left: 0.7em;
    color: var(--color2);
    font-size: 0.8em;
  }
</style>
