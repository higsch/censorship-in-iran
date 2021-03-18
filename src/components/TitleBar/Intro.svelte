<script>
  import { defaultColor } from '../../utils/colors';
  import { css } from '../../actions/css';
  import { t } from '../../stores/i18n';
</script>

<div
  class="intro"
  use:css={{defaultColor}}
>
  <h2><img src="img/rosette_01.jpg" alt="White rosette" />{$t('intro.heading')}</h2>
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

  h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-family: var(--font01);
    font-size: 4em;
    font-weight: 500;
    text-align: center;
  }

  h2 img {
    max-height: 1.5em;
    margin: 0 0.2em;
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
