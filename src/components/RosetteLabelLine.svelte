<script>
  import { getContext, onMount, onDestroy, afterUpdate } from 'svelte';

  import { relativePath } from '../utils/path';

  export let d = {};

  const contextName = 'canvas-rosette-label';
  const { register, deregister, invalidate } = getContext(contextName);

  function draw(ctx) {
    
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
</script>
