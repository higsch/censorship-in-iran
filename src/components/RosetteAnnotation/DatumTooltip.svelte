<script>
  import { fade } from 'svelte/transition';
  import { t, locale } from '../../stores/i18n';
  import { css } from '../../actions/css';
  import { background, defaultColor } from '../../utils/colors';

  export let tooltip;
  export let parentWidth = 0;
  export let parentHeight = 0;
  export let selectedColor;

  let width = 0;
  let height = 0;
  let color = background;

  const margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  };
  const _url = 'https://journalismisnotacrime.com/media/profile/nasrin_vaziri.jpg.400x400_q85_bw_crop.jpg';

  $: ({ d: datum, pos } = tooltip);

  $: yOffset = Math.min(50, parentHeight / 10);
  $: leftPos = Math.min(parentWidth - width - margin.right, Math.max(margin.left, pos.x - width / 2));
  $: topPos = pos.y + (parentHeight / 2 < pos.y ? -height - yOffset / 2 : yOffset);

  $: if (selectedColor) {
    ({ color } = selectedColor.values.find((d) => d.value === datum[selectedColor.name]));
  }
</script>

<div
  class="province-tooltip"
  use:css={{left: `${leftPos}px`, top: `${topPos}px`, defaultColor, defaultColorTransparent: `${defaultColor}00`, color, background}}
  bind:clientWidth={width}
  bind:clientHeight={height}
  transition:fade={{duration: 200}}
>
  <div
    class="tooltip-content"
  >
    <div
      class="tooltip-title"
    >
      <div class="title-text">
        <h2>
          {datum[`name_${$locale}`]}
        </h2>
        <p>
          {datum.status === 'unknown' ? 'Status unknown' : $t(`groupingvalues.status.${datum.status}`)}
        </p>
      </div>
      <div class="title-image">
        <img src={_url} alt="Profile image of {datum.name_en}" />
      </div>
    </div>
    <div
      class="tooltip-body"
    >
      <div class="tooltip-body-overlay"></div>
      {#if (datum[`intro_${$locale}`])}
        <p>
          {datum[`intro_${$locale}`]}
        </p>
      {/if}
    </div>
    <div
      class="tooltip-footer"
    >
      <p>
        {$t('tooltip.click_to_read_more')}
      </p>
    </div>
  </div>
</div>

<style>
  .province-tooltip {
    position: absolute;
    left: var(--left);
    top: var(--top);
    z-index: 100;
    width: 42%;
    min-width: 120px;
    max-width: 230px;
  }

  .tooltip-content {
    width: 100%;
    height: 100%;
    padding: 0.6em;
    color: var(--background);
    font-family: var(--font);
    background-color: var(--defaultColor);
    border: none;
    border-radius: 0.2em;
  }

  p {
    line-height: 1.5;
  }

  .tooltip-title {
    display: flex;
    justify-content: space-between;
    padding: 0.2em 0;
    border-bottom: 0.17em solid var(--color);
  }

  .title-text {
    display: flex;
    flex-direction: column;
  }

  .title-image {
    margin: 0 0 0 0.2em;
  }

  .title-image img {
    height: 3em;
    border: none;
    border-radius: 0.2em;
  }

  h2 {
    font-size: 1.1em;
    font-weight: 500;
  }

  .tooltip-title p {
    font-size: 0.85em;
  }

  .tooltip-body {
    position: relative;
    max-height: 200px;
    padding: 0.5em 0;
    font-size: 0.85em;
    overflow: hidden;
  }

  .tooltip-body-overlay {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 40;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      var(--defaultColorTransparent) 0px,
      var(--defaultColorTransparent) 160px,
      var(--defaultColor) 200px);   
  }

  .tooltip-footer {
    font-size: 0.7em;
  }
</style>
