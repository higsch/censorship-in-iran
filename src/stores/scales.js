import { writable } from 'svelte/store';
import { scaleLinear } from 'd3';

export const createRadiusScale = (maxDim = 0) => {
  return scaleLinear()
    .domain([0, 370])
    .range([maxDim / 1000, maxDim]);
};
export const radiusScale = writable(createRadiusScale);
