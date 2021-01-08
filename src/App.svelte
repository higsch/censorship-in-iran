<script>
  import { csv } from 'd3-fetch';

  import Component from './Component.svelte';

  let data;

  csv('data/data.csv').then((res) => data = res);
</script>

<div class="app-wrapper">
  <Component
    data={data}
  />
</div>

<style>
  .app-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
