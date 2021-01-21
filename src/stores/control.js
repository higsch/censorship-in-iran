import { writable } from 'svelte/store';
import { grouping as color, addHclColors} from '../utils/colors';

const groupingInit = [
  {
    name: 'none',
    color: '#dae2f5'
  },
  {
    name: 'status',
    color: color.shade1
  },
  {
    name: 'gender',
    color: color.shade2
  },
  {
    name: 'occupation',
    color: color.shade3
  },
  {
    name: 'institutioninvestigating',
    color: color.shade4
  }
].map((d, i) => ({...d, selected: d.name === 'institutioninvestigating', values: [], id: i}));

const colorInit = [
  {
    name: 'none',
    color: '#dae2f5'
  },
  {
    name: 'status',
    color: color.shade1
  },
  {
    name: 'gender',
    color: color.shade2
  },
  {
    name: 'occupation',
    color: color.shade3
  },
  {
    name: 'institutioninvestigating',
    color: color.shade4
  }
].map((d, i) => ({...d, selected: d.name === 'gender', values: [], id: i}));

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

export const groupingControl = createControl(groupingInit);
export const colorControl = createControl(colorInit, true);
