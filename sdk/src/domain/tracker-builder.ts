import { Context, DeeplinkData } from '../data/types';
import { parseGetParams } from '../utils/parse-get-params';
import { interpolate } from '../utils/template-interpolaion';
import { omitNotDefined } from '../utils/object';

export interface TrackerData {
  template: string;
  context: Context;
}

export function buildSmartBannerUrl(data: TrackerData, pageUrl: string, customDeeplinkData: DeeplinkData) {
  const template = data.template;

  const { context: customContext = {}, ...restCustomData } = customDeeplinkData;
  const customDeeplinkPaths = omitNotDefined(restCustomData);

  const backwardCompatibleVariables = omitNotDefined({
    'androidAppScheme': data.context.android_app_scheme,
    'androidDeepLinkPath': data.context.android_deep_link_path,
    'iosDeepLinkPath': data.context.ios_deep_link_path
  });

  data.context = { ...data.context, ...backwardCompatibleVariables, ...customDeeplinkPaths };

  const deeplink = buildDeeplink(data, pageUrl, customContext);

  const context: Record<string, string> = {
    ...data.context,
    ...customContext,
    ...deeplink
  };

  return interpolate(template, context);
}

function buildDeeplink(data: TrackerData, pageUrl: string, customContext: Record<string, string>): Record<string, string> {
  let deeplinkTemplate = data.context.deep_link_path || data.context.deep_link || '';

  const context: Record<string, string> = {
    ...data.context,
    ...parseGetParams(pageUrl),
    ...customContext
  };

  // The first iteration, interpolates a template received from the BE, i.e. 
  // "{androidAppScheme}://{androidDeepLinkPath}" => "schema://some/path/{screen}" or
  // "{iosDeepLinkPath}" => "some/path/{screen}"
  deeplinkTemplate = interpolate(deeplinkTemplate, context);

  // The second iteration, replaces placeholders in the deeplink path template i.e. 
  // "schema://some/path/{screen}" => "schema://some/path/promo" or 
  // "some/path/{screen}" => "some/path/promo"
  const deeplink = interpolate(deeplinkTemplate, context);

  return {
    'deep_link_path': deeplink, // for ios
    'deep_link': encodeURIComponent(deeplink) // for android
  };
}

