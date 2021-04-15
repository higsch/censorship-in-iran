<script>
  // the cookie banner
</script>

<div id="cookies-eu-banner">
  <div class="content">
    <p>This page wants to use cookies.</p>
    <button id="cookies-eu-accept">Accept</button>
    <button id="cookies-eu-reject">Reject</button>
    <a href="https://journalismisnotacrime.com/en/page/privacy/" target="_blank">Privacy Policy</a>
    <a href="https://journalismisnotacrime.com/en/page/cookies/" target="_blank">Cookies Policy</a>
  </div>
</div>

<style>
  #cookies-eu-banner {
    position: fixed;
    z-index: 1000000;
    left: 0;
    bottom: 0;
    display: none;
    width: 100%;
    min-height: 5vh;
    padding: 1em;
    color: var(--defaultColor);
    font-family: var(--font01);
    font-size: 1em;
    opacity: 0.95;
    background-color: var(--backgroundColor);
    border-top: 2px solid var(--defaultColor);
  }

  .content {
    display: flex;
    align-items: baseline;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .content > p, button {
    margin-right: 1em;
  }

  button {
    cursor: pointer;
  }

  #cookies-eu-banner button {
    padding: 0.1em 0.3em;
    font-size: 1em;
    font-weight: normal;
    text-decoration: none;
    border: 1px solid var(--backgroundColor);
    border-radius: 3px;
    outline: none;
    position: relative;
  }

  button#cookies-eu-accept {
    color: var(--backgroundColor);
    background-color: var(--defaultColor);
  }

  button#cookies-eu-reject {
    color: var(--defaultColor);
    background-color: var(--backgroundColor);
  }

  a {
    display: block;
    justify-self: flex-end;
    margin: 0 0.3em;
    font-size: 0.7em;
    font-weight: 200;
    color: var(--yellow);
    opacity: 0.6;
  }
</style>