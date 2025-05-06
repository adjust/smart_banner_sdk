Object.defineProperty(window.navigator, 'userAgentData', ((value) => ({
  get() { return value; },
  set(v) { value = v; },
  configurable: true,
}))(window.navigator.userAgentData));
