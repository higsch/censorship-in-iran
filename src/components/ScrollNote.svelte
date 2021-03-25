<script>
  import { fade } from 'svelte/transition';
  import { defaultColor, background } from '../utils/colors';
  import { css } from '../actions/css';

  let scrollY;
</script>

<svelte:window bind:scrollY={scrollY}/>

{#if (!scrollY || scrollY < 20)}
  <div
    class="scroll-note"
    use:css={{defaultColor, background}}
    transition:fade={{duration: 200}}
  >
    <div class="scroll-note-content">
      <span>v</span>
    </div>
  </div>
{/if}

<style>
  .scroll-note {
    position: fixed;
    left: 50%;
    bottom: 1em;
    z-index: 130;
  }

  .scroll-note-content {
    position: relative;
    left: -50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2em;
    height: 2em;
    background-color: var(--defaultColor);
    border: 2px solid var(--background);
    border-radius: 50%;
    animation: highlight 4s ease-in-out infinite;
  }

  @keyframes highlight {
    0%, 100% {
      opacity: 1.0;
    }

    50% {
      opacity: 0.3;
    }
  }
</style>
