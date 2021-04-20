<script>
  import { onMount } from 'svelte';

  import { csv } from 'd3';
  import { formatData } from './utils/format';
  import { groupControl, colorControl } from './stores/control';
  import { locale as localeStore, dict } from './stores/i18n';
  import { dateDiffInDays } from './utils/math';
  import { background, defaultColor, yellow } from './utils/colors'; 
  import { css } from './actions/css';

  import CookieBanner from './components/CookieBanner.svelte';
  import Catch from './components/Catch.svelte';
  import Visualization from './components/Visualization.svelte';
  import LocaleSelector from './components/LocaleSelector.svelte';
  import Footer from './components/Footer.svelte';
  import ScrollNote from './components/ScrollNote.svelte';

  // export let dataPath = 'data/data.csv';
  export let dataPath = 'https://uq8kevhtqn.journalismisnotacrime.com/wall/prisonerslist';
  export let dictionaryPath = 'data/dictionary.json';
  export let locale = 'en';

  const localStorageKey = 'rosette_data';

  let data = [];
  let width = 0;

  function selectLocale(e) {
    const { detail: selectedLocale } = e;
    localeStore.set(selectedLocale);
  }

  function loadData() {
    // csv(dataPath, formatData)
    //   .then((res) => {
    //     data = res;
    //     try {
    //       localStorage.setItem(localStorageKey, JSON.stringify({created: (new Date()).getTime(), data}));
    //     } catch (err) {
    //       console.log('Could not cache data.', err);
    //     }
    //     groupControl.init(data);
    //     colorControl.init(data);
    //   });
  
  fetch(dataPath)
    .then((res) => res.json())
    .then(({data: parsed}) => {
      data = parsed.map(formatData);
      try {
        localStorage.setItem(localStorageKey, JSON.stringify({created: (new Date()).getTime(), data}));
      } catch (err) {
        console.log('Could not cache data.', err);
      }
      groupControl.init(data);
      colorControl.init(data);
    });
  };

  onMount(() => {
    localeStore.set(locale);
    fetch(dictionaryPath)
      .then((res) => res.json())
      .then((dictionary) => {
        dict.set(dictionary);
      });

    const json = localStorage.getItem(localStorageKey);

    if (json) {
      const { created, data: localData } = JSON.parse(json);
      if (created && dateDiffInDays(created, (new Date()).getTime()) < 7) {
        data = localData;
        groupControl.init(data);
        colorControl.init(data);
      } else {
        loadData();
      }
    } else {
      loadData();
    }
  });

  $: isMobile = width < 600;
  $: isOldBrowser = (/MSIE|Trident/.test(window.navigator.userAgent));
</script>

<div
  class="component-wrapper {locale}"
  bind:clientWidth={width}
  use:css={{backgroundColor: background,
            defaultColor,
            yellow,
            font01: 'Roboto, Helvetica, Arial, sans-serif',
            // font01: '"Shippori Mincho B1", serif',
            font02: 'Roboto, Helvetica, Arial, sans-serif'}}
>
  <CookieBanner />
  {#if (isMobile)}
    <Catch
      contentEn={'Please visit us on a larger screen to explore the visualization.'}
      contentFa={'لطفا این صفحه را روی کامپیوتر یا لپتاپ ببینید'}
    />
  {:else if (isOldBrowser)}
    <Catch content={'Please visit us with a modern browser.'} />
  {:else}
    <Visualization
      data={data.map((d, i) => ({id: i, ...d}))}
    />
    <LocaleSelector
      locale={$localeStore}
      on:localeselected={selectLocale}
    />
    <Footer />
    <ScrollNote />
  {/if}
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
    min-height: 1500px;
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
