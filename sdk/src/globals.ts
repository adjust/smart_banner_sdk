// Add data types to window.navigator ambiently for implicit use in the entire project. See https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-reference-types- for more info.
/// <reference types="user-agent-data-types" />

declare let __ADJUST_SB__NAMESPACE: string;
declare let __ADJUST_SB__SDK_VERSION: string;
declare let _DEV_MODE_: boolean;
declare let _DEV_ENDPOINT_: string;

export const Globals = {
  'version': __ADJUST_SB__SDK_VERSION,
  'namespace': __ADJUST_SB__NAMESPACE,
  dataVersion: 'v1',
  _DEV_MODE_,
  _DEV_ENDPOINT_
};
