<script>
  import { onMount } from 'svelte';
  import { csv } from 'd3-fetch';

  import { formatData } from './utils/format';

  import Visualization from './components/Visualization.svelte';

  export let dataPath = 'data/data.csv';

  let data = [];

  onMount(() => {
    csv(dataPath, formatData).then((res) => data = res);
  });

  $: console.log(data)
</script>

<div class="component-wrapper">
  <Visualization
    data={data.map((d, i) => ({...d, id: i, cluster: d.institutioninvestigating}))}
  />
</div>

<style>
  div :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .component-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
