import { Context, DeeplinkData } from '../../data/types';
import { parseGetParams } from '@utils/parse-get-params';
import { interpolate } from '@utils/template-interpolaion';
import { omitNotDefined } from '@utils/object';
import { Platform, getPlatform } from '@utils/detect-platform';

export interface TrackerData {
  template: string;
  context: Context;
}

interface DeeplinkPaths {
  deep_link_path: string;
  deep_link: string;
}

export const TrackerBuilder = {
  build: (data: TrackerData, pageUrl: string, customDeeplinkData: DeeplinkData): string => {
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

    return interpolate(adaptTemplate(template, deeplink), combinedContext).result;
  }
};

function buildDeeplink(data: TrackerData, customContext: Record<string, string>): DeeplinkPaths {
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
  if (getPlatform() === Platform.iOS && context.deep_link_path.indexOf('?') > -1) { // if ios deeplink path contains '?'
    // then replace '?' in the template with '&' to avoid invalid URL creation
    return template.replace('?', '&');
  }

  // otherwise do nothing with the template
  return template;
}

