<script>
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';
  import { css } from '../../actions/css';
  import { t } from '../../stores/i18n';

  export let cluster;
  export let groupControlName = 'none';
  export let textColor = '#FFFFFF';

  const movingDuration = 1000;

  const x = tweened(null, {
    duration: movingDuration,
    easing: cubicOut
  });

  const y = tweened(null, {
    duration: movingDuration,
    easing: cubicOut
  });

  $: dimFactor = cluster.data[0].r * 5;

  $: x.set(cluster.xAbsolute - 2 * Math.max(cluster.data[0].r * 3, cluster.r));
  $: y.set(cluster.yAbsolute - cluster.r - dimFactor);
  $: width = 4 * Math.max(cluster.data[0].r * 3, cluster.r);
  $: height = 2 * cluster.r + dimFactor;
</script>

<div
  class="rosette-title"
  use:css={{left: `${$x}px`,
            top: `${$y}px`,
            width: `${width}px`,
            height: `${height}px`,
            textColor}}
>
  <h2
    transition:fade
  >
    <span class="description">
      {$t(`groupingvalues.${groupControlName}.${cluster.name}`)}
    </span>
    <span class="number">
      ({cluster.data.filter((d) => d.draw).length})
    </span>
  </h2>
</div>

<style>
  .rosette-title {
    position: absolute;
    left: var(--left);
    top: var(--top);
    z-index: 15;
    width: var(--width);
    height: var(--height);
    /* border: 1px solid red; */
  }

  h2 {
    width: 100%;
    font-family: var(--font);
    font-size: 0.9rem;
    font-weight: normal;
    text-align: center;
    color: var(--textColor);
  }

  span {
    display: inline-block;
  }

  span.number {
    font-size: 0.8rem;
  }
</style>
