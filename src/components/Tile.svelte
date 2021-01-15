<script>
  import { getContext, onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  import { relativePath } from '../utils/path';

  export let d = {};

  const { register, deregister } = getContext('canvas');

  const flyDuration = 1000;
  
  let x = tweened(0, {
    duration: flyDuration,
    easing: cubicOut
  });

  let y = tweened(0, {
    duration: flyDuration,
    easing: cubicOut
  });

  let path;
  let pathX = 0;
  let pathY = 0;

  function draw(ctx) {
    // ctx.beginPath();
    // ctx.arc(0, 0, cluster.r, 0, 2 * Math.PI, true);
    // ctx.clip();
    if (path) {
      ctx.translate($x, $y);
      ctx.beginPath();
      const p = new Path2D(path);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke(p);
      ctx.fillStyle = d.draw ? 'purple' : 'black';
      ctx.fill(p);
    }
  }

  onMount(() => {
    register(draw);

    return () => {
      deregister(draw);
    };
  });
  
  $: cluster = d.cluster || {x: 0, y: 0};

  $: {
    [ path, pathX, pathY ] = relativePath(d.voronoiPath);
  }

  $: x.set(cluster.x + pathX);
  $: y.set(cluster.y + pathY);
</script>
