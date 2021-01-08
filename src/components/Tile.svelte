<script>
  import { getContext, onMount } from 'svelte';

  export let d = {};

  const { register, deregister } = getContext('canvas');

  onMount(() => {
    register(draw);

    return () => {
      deregister(draw);
    };
  });

  function draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.arc(d.x, d.y, d.r, 0, 2 * Math.PI, true);
    ctx.fill();
  }
</script>
