import { writable, derived } from 'svelte/store';

const initialLocale = 'en';

export const dict = writable();
export const locale = writable(initialLocale);

// https://stackoverflow.com/questions/38627024/convert-english-numbers-to-persian/47971760
const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const toFarsiNumber = (n) => {
  let tmp = n
    .toString()
    .replace(/\d/g, x => farsiDigits[x])
    .replace(/,/g, '')
    .replace(/\./g, '');
    
  return tmp;
};

const getMessageFromDict = (id, dict, customLocale) => {
  if (!dict || !customLocale) return id;
  const localizedDict = dict[customLocale];

  const splitId = id.split('.');
  const message = splitId.reduce((acc, cur) => acc ? acc[cur] : id, {...localizedDict});

  return message || id;
};

const createMessageFormatter = (dict, locale) => (id, customLocale = locale) => getMessageFromDict(id, dict, customLocale);


export const t = derived([dict, locale], ([$dict, $locale]) => {
  return createMessageFormatter($dict, $locale);
});

export const n = derived(locale, $locale => {
  return (n) => {
    if ($locale === 'fa') {
      return toFarsiNumber(n);
    }
    return n;
  }
});

export const dir = derived([dict, locale], ([$dict, $locale]) => {
  if (!$dict || !$locale) return document.dir;
  const localizedDict = $dict[$locale];
  if (!localizedDict || !localizedDict.$dir) return document.dir;
  document.dir =  localizedDict.$dir;
  return localizedDict.$dir;
});

export const addLocale = derived(locale, ($locale) => attr => `${attr}_${$locale}`);

export const availableLanguages = derived(dict, ($dict) => {
  if (!$dict) return {};
  return Object.keys($dict)
    .map((d) => ({[$dict[d].meta.locale]: $dict[d].meta.name}))
    .reduce((acc, cur) => ({...acc, ...cur}), {});
});
