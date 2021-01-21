import { writable } from 'svelte/store';
import { grouping as color} from '../utils/colors';

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
].map((d, i) => ({...d, selected: d.name === 'status', values: [], id: i}));

const createGroupingControl = () => {
  const { set, update, subscribe } = writable(groupingInit);

  const init = (data) => {
    const groupingWithValues = groupingInit.map((g) => {
      const values = data.map((d) => d[g.name]).flat();
      return {
        ...g,
        values: [...new Set(values)]
      };
    });
    set(groupingWithValues);
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

export const grouping = createGroupingControl();
