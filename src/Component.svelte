<script>
  import { onMount } from 'svelte';
  import { csv } from 'd3-fetch';

  import { formatData } from './utils/format';
  import { groupControl, colorControl } from './stores/control';
  import { locale as localeStore, dict, dir } from './stores/i18n';
  import { background } from './utils/colors'; 
  import { css } from './actions/css';

  import Visualization from './components/Visualization.svelte';
  import LocaleSelector from './components/LocaleSelector.svelte';

  export let dataPath = 'data/data.csv';
  export let dictionaryPath = 'data/dictionary.json';
  export let locale = 'en';

  let data = [];

  function selectLocale(e) {
    const { detail: selectedLocale } = e;
    localeStore.set(selectedLocale);
  }

  onMount(() => {
    localeStore.set(locale);
    fetch(dictionaryPath)
      .then((res) => res.json())
      .then((dictionary) => {
        dict.set(dictionary);
      });

    csv(dataPath, formatData)
      .then((res) => {
        data = res;
        groupControl.init(data);
        colorControl.init(data);
      });
  });
</script>

<div
  class="component-wrapper {locale}"
  use:css={{backgroundColor: background,
            font: 'Roboto, Helvetica, Arial, sans-serif'}}
>
  <Visualization
    data={data.map((d, i) => ({...d, id: i}))}
  />
  <LocaleSelector
    locale={$localeStore}
    on:localeselected={selectLocale}
  />
</div>

<style>
  div :global(*) {
    margin: 0;
    padding: 0;
    font-family: var(--font);
    opacity: 1;
    box-sizing: border-box;
  }

  .component-wrapper {
    position: relative;
    width: 100%;
    height: 120vh;
    font-size: 12px;
    background-color: var(--backgroundColor);
    overflow: hidden;
  }

  @media (min-width: 600px) {
    .component-wrapper {
      font-size: 15px;
    }
  }

  @media (min-width: 980px) {
    .component-wrapper {
      font-size: 17px;
    }
  }

  @media (min-width: 1260px) {
    .component-wrapper {
      font-size: 18px;
    }
  }

  @media (min-width: 1950px) {
    .component-wrapper {
      font-size: 20px;
    }
  }
</style>
