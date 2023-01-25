import { setImmediate } from 'timers'

export const Utils = {
  flushPromises: () => {
    return new Promise(resolve => setImmediate(resolve))
  },
};

// @ts-ignore
global.Utils = Utils;
