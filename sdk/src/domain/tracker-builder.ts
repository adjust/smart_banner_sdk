import { Context, UserContext } from '../data/types';

export interface TrackerData {
  template: string;
  context: Context;
}

export function buildSmartBannerUrl(data: TrackerData, url: string, userContext: UserContext | null) {
  const { template, context } = data

  const replacer = (_: string, paramName: keyof Context) => context[paramName] || ''

  return template.replace(/{(\w+)}/, replacer)

  // TODO: use user context to build deeplink
}
