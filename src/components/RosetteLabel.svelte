<script>
  import { css } from '../actions/css';

  import RosetteLabelCanvasPane from './RosetteLabelCanvasPane.svelte';

  export let cluster = {};

  $: ({ data = [] } = cluster);

  $: dimensions = {
      x: `${cluster.xAbsolute - cluster.r}px`,
      y: `${cluster.yAbsolute - cluster.maxDiameter / 2 - cluster.ySpacing}px`,
      width: `${2 * cluster.r + cluster.xSpacing}px`,
      height: `${cluster.maxDiameter + cluster.ySpacing}px`
    };

  $: shiftedData = data.map((d) => {
      return {
        ...d,
        x: d.x - dimensions.x,
        y: d.y - dimensions.y
      };
    });
</script>

<div
  class="rosette-label"
  use:css={dimensions}
>
  <RosetteLabelCanvasPane
    data={shiftedData}
  />
</div>

<style>
  .rosette-label {
    position: absolute;
    z-index: 6;
    left: var(--x);
    top: var(--y);
    width: var(--width);
    height: var(--height);
    border: 1px solid white;
  }
</style>
