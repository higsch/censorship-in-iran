const centerPositionOnYAxis = (labels, height, minDim) => {
  const labelHeight = minDim / 100;
  const maxSpacing = labelHeight * 1.5;
  const spacing = Math.min((height - labels.length * labelHeight) / (labels.length + 1), maxSpacing);

  
};

export const generateLabels = (cluster, selectedColorControl, { width, height}, minDim) => {
  if (!selectedColorControl) return [];

  const { data = [] } = cluster;

  const { name } = selectedColorControl;
  const presentValues = [...new Set(data.map((d) => d[name]))];

  const labels = presentValues.map((d) => {
    return {
      value: d
    };
  });

  const positionedLabels = centerPositionOnYAxis(labels, height, minDim);

  return labels;
};
