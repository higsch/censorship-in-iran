<script>
  import { arc as d3arc } from 'd3';
  import { css } from '../../actions/css';
  import { t } from '../../stores/i18n';

  export let cluster;
  export let groupControlName = 'none';
  export let textColor = '#FFFFFF';

  const arc = d3arc()
    .startAngle((d) => d.startAngle)
    .endAngle((d) => d.endAngle)
    .innerRadius((d) => d.innerRadius)
    .outerRadius((d) => d.outerRadius);

  $: radiusAddition = cluster.data[0].r * 5;

  $: textArc = arc({
      startAngle: -Math.PI / 2,
      endAngle: Math.PI / 2,
      innerRadius: cluster.maxDiameter / 2 + radiusAddition * 0.1,
      outerRadius: cluster.maxDiameter / 2 + radiusAddition * 0.1
    });

  $: lineArc = arc({
    startAngle: -Math.PI / 6,
    endAngle: Math.PI / 6,
    innerRadius: cluster.maxDiameter / 2 + radiusAddition * 0.2,
    outerRadius: cluster.maxDiameter / 2 + radiusAddition * 0.2
  });

  $: dimensions = {
    x: cluster.xAbsolute - cluster.maxDiameter / 2 - radiusAddition + cluster.data[0].r * 2,
    y: cluster.yAbsolute - cluster.maxDiameter / 2 - radiusAddition,
    width: cluster.maxDiameter + radiusAddition,
    height: cluster.maxDiameter + radiusAddition
  };
</script>

<div
  class="rosette-title"
  use:css={{left: `${dimensions.x}px`,
            top: `${dimensions.y}px`,
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            textColor}}
>
  <svg
    width={dimensions.width}
    height={dimensions.height}
  >
    <g transform="translate({dimensions.width / 2} {dimensions.height / 2 + cluster.maxDiameter / 2 - cluster.r})">
      <!-- <path
        class="line-arc-path"
        d={lineArc}
      /> -->
      <path
        class="text-arc-path"
        id="cluster-title-path-{cluster.id}"
        d={textArc}
      />
      <text
        class="text-background"
      >
        <textPath
          xlink:href="#cluster-title-path-{cluster.id}"
          startOffset="25%"
        >
          {$t(`groupingvalues.${groupControlName}.${cluster.name}`)}
        </textPath>
      </text>
      <text>
        <textPath
          xlink:href="#cluster-title-path-{cluster.id}"
          startOffset="25%"
        >
          {$t(`groupingvalues.${groupControlName}.${cluster.name}`)}
        </textPath>
      </text>
    </g>
  </svg>
</div>

<style>
  .rosette-title {
    position: absolute;
    left: var(--left);
    top: var(--top);
    z-index: 15;
    width: var(--width);
    height: var(--height);
    overflow: hidden;
    /* border: 1px solid red; */
  }

  .line-arc-path {
    stroke: var(--textColor);
    stroke-width: 1;
    fill: none;
  }

  .text-arc-path {
    stroke: none;
    fill: none;
  }

  text {
    fill: var(--textColor);
    font-family: var(--font);
    font-size: 0.9rem;
    text-anchor: middle;
  }

  text.text-background {
    stroke: var(--backgroundColor);
    stroke-width: 15;
    fill: var(--backgroundColor);
  }
</style>
