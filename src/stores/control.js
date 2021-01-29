import { writable } from 'svelte/store';
import { grouping as color, addHclColors} from '../utils/colors';

const groupingInit = [
  {
    name: 'none'
  },
  {
    name: 'status'
  },
  {
    name: 'gender'
  },
  {
    name: 'occupation'
  },
  {
    name: 'institutioninvestigating'
  },
  // {
  //   name: 'province'
  // },
  {
    name: 'ethnicgroup'
  },
  {
    name: 'religoiusgroup'
  }
].map((d, i) => ({...d, selected: d.name === 'occupation', values: [], id: i}));

const colorInit = [
  {
    name: 'none',
  },
  {
    name: 'status',
  },
  {
    name: 'gender',
  },
  {
    name: 'occupation',
  },
  {
    name: 'institutioninvestigating',
  },
  // {
  //   name: 'province'
  // },
  {
    name: 'ethnicgroup'
  },
  {
    name: 'religoiusgroup'
  }
].map((d, i) => ({...d, selected: d.name === 'status', values: [], id: i}));

const createControl = (initData, initColorPalette = false) => {
  const { set, update, subscribe } = writable(initData);

  const init = (data) => {
    let controlWithValues = initData.map((c) => {
      const values = data.map((d) => d[c.name]).flat();
      return {
        ...c,
        values: [...new Set(values)].map((value) => ({value}))
      };
    });
    
    // also init the color palette, if needed
    if (initColorPalette) {
      controlWithValues = addHclColors(controlWithValues);
    }

    set(controlWithValues);
  };

  const reset = () => update((d) => ({...d, selected: false}));

  const select = (name) => {
    update((s) => s.map((d) => {
      return {
        ...d,
        selected: d.name === name
      };
    }));
  };

  return {
    init,
    reset,
    select,
    subscribe
  };
};

export const groupControl = createControl(groupingInit);
export const colorControl = createControl(colorInit, true);
