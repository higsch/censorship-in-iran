<script>
    import Footer from './Footer.svelte';

    // shown when the viz cannot be displayed
    export let contentEn = '';
    export let contentFa = '';
  
    function sendMail() {
      const subject = encodeURIComponent('Journalism Is not a Crime');
      const body = encodeURIComponent('I have seen this project on the web:\nhttps://visualization.journalismisnotacrime.com');
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
  </script>
  
  <section class="content catch">
    <p>{contentEn}</p>
    <p>{contentFa}</p>
  </section>
  <div class="placeholder-image">
    <img src="img/rosette_01_t.png" alt="A white rosette." />
  </div>
  <section class="content catch">
    <span class="pseudolink" on:click={sendMail}>Send Email with Link</span>
    <span class="pseudolink" on:click={sendMail}>لینک صفحه را با ایمیل بفرستید</span>
  </section>
  <section class="footer catch">
    <a href="https://journalismisnotacrime.com" target="_blank">journalismisnotacrime.com</a>
  </section>
  
  <style>
    section.catch {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: none;
      padding: 2em;
      overflow: hidden;
    }
  
    p, span {
      width: 100%;
      margin: 1rem 0;
      font-family: var(--font01);
      font-size: 1.1rem;
      color: var(--defaultColor);
      text-align: center;
    }

    span {
        color: var(--yellow);
    }
  
    .placeholder-image {
      width: 100%;
      max-width: 200px;
      margin: 0 auto;
      overflow: hidden;
    }
  
    img {
      width: 100%;
    }

    section.footer {
      flex-direction: row;
      justify-content: center;
    }
  </style>