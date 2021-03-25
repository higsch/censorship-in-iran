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

export const intersect = (arr1, arr2) => {
  const intersectArr = arr1.filter((value) => arr2.includes(value));
  if (intersectArr && intersectArr.length > 0) return true;
  return false;
};

export const dateDiffInDays = (ms1, ms2) => {
  return Math.abs((ms1 - ms2) / (1000 * 60 * 60 * 24));
};
