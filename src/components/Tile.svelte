<script>
  import { getContext, onMount, onDestroy, afterUpdate } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { interpolate as flubberInterpolate } from 'flubber';
  import { interpolateHcl, scaleLinear } from 'd3';

  import { relativePath } from '../utils/path';

  export let d = {};
  export let startX = 0;
  export let startY = 0;
  export let startFillColor = '#000000';
  export let fillBackgroundColor = '#FFFFFF';
  export let selectionColor = 'red';
  export let startOpacity = 0.9;
  export let strokeColor = '#FFFFFF'
  export let selected = false;

  const { register, deregister, invalidate } = getContext('canvas');

  const flyDuration = 400 * Math.random() + 800;

  const opacityScale = scaleLinear()
    .domain([1, 0])
    .range([0.3, 1]);
  
  let x = tweened(startX, {
    duration: flyDuration,
    easing: cubicOut
  });

  let y = tweened(startY, {
    duration: flyDuration,
    easing: cubicOut
  });

  let path = tweened(null, {
    duration: flyDuration,
    easing: cubicOut,
    interpolate: flubberInterpolate
  });

  let pathX = 0;
  let pathY = 0;

  let fillColor = tweened(startFillColor, {
    duration: flyDuration,
    easing: cubicOut,
    interpolate: interpolateHcl
  });

  let opacity = tweened(startOpacity, {
    duration: flyDuration,
    easing: cubicOut
  });

  function draw(ctx) {
    if (!$path) return;
    
    const p = new Path2D($path);

    ctx.globalAlpha = 1.0;
    ctx.translate($x, $y);
    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke(p);
    ctx.fillStyle = fillBackgroundColor;
    ctx.fill(p);
    ctx.globalAlpha = $opacity;
    ctx.fillStyle = d.draw ? (selected ? selectionColor : $fillColor) : 'black';
    ctx.fill(p);
  }

  onMount(() => {
    register(draw);
    invalidate();
    
    return () => {
      deregister(draw);
    };
  });

	afterUpdate(invalidate);
	onDestroy(invalidate);
  
  $: cluster = d.cluster || {x: 0, y: 0};

  $: {
    let tmpPath;
    [ tmpPath, pathX, pathY ] = relativePath(d.voronoiPath);
    path.set(tmpPath);
  }

  $: x.set(cluster.x + pathX);
  $: y.set(cluster.y + pathY);

  $: fillColor.set(d.color);
  $: opacity.set(opacityScale(d.withinClusterIndex / cluster.length));
</script>
