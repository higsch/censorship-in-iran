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
    margin: 0.3rem 0;
    padding: 0 0.1rem;
    font-size: 0.9rem;
    color: #DAE2F5;
    pointer-events: all;
    user-select: none;
    cursor: pointer;
    border-left: 2px solid transparent;
    transition: border-left 0.2s ease-out 0.2s;
  }

  .label-text.hovered {
    border-left: 2px solid var(--color);
    transition: border-left 0.2s ease-out 0s;
  }

  .label-text .number {
    display: inline-block;
    min-width: 1.6rem;
    font-size: inherit;
    font-weight: bold;
    text-align: right;
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
</style>
