<script>
  import Component from './Component.svelte';
</script>

<div class="app-wrapper">
  <Component
    dataPath="data/data.csv"
    dictionaryPath="data/dictionary.json"
    locale="fa"
  />
</div>

<style>
  .app-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
