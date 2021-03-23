<script>
  import { onMount } from 'svelte';
  import { csv } from 'd3-fetch';

  import { formatData } from './utils/format';
  import { groupControl, colorControl } from './stores/control';
  import { locale as localeStore, dict } from './stores/i18n';
  import { background, defaultColor, yellow } from './utils/colors'; 
  import { css } from './actions/css';

  import Visualization from './components/Visualization.svelte';
  import LocaleSelector from './components/LocaleSelector.svelte';
  import Footer from './components/Footer.svelte';

  export let dataPath = 'data/data.csv';
  export let apiPath = 'https://uq8kevhtqn.journalismisnotacrime.com/wall/prisonerslist';
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

    // csv(dataPath, formatData)
    //   .then((res) => {
    //     data = res;
    //     groupControl.init(data);
    //     colorControl.init(data);
    //   });
    
    fetch(apiPath)
      .then((res) => res.json())
      .then(({data: parsed}) => {
        data = parsed.map(formatData);
        groupControl.init(data);
        colorControl.init(data);
      })
  });
</script>

<div
  class="component-wrapper {locale}"
  use:css={{backgroundColor: background,
            defaultColor,
            yellow,
            font01: 'Roboto, Helvetica, Arial, sans-serif',
            // font01: '"Shippori Mincho B1", serif',
            font02: 'Roboto, Helvetica, Arial, sans-serif'}}
>
  <Visualization
    data={data.map((d, i) => ({...d, id: i}))}
  />
  <LocaleSelector
    locale={$localeStore}
    on:localeselected={selectLocale}
  />
  <Footer />
</div>

<style>
  div :global(*) {
    margin: 0;
    padding: 0;
    font-family: var(--font02);
    opacity: 1;
    box-sizing: border-box;
  }

  :global(a) {
    color: var(--yellow);
    text-decoration: none;
    pointer-events: all;
  }

  :global(a:hover) {
    text-decoration: underline;
  }

  .component-wrapper {
    position: relative;
    width: 100%;
    height: 150vh;
    min-height: 1200px;
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
      font-size: 16px;
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
