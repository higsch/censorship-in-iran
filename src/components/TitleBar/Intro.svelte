<script>
  import { defaultColor } from '../../utils/colors';
  import { css } from '../../actions/css';
  import { t } from '../../stores/i18n';
</script>

<div
  class="intro"
  use:css={{defaultColor}}
>
  <div class="intro-text">
    <p>{$t('intro.text1')}</p>
    <p>{@html $t('intro.text2')}</p>
  </div>
</div>

<style>
  .intro {
    width: 100%;
    margin: 0 0 1em 0;
    color: var(--defaultColor);
  }

  .intro-text {
    display: flex;
    font-size: 0.8em;
    line-height: 1.5;
    /* text-align: justify; */
    opacity: 0.7;
  }

  .intro-text p {
    flex: 1;
    margin: 1em;
  }
</style>
