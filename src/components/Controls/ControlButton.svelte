<script>
  import { createEventDispatcher } from 'svelte';
  import { t, dir } from '../../stores/i18n';
  import { css } from '../../actions/css';
  import { defaultColor, yellow } from '../../utils/colors';

  import Diamond from '../Diamond.svelte';

  export let name;
  export let groupControl = {};
  export let colorControl = {};
  export let showHighlight = true;

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
  class:ltr={$dir === 'ltr'}
  class:rtl={$dir === 'rtl'}
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
      {#if (showHighlight && groupControl.selected)}
        <span
          class="highlight"
        ></span>
      {/if}
    </span>
    <span
      class="color-diamond-wrapper"
      on:click={() => handleClick('color')}
    >
      <Diamond
        color={yellow}
        filled={colorControl.selected}
      />
      {#if (showHighlight && colorControl.selected)}
        <span
          class="highlight"
        ></span>
      {/if}
    </span>
    <span
      class="name"
      class:grouped={groupControl.selected}
      class:colored={colorControl.selected}
      on:click={() => handleClick('all')}  
    >
      {$t(`grouping.${name}`)}
    </span>
  </div>
  <div class="explanation">
    {#if (groupControl.selected)}
      <span class="group-explanation-line">
        <span class="group-explanation-label">{$t('controlpane.grouping')}</span>
      </span>
    {/if}
    {#if (colorControl.selected)}
      <span class="color-explanation-line">
        <span class="color-explanation-label">{$t('controlpane.coloring')}</span>
      </span>
    {/if}
  </div>
</div>

<style>
  @keyframes pulse {
    0% {
      transform: scale(0);
      opacity: 0.9;
    }
    50% {
      opacity: 0.8;
    }
    70% {
      opacity: 0.09;
    }
    100% {
      transform: scale(3);
      opacity: 0;
    }
  }

  .grouping-button {
    position: relative;
    height: 2em;
    margin: 0 1em;
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
    cursor: pointer;
    pointer-events: all;
  }

  span {
    height: 1.3em;
  }

  .group-diamond-wrapper, .color-diamond-wrapper {
    position: relative;
    width: 1.4em;
    height: 1.4em;
    margin: 0.1em;
  }

  .highlight {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    width: 1.4em;
    height: 1.4em;
    border: 2px solid var(--color1);
    border-radius: 100%;
    opacity: 0;
    animation: pulse 3s infinite ease-in-out;
    animation-iteration-count: 20;
    pointer-events: none;
  }

  .name {
    margin: 0 0.2rem;
    font-weight: 300;
    white-space: pre;
  }

  .name.grouped {
    text-shadow: 0px 0px 0.1em var(--color1);
  }

  .name.colored {
    color: var(--color2);
  }

  .turned {
    transform: rotate(45deg);
  }

  .explanation {
    position: relative;
    top: -0.2em;
  }

  .group-explanation-line {
    position: absolute;
    display: inline-block;
    width: 0.5em;
    height: 0.5em;
    border-bottom: 1px solid var(--color1);
  }

  .grouping-button.ltr .group-explanation-line {
    left: 0.6em;
    border-right: 1px solid var(--color1);
  }

  .grouping-button.rtl .group-explanation-line {
    right: 0.5em;
    border-left: 1px solid var(--color1);
  }

  .group-explanation-label {
    position: absolute;
    display: inline-block;
    right: 0.7em;
    color: var(--color1);
    font-size: 0.7em;
    font-weight: 300;
    text-align: right;
  }

  .grouping-button.rtl .group-explanation-label {
    left: 0.9em;
    right: auto;
    text-align: left;
  }

  .color-explanation-line {
    position: absolute;
    display: inline-block;
    width: 0.5em;
    height: 0.5em;
    border-bottom: 1px solid var(--color2);
  }

  .grouping-button.ltr .color-explanation-line {
    left: 2.6em;
    border-left: 1px solid var(--color2);
  }

  .grouping-button.rtl .color-explanation-line {
    right: 2.55em;
    border-right: 1px solid var(--color2);
  }

  .color-explanation-label {
    position: absolute;
    display: inline-block;
    left: 0.7em;
    color: var(--color2);
    font-size: 0.7em;
    font-weight: 300;
  }

  .grouping-button.rtl .color-explanation-label {
    left: auto;
    right: 0.9em;
  }
</style>
