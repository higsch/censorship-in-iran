<script>
  import { css } from '../actions/css';

  export let color = '#000000';
  export let fillOpacity = 1.0;
  export let strokeWidth = '0.6em';
  export let filled = false;
  export let hoverEnabled = true;

  const margin = 10;
</script>

<svg
  viewBox="{-margin} {-margin} {100 + 2 * margin} {100 + 2 * margin}"
  class:hoverEnabled
  use:css={{color, strokeWidth, fill: color, fillOpacity: filled ? fillOpacity : 0.0}}
>
  <path
    d="M0 50L50 0L100 50L50 100Z"
  />
</svg>

<style>
  path {
    stroke: var(--color);
    stroke-width: var(--strokeWidth);
    fill: var(--fill);
    fill-opacity: var(--fillOpacity);
  }

  svg.hoverEnabled:hover path {
    fill-opacity: 0.5;
  }
</style>
