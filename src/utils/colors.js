import { hcl } from 'd3';

// export const background = '#242B2E';
export const background = '#003247';
export const defaultColor = '#DAE2F5';
export const white = '#FFFFFF';
export const yellow = '#FAB243';

const gender = {
  female: '#55efc4',
  male: '#fdcb6e',
  unknown: '#EEEEEE'
};

export const addHclColorsDistinct = (data) => {
  const totalColorNumbers = data.reduce((acc, cur) => acc + cur.values.length, 0);
  let i = 0;
  const coloredData = data.map((d) => {
    const coloredValues = d.values.map((v) => {
      const color = hcl(Math.floor(i / totalColorNumbers * 360), 50, 80);
      i++;
      return {
        ...v,
        color: color.formatHex()
      };
    });
    return {
      ...d,
      values: coloredValues
    };
  });

  return coloredData;
};

export const addHclColors = (data, defaultColor = '#a9bbe8') => {
  const coloredData = data.map((d) => {
    const coloredValues = d.values.map((v, i, arr) => {
      let color = defaultColor;
      if (d.name === 'gender') {
        const { value } = v;
        color = gender[value];
      } else if (d.name === 'none') {
        color = defaultColor;
      } else {
        const hclColor = hcl(Math.floor(i / arr.length * 360), 60, 80);
        color = hclColor.formatHex();
      }
      return {
        ...v,
        color
      };
    });
    return {
      ...d,
      values: coloredValues
    };
  });

  return coloredData;
};

export const getControlColor = (data, control, defaultColor = '#FFFFFF') => {
  if (!control) return defaultColor;
  const { name, values } = control;
  const { color = defaultColor } = values.find((v) => v.value === data[name]) || {};
  return color;
};
