const xySeparator = ',';

const addOffset = (command, offset) => {
  const [ offsetX, offsetY ] = offset;
  const commandChar = command.substring(0, 1);
  const [ valueX, valueY ] = command.replace(/[A-Z]/, '').split(xySeparator).map((d) => +d);
  let offsetCommand = `${commandChar}`;
  if (valueX && valueY) {
    offsetCommand = `${offsetCommand}${valueX - offsetX}${xySeparator}${valueY - offsetY}`;
  }
  return offsetCommand;
};

export const relativePath = (path) => {
  const moveTo = path.match(/^M-?\d+\.?\d+,\-?\d+\.?\d+/)[0];
  const offset = moveTo.replace(/^M/, '').split(xySeparator).map((d) => +d);
  const splitPath = path.replace(moveTo, '').split(/(?=[A-Z])/);
  const offsetSplitPath = splitPath.map((p) => addOffset(p, offset));
  return [[`M0${xySeparator}0`, ...offsetSplitPath].join(''), ...offset];
};

export const tentaclePath = ({ x1, y1, x2, y2, x3, y3, x4, y4 }) => {
  const c1X = x1 + (x3 - x1) / 2;
  const c1Y = y1;
  const c2X = c1X;
  const c2Y = y3;
  const c3X = x2 + (x4 - x2) / 2;
  const c3Y = y4;
  const c4X = c3X;
  const c4Y = y2;
  return `M${x1} ${y1}C${c1X} ${c1Y} ${c2X} ${c2Y} ${x3} ${y3}L${x4} ${y4}C${c3X} ${c3Y} ${c4X} ${c4Y} ${x2} ${y2}Z`;
};
