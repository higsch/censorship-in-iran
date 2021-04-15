import App from './App.svelte';

import { googleAnalytics } from './utils/analytics';
import CookiesEuBanner from '../node_modules/cookies-eu-banner/dist/cookies-eu-banner.min.js';

const app = new App({
  target: document.body
});

new CookiesEuBanner(function () {
  googleAnalytics('UA-63919478-1');
}, true);

export default app;
