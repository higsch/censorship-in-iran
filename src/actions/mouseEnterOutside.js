export function mouseEnterOutside(node) {

  const handleMouseEnter = (event) => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('mouseenter_outside', node));
    }
  };

  document.addEventListener('mouseenter', handleMouseEnter, true);

  return {
    destroy() {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
    },
  };
}
