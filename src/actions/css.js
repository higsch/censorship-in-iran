
const setCssVariables = (node, variables) => {
  for (const name in variables) {
    node.style.setProperty(`--${name}`, variables[name]);
  }
};

export const css = (node, variables) => {
  setCssVariables(node, variables);
  
  return {
    update(variables) {
      setCssVariables(node, variables);
    }
  };
};
