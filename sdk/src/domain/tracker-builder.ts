import { Context, UserTrackerData } from '../data/types';
import { parseGetParams } from '../utils/parse-get-params';
import { interpolate } from '../utils/template-interpolaion';

export interface TrackerData {
  template: string;
  context: Context;
}

function buildDeeplink(data: TrackerData, pageUrl: string, userTrackerData: UserTrackerData) {
  const deeplinkTemplate = userTrackerData.deeplink || data.context.deeplink;

  if (!deeplinkTemplate) {
    return null;
  }

  const deeplinkContext = {
    ...data.context,
    ...parseGetParams(pageUrl),
    ...userTrackerData.context
  };

  const deeplink = interpolate(deeplinkTemplate, deeplinkContext);

  return encodeURIComponent(deeplink);
}

export function buildSmartBannerUrl(data: TrackerData, pageUrl: string, userTrackerData: UserTrackerData | null) {
  const customTrackerData = userTrackerData || {};

  const deeplink = buildDeeplink(data, pageUrl, customTrackerData);

  let template = data.template;

  if (deeplink && template.indexOf('deeplink=') < 0) {
    template += template.indexOf('?') < 0 ? '?deeplink={deeplink}' : 'deeplink={deeplink}';
  }

  const context = {
    ...data.context,
    ...customTrackerData.context,
    deeplink
  };

  return interpolate(template, context);
}
