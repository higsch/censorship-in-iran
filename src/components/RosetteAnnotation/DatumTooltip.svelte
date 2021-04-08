<script>
  import { fade } from 'svelte/transition';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { t, locale, dir } from '../../stores/i18n';
  import { css } from '../../actions/css';
  import { background, defaultColor } from '../../utils/colors';

  export let tooltip;
  export let parentWidth = 0;
  export let parentHeight = 0;
  export let selectedGroup;
  export let selectedColor;

  let width = 0;
  let height = 0;
  let datum;
  let pos;
  let headerGroup, headerColor;
  let color = background;

  const margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  };
  
  const excludedUrls = [];

  const leftPos = tweened(null, {
    duration: 300,
    easing: cubicOut
  });

  function f(selected) {
    let header = null;
    if (selected && selected.name !== 'none' && datum[selected.name] !== 'unknown') {
      header = {};
      header.main = $t(`groupingvalues.${selected.name}.${datum[selected.name]}`);
      if (selected.name === 'institutioninvestigating') {
        header.prefix = $t(`grouping.${selected.name}_prefix`);
      }
    }
    return header;
  }

  $: {
    ({ d: datum, pos } = tooltip);
    headerGroup = f(selectedGroup);
    headerColor = f(selectedColor);
    ({ color } = selectedColor.values.find((d) => d.value === datum[selectedColor.name]));
  }

  $: yOffset = Math.min(50, parentHeight / 10);
  $: $leftPos = Math.min(parentWidth - width - margin.right, Math.max(margin.left, pos.x - width / 2));
  $: topPos = pos.y + (parentHeight / 2 < pos.y ? -height - yOffset / 2 : yOffset);
</script>

<div
  class="province-tooltip"
  use:css={{left: `${$leftPos}px`, top: `${topPos}px`, defaultColor, defaultColorTransparent: `${defaultColor}00`, color, background}}
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
        {#if (headerGroup)}
          <p>
            {#if (headerGroup.prefix)}
              <span>{headerGroup.prefix}</span>
            {/if}
            <span>{headerGroup.main}</span>
          </p>
        {/if}
        {#if (headerColor && selectedGroup.name !== selectedColor.name)}
          <p>
            {#if (headerColor.prefix)}
              <span>{headerColor.prefix}</span>
            {/if}
            <span>{headerColor.main}</span>
          </p>
        {/if}
      </div>
      {#if (datum.profile_url && !excludedUrls.includes(datum.profile_url))}
        <div class="title-image {$dir}" use:css={{backgroundUrl: `url('${datum.profile_url}')`}}></div>
      {/if}
    </div>
    <div class="separator"></div>
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
    max-width: 330px;
    pointer-events: none;
  }

  .tooltip-content {
    width: 100%;
    height: 100%;
    padding: 0.6em;
    color: var(--background);
    font-family: var(--font02);
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
  }

  .title-text {
    display: flex;
    flex-direction: column;
  }

  .title-image {
    width: 3em;
    height: 3em;
    margin: 0 0 0 0.5em;
    background-image: var(--backgroundUrl);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50% ;
    border: none;
    border-radius: 3px;
  }

  .title-image.rtl {
    margin: 0 0.5em 0 0;
  }

  h2 {
    font-size: 1.1em;
    font-weight: 500;
  }

  .tooltip-title p {
    font-size: 0.8em;
  }

  .separator {
    width: 100%;
    height: 2px;
    background-color: var(--color);
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
