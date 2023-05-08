import { setImmediate } from 'timers'

export const Utils = {
  flushPromises: () => {
    return new Promise(resolve => setImmediate(resolve))
  },

  setGlobalProp: (o: any, prop: PropertyKey) => {
    Object.defineProperty(o, prop, {
      configurable: true,
      get() { return undefined },
      set(v) { v }
    })
  }
};

// @ts-ignore
global.Utils = Utils;
