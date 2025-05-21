// assign to the existing window.ResizeObserver
(window as any).ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

Element.prototype.getBoundingClientRect = function () {
  return {
    width: 800,
    height: 600,
    top: 0,
    left: 0,
    right: 800,
    bottom: 600,
    x: 0,
    y: 0,
    toJSON: () => {},
  };
};
