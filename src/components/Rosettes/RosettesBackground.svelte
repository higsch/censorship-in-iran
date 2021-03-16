<script>
    import { hoveredClusterId } from '../../stores/selection';
    import { groupControl } from '../../stores/control';
    import { defaultColor, background } from '../../utils/colors';

    import RosetteTitle from '../RosetteAnnotation/RosetteTitle.svelte';

    export let data = [];
    export let showClusterTitles = true;

    $: ({ name: groupControlName } = $groupControl.find((c) => c.selected) || {});
</script>

<div class="rosette-background">
  {#if (showClusterTitles)}
    {#each data as cluster (cluster.id)}
      <RosetteTitle
        cluster={cluster}
        groupControlName={groupControlName}
        textColor={background}
        backgroundColor={defaultColor}
        hovered={$hoveredClusterId !== null && $hoveredClusterId === cluster.id}
      />
    {/each}
  {/if}
</div>

<style>
  .rosette-background {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
</style>
