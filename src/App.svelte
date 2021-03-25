<script>
  import Component from './Component.svelte';
</script>

<div class="app-wrapper">
  <Component
    dictionaryPath="data/dictionary.json"
    locale="en"
  />
</div>

<style>
  .app-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
