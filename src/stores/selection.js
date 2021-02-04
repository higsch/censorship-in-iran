import { writable } from 'svelte/store'; 

const createDatumSelector = () => {
  const { set, subscribe } = writable(null);

  return {
    set,
    subscribe
  };
};

export const hoveredDatum = createDatumSelector();
export const selectedDatum = createDatumSelector();

export const hoveredLabel = writable(null);
