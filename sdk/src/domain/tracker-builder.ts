import { Context, DeeplinkData } from '../data/types';
import { parseGetParams } from '@utils/parse-get-params';
import { interpolate } from '@utils/template-interpolaion';
import { omitNotDefined } from '@utils/object';
import { DeviceOS, getDeviceOS } from '@utils/detect-os';

export interface TrackerData {
  template: string;
  default_template: string;
  impression_url: string;
  context: Context;
}

interface DeeplinkPaths {
  deep_link_path: string;
  deep_link: string;
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

  let combinedContext = {
    ...data.context,
    ...backwardCompatibleVariables,
    ...customDeeplinkPaths,
    ...parseGetParams(pageUrl),
    ...customContext
  };

  const deeplink = buildDeeplink({ template, context: combinedContext }, customContext);

  combinedContext = {
    ...combinedContext,
    ...deeplink
  };

  const { result, notReplaced } = interpolate(adaptTemplate(template, deeplink), combinedContext);

  if (notReplaced.length > 0) {
    return interpolate(adaptTemplate(data.default_template, deeplink), combinedContext).result;
  }

  return result;
}

function buildDeeplink(data: Omit<TrackerData, 'default_template'>, customContext: Record<string, string>): DeeplinkPaths {
  let deeplinkTemplate = data.context.deep_link_path || data.context.deep_link || '';

  const context: Record<string, string> = {
    ...data.context, // Already contains GET params of the URL
    ...customContext
  };

  // The first iteration, interpolates a template received from the BE, i.e. 
  // "{androidAppScheme}://{androidDeepLinkPath}" => "schema://some/path/{screen}" or
  // "{iosDeepLinkPath}" => "some/path/{screen}"
  deeplinkTemplate = interpolate(deeplinkTemplate, context).result;

  // The second iteration, replaces placeholders in the deeplink path template i.e. 
  // "schema://some/path/{screen}" => "schema://some/path/promo" or 
  // "some/path/{screen}" => "some/path/promo"
  const deeplink = interpolate(deeplinkTemplate, context).result;

  return {
    'deep_link_path': deeplink, // for ios
    'deep_link': encodeURIComponent(deeplink) // for android
  };
}

function adaptTemplate(template: string, context: DeeplinkPaths): string {
  if (getDeviceOS() === DeviceOS.iOS && context.deep_link_path.indexOf('?') > -1) { // if ios deeplink path contains '?'
    // then replace '?' in the template with '&' to avoid invalid URL creation
    return template.replace('?', '&');
  }

  // otherwise do nothing with the template
  return template;
}

