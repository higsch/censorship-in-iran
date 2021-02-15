<script>
  import { createEventDispatcher } from 'svelte';
  import { css } from '../../actions/css';
  import { t } from '../../stores/i18n';

  export let name;
  export let valueName;
  export let value;
  export let n;
  export let color;
  export let hovered = false;
  export let anyHovered = false;
  export let element = undefined;

  const dispatch = createEventDispatcher();

  function handleMouseEnter(name, value) {
    if (!name) {
      dispatch('hover', null);
    } else {
      dispatch('hover', {
        name,
        value
      });
    }
  }
</script>

<div
  class="label-text"
  class:hovered={hovered}
  class:faded={anyHovered && !hovered}
  bind:this={element}
  use:css={{color: color}}
  on:mouseenter={() => handleMouseEnter(name, value)}
  on:mouseleave={() => handleMouseEnter(null)}
>
  <span class="number">{n}</span>
  <span class="description">{$t(`groupingvalues.${name}.${valueName}`)}</span>
</div>

<style>
  .label-text {
    display: flex;
    padding: 0.3rem 0.1rem;
    font-size: 0.9rem;
    color: #DAE2F5;
    pointer-events: all;
    user-select: none;
    cursor: pointer;
    border-left: 2px solid transparent;
    transition: opacity 0.2s ease-out;
  }

  .label-text .number {
    display: inline-block;
    min-width: 1.6rem;
    font-size: inherit;
    font-weight: 500;
    text-align: right;
    transition: color 0.2s ease-out;
  }

  .label-text.hovered .number {
    color: var(--color);
  }

  .label-text .description {
    display: inline-block;
    margin: 0 0.2rem;
    color: var(--color);
    font-size: inherit;
    opacity: 0.8;
  }

  .label-text.faded {
    opacity: 0.3;
  }
</style>
