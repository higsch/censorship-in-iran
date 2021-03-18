<script>
  import { defaultColor } from '../utils/colors';
  import { css } from '../actions/css';
</script>

<footer
  use:css={{defaultColor}}
>
  <p>{(new Date()).getFullYear()}</p>
  <p>|</p>
  <a href="https://journalismisnotacrime.com" target="_blank">journalismisnotacrime.com</a>
</footer>

<style>
  footer {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 50;
    display: flex;
    justify-content: center;
    width: 100%;
    max-height: 30px;
    padding-bottom: 0.3em;
    color: var(--defaultColor);
    font-family: var(--font02);
    font-size: 0.7em;
    opacity: 0.7;
  }

  footer > * {
    margin: 0 0.3em;
  }
</style>
