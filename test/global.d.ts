// Add data types to window.navigator ambiently for implicit use in the entire project. See https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-reference-types- for more info.
/// <reference types="user-agent-data-types" />

export declare global {
  declare namespace globalThis {
    var Utils: function; // eslint-disable-line no-var
  }
}
