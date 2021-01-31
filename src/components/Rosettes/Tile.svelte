<script>
  import { getContext, onMount, onDestroy, afterUpdate } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { interpolate as flubberInterpolate } from 'flubber';
  import { interpolateHcl, scaleLinear } from 'd3';

  import { relativePath } from '../../utils/path';

  export let d = {};
  export let startX = 0;
  export let startY = 0;
  export let startFillColor = '#000000';
  export let fillBackgroundColor = '#FFFFFF';
  export let selectionColor = 'red';
  export let startOpacity = 0.9;
  export let strokeColor = '#FFFFFF'
  export let selected = false;
  export let anyHovered = false;
  export let hovered = false;

  const { register, deregister, invalidate } = getContext('canvas');
  const flyDuration = 400 * Math.random() + 800;
  const opacityFactor = Math.min(1.0, Math.max(Math.random(), 0.5));

  const opacityScale = scaleLinear()
    .domain([1, 0])
    .range([0.3, 0.9]);
  
  let pathX = 0;
  let pathY = 0;
  
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
    ctx.fillStyle = fillBackgroundColor;
    ctx.fill(p);
    ctx.globalAlpha = 0.9;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1;
    ctx.stroke(p);
    ctx.globalAlpha = $opacity;
    ctx.fillStyle = $fillColor;
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

  $: path.set(d.path)
  $: x.set(d.x);
  $: y.set(d.y);

  $: fillColor.set(d.color);
  $: {
      let o = opacityScale(opacityFactor * d.withinClusterIndex / d.cluster.length);
      if (selected || hovered) {
        o = 1.0;
      }
      if (anyHovered && !hovered) {
        o = 0.2;
      }
      opacity.set(o);
    }
</script>
