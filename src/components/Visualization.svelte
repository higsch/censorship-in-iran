<script>
  import { layoutPhyllotaxis } from '../utils/layout';
  import { getMinDim } from '../utils/math';
  import { radiusScale, createRadiusScale } from '../utils/scales';
  import { createSimulation } from '../utils/force';

  import CanvasPane from './CanvasPane.svelte';

  export let data = [];

  let width = 0;
  let height = 0;
  let simulation;
  let renderedData = [];

  $: minDim = getMinDim(width, height);
  $: radiusScale.set(createRadiusScale(minDim));

  $: {
    const clusters = [...new Set(data.map((d) => d.cluster))];
    
    const clustersData = clusters.map((cluster) => {
      const clusterData = data.filter((d) => d.cluster === cluster);
      return layoutPhyllotaxis(clusterData, $radiusScale);
    })
    .map((d, i) => {
      return {
        id: i,
        cluster: clusters[i],
        r: Math.max(...d.map((dd) => [Math.abs(dd.x), Math.abs(dd.y)]).flat()),
        data: d,
      };
    });

    function ticked() {
      renderedData = [...clustersData].map((d) => {
        const radius = d.r + d.data[0].r;
        return {
          ...d,
          x: Math.max(-width / 2 + radius, Math.min(width / 2 - radius, d.x)),
          y: Math.max(-height / 2 + radius, Math.min(height / 2 - radius, d.y))
        }
      });
    }

    simulation = createSimulation(clustersData, ticked);
  }
</script>

<div
  class="visualization-wrapper"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  <CanvasPane
    data={renderedData}
  />
</div>

<style>
  .visualization-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
