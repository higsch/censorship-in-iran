<script>
  import { getContext, onMount } from 'svelte';
  import { tweened } from 'svelte/motion';

  export let d = {};

  const { register, deregister } = getContext('canvas');
  
  let x = tweened(0, {
    duration: 1000
  });
  let y = tweened(0, {
    duration: 1000
  });
  let r = tweened(0, {
    duration: 1000
  });

  onMount(() => {
    register(draw);

    return () => {
      deregister(draw);
    };
  });

  function draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.arc($x, $y, $r, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  $: x.set(d.x);
  $: y.set(d.y);
  $: r.set(d.r);
</script>
