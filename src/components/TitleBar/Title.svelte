<script>
  import { defaultColor } from '../../utils/colors';
  import { css } from '../../actions/css';
  import { t, dir } from '../../stores/i18n';
</script>

<div
  class="title"
  use:css={{defaultColor}}
>
  <img src="img/rosette_01_t.png" alt="White rosette" />
  <div class="title-text">
    <h1 class={$dir}>{$t('title.heading')}</h1>
    <h2>{$t('title.subheading')}</h2>
  </div>
</div>

<style>
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 1em 0;
    color: var(--defaultColor);
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
    font-size: 3em;
    font-weight: 500;
    /* text-shadow: 0px 0px 3px var(--defaultColor); */
  }

  h1.rtl {
    text-align: right;
  }

  h2 {
    width: 100%;
    font-family: var(--font02);
    font-size: 1em;
    font-weight: 300;
    opacity: 0.8;
  }
</style>
