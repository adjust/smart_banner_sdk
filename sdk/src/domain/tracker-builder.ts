import { Context, DeeplinkData } from '../data/types';
import { parseGetParams } from '../utils/parse-get-params';
import { interpolate } from '../utils/template-interpolaion';

export interface TrackerData {
  template: string;
  context: Context;
}

export function buildSmartBannerUrl(data: TrackerData, pageUrl: string, customDeeplinkData: DeeplinkData) {
  const template = data.template;
  const customTrackerData = customDeeplinkData || {};

  const deeplink = buildDeeplink(data, pageUrl, customTrackerData);

  const context: Record<string, string> = {
    ...data.context,
    ...customTrackerData.context,
    ...deeplink
  };

  return interpolate(template, context);
}

function buildDeeplink(data: TrackerData, pageUrl: string, customDeeplinkData: DeeplinkData): Record<string, string> {
  let deeplinkTemplate = data.context.deep_link_path || data.context.deep_link || '';

  const context: Record<string, string> = {
    ...data.context,
    ...parseGetParams(pageUrl),
    ...encodeContext(customDeeplinkData.context)
  };

  // The first iteration, interpolates a template received from the BE,
  // i.e. "{androidAppScheme}://{androidDeepLinkPath}" => "schema://some/path/{screen}"
  deeplinkTemplate = interpolate(deeplinkTemplate, context);

  // The second iteration, replaces placeholders in the deeplink path template
  // i.e. "schema://some/path/{screen}" => "schema://some/path/promo"
  const deeplink = interpolate(deeplinkTemplate, context);

  return {
    'deep_link_path': deeplink, // for ios
    'deep_link': encodeURIComponent(deeplink) // for android
  };
}

function encodeContext(context: Record<string, string> = {}): Record<string, string> {
  return Object.keys(context)
    .map((key: string) => {
      const value = context[key];
      if (!value) {
        return { [key]: '' };
      }

      return { [key]: encodeURIComponent(value) };
    })
    .reduce((acc, current) => {
      return { ...acc, ...current };
    }, {});
}
