export const getMinDim = (dim1, dim2) => Math.min(dim1, dim2);

export const summitSort = (clusters) => {
  let result = Array.from({length: clusters.length});
  let index = Math.floor((result.length - 1) / 2);
  if (index < 0) return clusters;

  let sign = true;
  let i = 1;
  clusters.forEach((cluster) => {
    result[index] = cluster;
    index = sign ? index + i : index - i;
    sign = !sign;
    i++;
  });

  return result;
};
