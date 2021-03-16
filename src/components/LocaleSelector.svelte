<script>
  import { createEventDispatcher } from 'svelte';
  import { availableLanguages as languages } from '../stores/i18n';

  export let locale = 'en';

  const dispatch = createEventDispatcher();

  function handleClick(selectedLocale) {
    dispatch('localeselected', selectedLocale);
  }

  $: otherLocale = Object.keys($languages).find((d) => d !== locale);
</script>

<div class="locale-selector">
  <button on:click={() => handleClick(otherLocale)}>{$languages[otherLocale]}</button>
</div>

<style>
  .locale-selector {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 100;
  }

  button {
    padding: 0.2em 0.5em;
    font-family: var(--font02);
    font-size: 0.8em;
    outline: none;
    border: 1px solid white;
    border-radius: 0.2em;
    cursor: pointer;
    transition: box-shadow 0.2s;
  }

  button:hover {
    box-shadow: 0px 0px 5px white;
  }
</style>
