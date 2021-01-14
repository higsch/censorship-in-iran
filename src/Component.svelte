<script>
  import { onMount } from 'svelte';
  import { csv } from 'd3-fetch';

  import { formatData } from './utils/format';
  import { grouping } from './stores/control';
  import { locale as localeStore, dict } from './stores/i18n';

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
        grouping.init(data);
      });
  });
</script>

<div class="component-wrapper">
  <Visualization
    data={data.map((d, i) => ({...d, id: i}))}
  />
</div>

<style>
  div :global(*) {
    margin: 0;
    padding: 0;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-size: 16px;
    box-sizing: border-box;
  }

  .component-wrapper {
    width: 100%;
    height: 100%;
    margin: 0.7rem 0;
    overflow: hidden;
  }
</style>
