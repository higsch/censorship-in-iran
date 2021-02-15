<script>
  import { onMount } from 'svelte';
  import { csv } from 'd3-fetch';

  import { formatData } from './utils/format';
  import { groupControl, colorControl } from './stores/control';
  import { locale as localeStore, dict } from './stores/i18n';
  import { background } from './utils/colors'; 
  import { css } from './actions/css';

  import Visualization from './components/Visualization.svelte';

  export let dataPath = 'data/data.csv';
  export let dictionaryPath = 'data/dictionary.json';
  export let locale = 'en';

  let data = [];

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
  class="component-wrapper"
  use:css={{backgroundColor: background,
            font: 'Roboto, Helvetica, Arial, sans-serif'}}
>
  <Visualization
    data={data.map((d, i) => ({...d, id: i}))}
  />
</div>

<style>
  div :global(*) {
    margin: 0;
    padding: 0;
    font-family: var(--font);
    box-sizing: border-box;
  }

  .component-wrapper {
    width: 100%;
    height: 100%;
    padding: 0.7rem 0;
    font-size: 16px;
    background-color: var(--backgroundColor);
    overflow: hidden;
  }
</style>
