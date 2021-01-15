<script>
  import { layoutPhyllotaxis, layoutVoronoi } from '../utils/layout';
  import { getMinDim } from '../utils/math';
  import { radiusScale, createRadiusScale } from '../stores/scales';
  import { createSimulation } from '../utils/force';
  import { grouping } from '../stores/control';

  import ControlPane from './ControlPane.svelte';
  import CanvasPane from './CanvasPane.svelte';

  export let data = [];

  let width = 0;
  let height = 0;
  let simulation;
  let renderedData = [];

  $: minDim = getMinDim(width, height);
  $: radiusScale.set(createRadiusScale(minDim));

  $: {
    const selectedGrouping = $grouping.find((g) => g.selected);

    if (selectedGrouping) {
      const clusters = selectedGrouping.values;

      let lastId = Math.max(...data.map((d) => +d.id));
      let clustersData = clusters.map((cluster) => {
        const clusterData = data.filter((d) => d[selectedGrouping.name] === cluster);
        const { phyllotaxisData, lastId: newLastId } = layoutPhyllotaxis(clusterData, $radiusScale, lastId);
        lastId = newLastId;
        return phyllotaxisData;
      })
      .map((d, i) => {
        return {
          id: i,
          name: clusters[i],
          r: Math.max(...d.filter((dd) => dd.draw).map((dd) => [Math.abs(dd.x), Math.abs(dd.y)]).flat()),
          outerR: Math.max(...d.map((dd) => [Math.abs(dd.x), Math.abs(dd.y)]).flat()),
          color: selectedGrouping.color,
          data: d,
        };
      })
      .map((d) => {
        const voronoiData = layoutVoronoi(d);
        return voronoiData;
      });;

      function simulationTicked() {
        clustersData = clustersData.map((d) => {
          const radius = d.r * 1.3;
          return {
            ...d,
            x: Math.max(-width / 2 + radius, Math.min(width / 2 - radius, d.x)),
            y: Math.max(-height / 2 + radius, Math.min(height / 2 - radius, d.y))
          }
        });
      }

      function simulationEnded() {
        renderedData = [...clustersData];
      }

      simulation = createSimulation(clustersData, simulationTicked, simulationEnded);
    }
  }
</script>

<div
  class="visualization-wrapper"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  <ControlPane />
  <CanvasPane
    data={renderedData}
  />
</div>

<style>
  .visualization-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
</style>
