<script>
  import { defaultColor } from '../../utils/colors';
  import { css } from '../../actions/css';
  import { t } from '../../stores/i18n';
</script>

<div
  class="heading"
  use:css={{defaultColor}}
>
  <h2>{$t('titlebar.heading')}</h2>
</div>

<style>
  .heading {
    width: 100%;
    color: var(--defaultColor);
  }

  h2 {
    width: 100%;
    font-family: var(--font01);
    font-size: 4em;
    font-weight: 500;
    text-align: center;
  }
</style>
