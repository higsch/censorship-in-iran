import { writable, derived } from 'svelte/store'; 

export const hoveredDatum = writable(null);
export const selectedDatum = writable(null);

export const hoveredLabel = writable(null);

export const hoveredClusterId = derived([hoveredDatum, hoveredLabel], ([$hoveredDatum, $hoveredLabel]) => {
  if ($hoveredDatum) return $hoveredDatum.clusterId;
  if ($hoveredLabel) return $hoveredLabel.clusterId;
  return null;
});
