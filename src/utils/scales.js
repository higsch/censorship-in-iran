import { writable } from 'svelte/store';

import { scaleLinear } from 'd3';

export const createRadiusScale = (maxDim = 0) => {
  return scaleLinear()
    .domain([0, 200])
    .range([0, maxDim]);
};
export const radiusScale = writable(createRadiusScale);
