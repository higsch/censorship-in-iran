<script>
  import { getContext, onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  export let d = {};
  export let cluster = {x: 0, y: 0};

  const { register, deregister } = getContext('canvas');
  
  let x = tweened(0, {
    duration: 100,
    easing: cubicOut
  });

  let y = tweened(0, {
    duration: 100,
    easing: cubicOut
  });

  let r = tweened(0, {
    duration: 100
  });

  function draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.arc($x + cluster.x, $y + cluster.y, $r, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  onMount(() => {
    register(draw);

    return () => {
      deregister(draw);
    };
  });

  $: x.set(d.x);
  $: y.set(d.y);
  $: r.set(d.r);
</script>
