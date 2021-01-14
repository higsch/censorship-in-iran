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

const getMessageFromLocalizedDict = (id, localizedDict) => {
  if (!localizedDict) return '';

  const splitId = id.split('.');
  
  let message = {...localizedDict};
  splitId.forEach((partialId) => {
    message = message[partialId];
  });

  return message;
};

const createMessageFormatter = (localizedDict) => (id) => getMessageFromLocalizedDict(id, localizedDict);

const localizedDict = derived([dict, locale], ([$dict, $locale]) => {
  if (!$dict || !$locale) return;
  return $dict[$locale];
});

export const t = derived(localizedDict, ($localizedDict) => {
  return createMessageFormatter($localizedDict);
});

export const n = derived(locale, $locale => {
  return (n) => {
    if ($locale === 'fa') {
      return toFarsiNumber(n);
    }
    return n;
  }
});

export const dir = derived(localizedDict, ($localizedDict) => {
  if (!$localizedDict) return document.dir;
  return $localizedDict.$dir;
});
