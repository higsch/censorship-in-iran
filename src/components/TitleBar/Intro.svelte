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
    <p>{$t('intro.text2')} <a href=mailto:{$t('intro.mail')}>{$t('intro.mail')}</a>.</p>
  </div>
</div>

<style>
  .intro {
    width: 100%;
    margin: 0 0 1em 0;
    color: var(--defaultColor);
    pointer-events: all;
  }

  .intro-text {
    display: flex;
    font-size: 0.9em;
    line-height: 1.5;
    /* text-align: justify; */
    opacity: 0.8;
  }

  .intro-text p {
    flex: 1;
    margin: 1em;
  }
</style>
