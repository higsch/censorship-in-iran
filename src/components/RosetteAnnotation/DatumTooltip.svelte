<script>
  import { t } from '../../stores/i18n';
  import { css } from '../../actions/css';

  export let tooltip;
  export let parentWidth = 0;
  export let parentHeight = 0;

  let width = 0;
  let height = 0;

  const margin = {
    top: 2,
    right: 2,
    bottom: 2,
    left: 2
  };

  const yOffset = 15;

  $: leftPos = Math.min(parentWidth - width - margin.right, Math.max(margin.left, tooltip.pos.x - width / 2));
  $: topPos = tooltip.pos.y + (parentHeight / 2 < tooltip.pos.y ? -height - yOffset / 2 : yOffset);
</script>

<div
  class="province-tooltip"
  use:css={{left: `${leftPos}px`, top: `${topPos}px`, maxWidth: `${parentWidth - margin.left - margin.right}px`}}
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  <div
    class="tooltip-content"
  >
    <div
      class="tooltip-title"
    >
  
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
    max-width: var(--maxWidth);
    background-color: #FFFFFF;
    box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.07), 
                0 4px 8px rgba(0,0,0,0.07);
  }
  .tooltip-content {
    width: 100%;
    height: 100%;
    padding: 0.4em;
    color: #333333;
  }

  .tooltip-title {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    border-bottom: 0.15em solid #333333;
  }
</style>
