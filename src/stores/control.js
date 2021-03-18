import { writable } from 'svelte/store';
import { addHclColors} from '../utils/colors';

const groupingInit = [
  {
    name: 'none'
  },
  {
    name: 'occupation'
  },
  {
    name: 'institutioninvestigating'
  },
  {
    name: 'status'
  },
  // {
  //   name: 'province'
  // },
  {
    name: 'gender'
  },
  {
    name: 'ethnicgroup'
  },
  {
    name: 'religoiusgroup'
  }
].map((d, i) => ({
  ...d,
  selected: d.name === 'status',
  show: d.name !== 'none',
  values: [],
  id: i
}));

const colorInit = [
  {
    name: 'none',
  },
  {
    name: 'occupation',
  },
  {
    name: 'institutioninvestigating',
  },
  {
    name: 'status',
  },
  // {
  //   name: 'province'
  // },
  {
    name: 'gender',
  },
  {
    name: 'ethnicgroup'
  },
  {
    name: 'religoiusgroup'
  }
].map((d, i) => ({
  ...d,
  selected: d.name === 'institutioninvestigating',
  show: d.name !== 'none',
  values: [],
  id: i
}));

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

  const select = (name, force = false) => {
    update((s) => {
      let tmpName = 'none';
      const { name: currentName } = s.find((d) => d.selected) || {};
      if (force || currentName !== name) tmpName = name;
      return s.map((d) => {
        return {
          ...d,
          selected: d.name === tmpName
        };
      });
    });
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
