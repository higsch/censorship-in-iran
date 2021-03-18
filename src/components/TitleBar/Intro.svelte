<script>
  import { defaultColor } from '../../utils/colors';
  import { css } from '../../actions/css';
  import { t } from '../../stores/i18n';
</script>

<div
  class="intro"
  use:css={{defaultColor}}
>
  <div class="title">
    <img src="img/rosette_01.jpg" alt="White rosette" />
    <div class="title-text">
      <h1>{$t('intro.heading')}</h1>
      <h2>{$t('intro.subheading')}</h2>
    </div>
  </div>
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

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 1em 0;
    font-family: var(--font01);
  }

  .title img {
    height: 7em;
    margin: 0 0.8em;
  }

  .title-text {
    display: flex;
    flex-direction: column;
  }

  h1 {
    width: 100%;
    text-align: left;
    font-size: 4em;
    font-weight: 500;
  }

  h2 {
    width: 100%;
    font-family: var(--font02);
    font-size: 1em;
    font-weight: 300;
    opacity: 0.8;
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
