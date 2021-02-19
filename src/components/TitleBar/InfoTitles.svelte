<script>
  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { t } from '../../stores/i18n';
  import { defaultColor, yellow } from '../../utils/colors';
  import { css } from '../../actions/css';
  import titles from '../../inputs/infoTitles';

  export let data = [];
  export let interval = 3000;

  const dispatch = createEventDispatcher();

  let title;

  function createTitle() {
    const selectedTitle = titles[Math.floor(Math.random() * titles.length)];
    const number = data
      .filter((d) => d[selectedTitle.groupName] === selectedTitle.groupValue)
      .filter((d) => d[selectedTitle.colorName] === selectedTitle.colorValue)
      .length;
    
    if (number) {
      title = {
        number,
        text: selectedTitle.text,
        selectGroup: selectedTitle.groupName,
        selectColor: selectedTitle.colorName,
        hoverColor: selectedTitle.colorValue
      };
    }
  }

  function handleClick() {
    dispatch('click', {
      selectGroup: title.selectGroup,
      selectColor: title.selectColor,
      hoverColor: title.hoverColor
    });
  }

  $: if (data.length) createTitle();
</script>

<div
  class="info-titles"
  use:css={{defaultColor, yellow}}
>
  {#if (title)}
    {#key (title.text)}
      <div
        class="info-title"
        on:click={handleClick}
      >
        <h2>
          <span>{title.number}</span>
          <span>{$t(`infotitles.${title.text}`)}</span>
        </h2>
      </div>
    {/key}
  {/if}
</div>

<style>
  .info-titles {
    width: 100%;
    margin: 0.5em 0;
    color: var(--defaultColor);
  }

  .info-title {
    width: 100%;
    cursor: pointer;
  }

  .info-title:hover {
    color: var(--yellow);
  }

  .info-title h2 {
    width: 100%;
    font-size: 1.4em;
    font-weight: 400;
    text-align: center;
  }
</style>
