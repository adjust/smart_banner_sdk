Object.defineProperty(window.navigator, 'maxTouchPoints', ((value) => ({
  get() { return value; },
  set(v) { value = v; },
  configurable: true,
}))(window.navigator.maxTouchPoints));
