<script>
  import { fade } from 'svelte/transition';
  import { tentaclePath } from '../../utils/path';
  import { css } from '../../actions/css';

  export let cluster;
  export let labelDimensions;

  function getPositions(dim, height, offsetLeft) {
    if (!dim) return [];

    const topOffset = (dimensions.height - height) / 2;
    const totalN = dim.reduce((acc, cur) => acc + cur.label.n, 0);

    let cumulativeN = 0;
    const pos = dim.map((d, i) => {
      const { n, color } = d.label;
      const y1 = topOffset + cumulativeN / totalN * height;
      cumulativeN += n;
      const y2 = topOffset + cumulativeN / totalN * height;
      return {
        id: `${cluster.name}-${d.label.name}-${i}`,
        x1: offsetLeft,
        y1,
        x2: offsetLeft,
        y2,
        x3: d.x,
        y3: d.y - d.height / 30,
        x4: d.x,
        y4: d.y + d.height / 30,
        color
      }
    });

    return pos;
  }

  $: dimensions = cluster.paneDimensions;

  $: tentaclePositions = getPositions(labelDimensions, cluster.r / 4, cluster.r * 1.8);
</script>

{#if (labelDimensions && labelDimensions.length)}
  <div
    class="tentacles"
    use:css={{x: `${dimensions.x}px`, y: `${dimensions.y}px`, width: `${dimensions.width}px`, height: `${dimensions.height}px`}}
  >
    <svg
      width={dimensions.width}
      height={dimensions.height}
    >
      {#each tentaclePositions as pos (pos.id)}
        <def>
          <linearGradient id="tentacle-gradient-{cluster.id}-{pos.id}">
            <stop offset="50%" stop-color={pos.color} stop-opacity="1.0" />
            <stop offset="100%" stop-color={pos.color} stop-opacity="0.3" />
          </linearGradient>
        </def>
        <g
          class="tentacle"
          use:css={{color: pos.color}}
          in:fade={{duration: 400, delay: 1000}}
          out:fade={{duration: 0, delay: 0}}
        >
          <path
            d={tentaclePath(pos)}
            fill="url(#tentacle-gradient-{cluster.id}-{pos.id})"
          />
        </g>
      {/each}
    </svg>
  </div>
{/if}

<style>
  .tentacles {
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: var(--width);
    height: var(--height);
  }

  path {
    stroke: none;
  }
</style>
