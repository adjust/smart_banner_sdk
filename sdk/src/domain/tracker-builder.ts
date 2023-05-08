import { Context, UserTrackerData } from '../data/types';

export interface TrackerData {
  template: string;
  context: Context;
}

function parseParams(pageUrl: string): Record<string, string> {
  const startIndex = pageUrl.indexOf('?')
  if (startIndex < 0) {
    return {}
  }

  const pairs = pageUrl.substring(startIndex + 1).split('&')

  return pairs.reduce((acc, pair) => {
    const [key, value] = pair.split('=')
    return { ...acc, [key]: value }
  }, {})
}

function interpolate(template: string, context: Record<string, string | null>) {
  const re = /{(\w+)}/g
  const replacer = (_: string, paramName: string) => context[paramName] || ''
  return template.replace(re, replacer);
}

function buildDeeplink(data: TrackerData, pageUrl: string, userTrackerData: UserTrackerData) {
  const deeplinkTemplate = userTrackerData.deeplink || data.context.deeplink

  if (!deeplinkTemplate) {
    return null;
  }

  const deeplinkContext = {
    ...data.context,
    ...parseParams(pageUrl),
    ...userTrackerData.context
  }

  const deeplink = interpolate(deeplinkTemplate, deeplinkContext)

  return encodeURIComponent(deeplink)
}

export function buildSmartBannerUrl(data: TrackerData, pageUrl: string, userTrackerData: UserTrackerData | null) {
  const customTrackerData = userTrackerData || {}
  const deeplink = buildDeeplink(data, pageUrl, customTrackerData)

  let template = data.template;

  if (deeplink && template.indexOf('deeplink=') < 0) {
    template += template.indexOf('?') < 0 ? '?deeplink={deeplink}' : 'deeplink={deeplink}'
  }

  const context = {
    ...data.context,
    ...customTrackerData.context,
    deeplink
  }

  return interpolate(template, context)
}
