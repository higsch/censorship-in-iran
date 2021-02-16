<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import { css } from '../../actions/css';
  import { background, defaultColor, yellow } from '../../utils/colors';
  import { addLocale, t } from '../../stores/i18n';

  import Icon from 'svelte-awesome';
  import { twitter, square } from 'svelte-awesome/icons';
import Canvas from '../Canvas.svelte';

  export let datum;

  const _url = 'https://journalismisnotacrime.com/media/profile/nasrin_vaziri.jpg.400x400_q85_bw_crop.jpg';
  const dispatch = createEventDispatcher();

  function closeProfile() {
    dispatch('close');
  }

  $: console.log(datum)
</script>

<div
  class="profile"
  use:css={{background, backgroundTransparent: `${background}00`, color: defaultColor, yellow}}
  on:click={closeProfile}
  transition:fade={{duration: 200}}
>
  <div class="profile-content">
    <div class="profile-header">
      <div class="profile-image">
        <img
          src={_url}
          alt="Profile image of {datum.name_en}"
        />
      </div>
      <div class="status">
        {$t(`groupingvalues.status.${datum.status}`)}
      </div>
      <h2 class="name">
        {datum[$addLocale('name')]}
      </h2>
      <ul class="social-media">
        {#if (datum.twitter)}
          <a href="https://twitter.com/{datum.twitter}" target="_blank">
            <li>
              <Icon data={twitter}/>
              <span>{datum.twitter}</span>
            </li>
          </a>
        {/if}
        {#if (datum.blog_link)}
          <a href={datum.blog_link} target="_blank">
            <li>
              <Icon data={square}/>
              <span>Blog</span>
            </li>
          </a>
        {/if}
      </ul>
    </div>
    <div class="profile-body">
      <div class="sidebar"></div>
      <div class="bio">
        {#if (datum[$addLocale('intro')])}
          <p class="intro">
            {datum[$addLocale('intro')]}
          </p>
        {/if}
        {#if (datum[$addLocale('bio')])}
          <p class="main">
            {datum[$addLocale('bio')]}
          </p>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .profile {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 60;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: linear-gradient(var(--backgroundTransparent) 0%, var(--background) 90%);
  }

  .profile-content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 900px;
    max-height: 90%;
    color: var(--color);
    border: none;
    border-radius: 0.2em;
    overflow-y: scroll;
  }

  .profile-header {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-items: center;
    margin: 0.3em 0 1em 0;
  }

  .profile-header > * {
    margin: 0.2em 0;
  }

  .profile-image {
    width: 100%;
    max-width: 200px;
  }

  .profile-image img {
    width: 100%;
    height: 100%;
    border: 0.2em solid var(--color);
    border-radius: 50%;
  }

  h2.name {
    font-size: 1.4em;
    text-align: center;
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style-type: none;
    font-size: 0.95em;
  }

  ul a {
    margin: 0 0.4em;
    color: var(--color);
    text-decoration: none;
    transition: color 0.2s;
  }

  ul a:hover {
    color: var(--yellow);
  }

  ul a li {
    display: flex;
    align-items: center;
  }

  ul a li > * {
    margin: 0 0.2em;
  }

  .profile-body {
    display: flex;
  }

  .sidebar {
    flex: 1;
  }

  .bio {
    flex: 2;
  }

  .bio p {
    font-size: 1em;
    line-height: 1.5;
    white-space: pre-line;
  }

  .bio > * {
    margin: 0.3em 0;
  }
</style>
