<script>
  import { createEventDispatcher } from 'svelte';
  import { timeFormat } from 'd3';
  import { fade } from 'svelte/transition';
  import { css } from '../../actions/css';
  import { background, defaultColor, yellow } from '../../utils/colors';
  import { addLocale, t } from '../../stores/i18n';

  import Icon from 'svelte-awesome';
  import { twitter, square } from 'svelte-awesome/icons';

  export let datum;

  const _url = 'https://journalismisnotacrime.com/media/profile/nasrin_vaziri.jpg.400x400_q85_bw_crop.jpg';
  const dispatch = createEventDispatcher();
  const formatDate = timeFormat('%d %B %Y');

  function closeProfile() {
    dispatch('close');
  }
</script>

<div
  class="profile"
  use:css={{background, backgroundTransparent: `${background}00`, color: defaultColor, yellow}}
  on:click={closeProfile}
  transition:fade={{duration: 200}}
>
  <div class="profile-content-overlay"></div>
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
        <span>{datum[$addLocale('name')]}</span>
        {#if (datum.occupation)}
          <span class="occupation">
            ({$t(`groupingvalues.occupation.${datum.occupation}`)})
          </span>
        {/if}
      </h2>
      <ul class="social-media">
        {#if (datum.twitter)}
          <a  
            href="https://twitter.com/{datum.twitter}"
            target="_blank"
            on:click|stopPropagation
          >
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
      <ul
        class="sidebar"
        class:center={!datum[$addLocale('intro')] && !datum[$addLocale('bio')]}  
      >
        {#if (datum[$addLocale('career')] && datum[$addLocale('career')].toLowerCase() !== datum.occupation.toLowerCase())}
          <li class="career">
            <h3>{$t('other.career')}</h3>
            <p>{datum[$addLocale('career')]}</p>
          </li>
        {/if}
        {#if (datum[$addLocale('sentence')])}
          <li class="sentence">
            <h3>{$t('other.sentence')}</h3>
            <p>{datum[$addLocale('sentence')]}</p>
          </li>
        {/if}
        {#if (datum.institutioninvestigating)}
          <li class="institutioninvestigating">
            <h3>{$t('grouping.institutioninvestigating')}</h3>
            <p>{$t(`groupingvalues.institutioninvestigating.${datum.institutioninvestigating}`)}</p>
          </li>
        {/if}
        {#if (datum[$addLocale('oranisation_name')])}
          <li class="organisation">
            <h3>{$t('other.organisation')}</h3>
            <p>{datum[$addLocale('oranisation_name')]}</p>
          </li>
        {/if}
        {#if (datum.province)}
          <li class="province">
            <h3>{$t('grouping.province')}</h3>
            <p>{$t(`groupingvalues.province.${datum.province}`)}</p>
          </li>
        {/if}
        {#if (datum.ethnicgroup)}
          <li class="ethnicgroup">
            <h3>{$t('grouping.ethnicgroup')}</h3>
            <p>{$t(`groupingvalues.ethnicgroup.${datum.ethnicgroup}`)}</p>
          </li>
        {/if}
        {#if (datum.religoiusgroup)}
          <li class="religiousgroup">
            <h3>{$t('grouping.religoiusgroup')}</h3>
            <p>{$t(`groupingvalues.religoiusgroup.${datum.religoiusgroup}`)}</p>
          </li>
        {/if}
      </ul>
      {#if (datum[$addLocale('intro')] && datum[$addLocale('bio')])}
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
      {/if}
    </div>
    <div class="profile-footer">
      {#if (datum.last_updated)}
        <p>Last updated: {formatDate(datum.last_updated)}</p>
      {:else if (datum.modified_date)}
        <p>Last modified: {formatDate(datum.modified_date)}</p>
      {/if}
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

  .profile-content-overlay {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 70;
    width: 100%;
    height: 100%;
    background: linear-gradient(var(--backgroundTransparent) 0%, var(--backgroundTransparent) 80%, var(--background) 90%);
    pointer-events: none;
  }

  .profile-content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 820px;
    height: 90%;
    max-height: 90%;
    padding: 2em 0 0 0;
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

  .profile-header .status {
    margin: 0.6em 0 0.2em 0;
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
    display: flex;
    flex-direction: column;
    font-size: 1.4em;
    text-align: center;
  }

  h2.name .occupation {
    margin: 0.2em 0 0 0;
    font-size: 0.6em;
    font-weight: 300;
  }

  ul {
    list-style-type: none;
  }

  ul.social-media {
    display: flex;
    align-items: center;
    justify-content: center;
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

  ul.social-media a li {
    display: flex;
    align-items: center;
  }

  ul.social-media a li > * {
    margin: 0 0.2em;
  }

  .profile-body {
    flex-shrink: 0;
    display: flex;
    /* width: 100%; */
    font-weight: 300;
  }

  .profile-body > * {
    margin: 0 1em;
  }

  ul.sidebar {
    flex: 1;
    display: flex;
    flex-direction: column;
    opacity: 0.7;
  }

  ul.sidebar.center {
    text-align: left;
    justify-content: center;
  }

  ul.sidebar li {
    margin: 0.6em 0;
  }

  ul.sidebar h3 {
    margin: 0 0 0.2em 0;
    font-size: 0.9em;
    font-weight: 500;
  }

  ul.sidebar p {
    font-size: 0.85em;
    line-height: 1.5;
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
    margin: 0.25em 0;
  }

  .intro {
    margin-bottom: 1.6em;
  }

  .profile-footer {
    width: 100%;
    min-height: 30%;
    padding: 2em 2em;
    text-align: right;
    opacity: 0.7;
  }

  .profile-footer p {
    font-size: 0.8em;
    font-weight: 300;
  }
</style>
