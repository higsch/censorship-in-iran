<script>
  import Component from './Component.svelte';
</script>

<div class="app-wrapper">
  <Component
    dataPath="data/data.csv"
  />
</div>

<style>
  .app-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
