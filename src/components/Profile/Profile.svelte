<script>
  import { createEventDispatcher } from 'svelte';
  import { css } from '../../actions/css';
  import { background } from '../../utils/colors';

  export let datum;

  const _url = 'https://journalismisnotacrime.com/media/profile/nasrin_vaziri.jpg.400x400_q85_bw_crop.jpg';
  const dispatch = createEventDispatcher();

  function closeProfile() {
    dispatch('close');
  }
</script>

<div
  class="profile"
  use:css={{background}}
  on:click={closeProfile}
>
  <div class="profile-content">


  </div>
</div>

<style>
  .profile {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 60;
    width: 100%;
    height: 100%;
  }

  .profile-content {
    position: relative;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    background: var(--background);
    border: none;
    border-radius: 0.2em;
  }
</style>
