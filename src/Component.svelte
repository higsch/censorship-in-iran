<script>
  import Visualization from './components/Visualization.svelte';

  export let data = [];
</script>

<div class="component-wrapper">
  <Visualization
    data={data.map((d, i) => ({...data, id: i}))}
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
