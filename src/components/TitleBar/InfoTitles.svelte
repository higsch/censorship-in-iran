<script>
  import { createEventDispatcher } from 'svelte';
  import { t } from '../../stores/i18n';
  import { defaultColor, yellow } from '../../utils/colors';
  import { css } from '../../actions/css';
  import titles from '../../inputs/infoTitles';

  export let data = [];

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
        <h3>
          <span>{$t('intro.infotitles.explore')}</span>
          <span class="number">{title.number}</span>
          <span>{$t(`intro.infotitles.${title.text}`)}</span>
        </h3>
      </div>
    {/key}
  {/if}
</div>

<style>
  .info-titles {
    width: 100%;
    margin: 0.5em 0;
    color: var(--defaultColor);
    opacity: 0.9;
  }

  .info-title {
    width: 100%;
    cursor: pointer;
    transition: color 0.2s;
    pointer-events: all;
  }

  .info-title:hover {
    color: var(--yellow);
  }

  .info-title h3 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 1em;
    font-weight: 300;
    text-align: center;
  }

  .info-title h3 span {
    margin: 0 0.2em;
  }

  .info-title h3 span.number {
    color: var(--yellow);
  }
</style>
