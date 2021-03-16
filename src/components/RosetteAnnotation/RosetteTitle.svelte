<script>
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';
  import { css } from '../../actions/css';
  import { t, availableLanguages as languages } from '../../stores/i18n';

  export let cluster;
  export let groupControlName = 'none';
  export let textColor = '#000000';
  export let backgroundColor = '#FFFFFF';
  export let hovered = false;

  const movingDuration = 1000;

  const x = tweened(null, {
    duration: movingDuration,
    easing: cubicOut
  });

  const y = tweened(null, {
    duration: movingDuration,
    easing: cubicOut
  });

  const h2bottom = tweened(null, {
    duration: movingDuration,
    easing: cubicOut
  });

  $: width = 4 * Math.max(cluster.data[0].r * 3, cluster.r);
  $: height = 2 * cluster.r + 2 * cluster.data[0].r;
  $: x.set(cluster.xAbsolute - 2 * Math.max(cluster.data[0].r * 3, cluster.r));
  $: y.set(cluster.yAbsolute - cluster.r - 2 * cluster.data[0].r);
  $: h2bottom.set(2 * cluster.r + 2 * cluster.data[0].r);

  $: number = cluster.data.filter((d) => d.draw).length;
</script>

<div
  class="rosette-title"
  class:hovered
  use:css={{left: `${$x}px`,
            top: `${$y}px`,
            width: `${width}px`,
            height: `${height}px`,
            h2bottom: `${$h2bottom}px`,
            textColor,
            backgroundColor}}
  transition:fade
>
  <h2
    class="background"
  >
    {$t(`groupingvalues.${groupControlName}.${cluster.name}`, 'fa').split(' ')[0]}
  </h2>
  <h2
    class="foreground"
  >
    <!-- {#if (number > 0)}
      <span class="number">
        {number}
      </span>
    {/if} -->
    <span class="description">
      {$t(`groupingvalues.${groupControlName}.${cluster.name}`)}
    </span>
  </h2>
</div>

<style>
  .rosette-title {
    position: absolute;
    left: var(--left);
    top: var(--top);
    z-index: 15;
    display: flex;
    justify-content: center;
    width: var(--width);
    height: var(--height);
  }

  h2, h2 span {
    font-family: var(--font01);
  }

  h2 {
    position: absolute;
    padding: 0.1em 0.4em;
    bottom: var(--h2bottom);
    font-size: 0.9em;
    font-weight: 300;
    text-align: center;
    color: var(--backgroundColor);
    opacity: 0.7;
    border: none;
    border-radius: 2px;
    transition: opacity 0.2s;
  }

  h2.background {
    color: #000000;
    font-size: 3em;
    opacity: 0.3;
    transform: translateY(0.4em);
  }

  .rosette-title.hovered h2 {
    opacity: 1.0;
  }

  span {
    display: inline-block;
  }

  span.number {
    font-weight: 500;
  }
</style>
