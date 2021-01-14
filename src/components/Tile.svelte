<script>
  import { getContext, onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  export let d = {};
  $: cluster = d.cluster || {x: 0, y: 0};

  const { register, deregister } = getContext('canvas');

  const duration = 2000;
  
  let x = tweened(0, {
    duration,
    easing: cubicOut
  });

  let y = tweened(0, {
    duration,
    easing: cubicOut
  });

  let r = tweened(0, {
    duration: 100
  });

  function draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'purple';
    ctx.arc($x, $y, $r, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  onMount(() => {
    register(draw);

    return () => {
      deregister(draw);
    };
  });

  $: x.set(d.x + cluster.x);
  $: y.set(d.y + cluster.y);
  $: r.set(d.r);
</script>
