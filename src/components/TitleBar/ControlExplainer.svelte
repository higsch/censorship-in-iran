<script>
  import { defaultColor, yellow } from '../../utils/colors';
  import { css } from '../../actions/css';
  import { t } from '../../stores/i18n';

  import Diamond from '../Diamond.svelte';
</script>

<div
  class="control-explainer"
  use:css={{defaultColor}}
>
  <p class="grouping">{$t('intro.controlexplainer.square')}<span class="turned"><Diamond color={defaultColor} hoverEnabled={false} /></span>.</p><p>{$t('intro.controlexplainer.diamond')}<span><Diamond color={yellow} hoverEnabled={false} /></span>.</p>
</div>

<style>
  .control-explainer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--defaultColor);
    opacity: 0.9;
  }

  p {
    margin: 0 0.2em;
    font-size: 1em;
    font-weight: 300;
    text-align: center;
  }

  p span {
    display: inline-block;
    width: 1.4em;
    height: 1.4em;
    margin: 0 0.1em;
    transform: translateY(0.3em);
  }

  .turned {
    transform: rotate(45deg) translateX(0.2em) translateY(0.3em);
  }
</style>
