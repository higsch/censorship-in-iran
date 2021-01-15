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
