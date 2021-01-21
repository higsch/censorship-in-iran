<script>
  import { getContext, onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { interpolate as flubberInterpolate } from 'flubber';
  import { interpolateHcl } from 'd3';
  import { scaleLinear } from 'd3';

  import { relativePath } from '../utils/path';

  export let d = {};
  export let startX = 0;
  export let startY = 0;
  export let startFillColor = '#000000';
  export let selectionColor = 'red';
  export let startOpacity = 0.9;
  export let strokeColor = '#FFFFFF'
  export let selected = false;

  const { register, deregister } = getContext('canvas');

  const flyDuration = 400 * Math.random() + 800;

  const opacityScale = scaleLinear()
    .domain([1, 0])
    .range([0.5, 1]);

  const image = new Image();
  
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

    ctx.globalAlpha = $opacity;
    ctx.translate($x, $y);
    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke(p);
    ctx.fillStyle = d.draw ? (selected ? selectionColor : $fillColor) : 'black';
    ctx.fill(p);
    // ctx.clip();
  }

  onMount(() => {
    register(draw);

    // if (d.username === 'yavarsoltani') {
    //   console.log(d)
    //   image.src = d.imgUrl;
    // }
    
    return () => {
      deregister(draw);
    };
  });
  
  $: cluster = d.cluster || {x: 0, y: 0};

  $: {
    let tmpPath;
    [ tmpPath, pathX, pathY ] = relativePath(d.voronoiPath);
    path.set(tmpPath);
  }

  $: x.set(cluster.x + pathX);
  $: y.set(cluster.y + pathY);

  $: fillColor.set(cluster.color);
  $: opacity.set(opacityScale(d.withinClusterIndex / cluster.length));
</script>
