import {
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceCollide } from 'd3-force';

export const createSimulation = (nodes, ticked, ended) => {
  return forceSimulation()
    .nodes(nodes)
    .force('charge', forceManyBody().strength(5))
    .force('center', forceCenter(0, 0))
    .force('collision', forceCollide().radius(function(d) { return d.r; }))
    .on('tick', ticked)
    .on('end', ended)
    .tick(500);
};
