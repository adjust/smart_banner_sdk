import { Context, DeeplinkData } from '../data/types';
import { Logger } from '../utils/logger';
import { parseGetParams } from '../utils/parse-get-params';
import { interpolate } from '../utils/template-interpolaion';
import { DeviceOS } from '../utils/detect-os';

export interface TrackerData {
  template: string;
  context: Context;
}

export function buildSmartBannerUrl(os: DeviceOS, data: TrackerData, pageUrl: string, customDeeplinkData: DeeplinkData) {
  warnIfDataInconsistent(os, data, customDeeplinkData);

  const template = data.template;
  const customTrackerData = customDeeplinkData || {};

  const deeplink = buildDeeplink(os, data, pageUrl, customTrackerData);

  const context: Record<string, string> = {
    ...data.context,
    ...customTrackerData.context,
    ...deeplink
  };

  return interpolate(template, context);
}


/**
 * Logs a warning message if data to create a deeplink is inconsistent
 */
function warnIfDataInconsistent(os: DeviceOS, { template, context }: TrackerData, customDeeplinkData: DeeplinkData) {

  /** FIXME: it's needed to update validation after deep link path templates changed */

  const androidDeeplink = template.indexOf('{deep_link}') >= 0;
  if (androidDeeplink) {
    const schema = customDeeplinkData.androidAppScheme;
    const path = customDeeplinkData.androidDeepLinkPath;
    if ((schema && !path) || (!schema && path)) {
      Logger.warn('Both androidAppScheme and androidDeepLinkPath needed for android platform');
    }
  }

  const hasDeeplinkPlaceholder = androidDeeplink || template.indexOf('{deep_link_path}') >= 0;
  if (!hasDeeplinkPlaceholder) {
    const customPath = customDeeplinkData.androidAppScheme || customDeeplinkData.androidDeepLinkPath || customDeeplinkData.iosDeepLinkPath;
    if (context.deepLink || context.deepLinkPath || customPath) {
      Logger.warn(`Tracker template does not contain deep link placeholders, can not set ${customPath ? 'custom ' : ''}deep link path`);
    }
  }
}

function buildDeeplink(os: DeviceOS, data: TrackerData, pageUrl: string, customDeeplinkData: DeeplinkData): Record<string, string> {
  const appSchema = customDeeplinkData.androidAppScheme || null;
  let deepLinkPath = ''
  if (os === DeviceOS.Android) {
    deepLinkPath = customDeeplinkData.androidDeepLinkPath || data.context.deepLinkPath || '';
  } else if (os === DeviceOS.iOS) {
    deepLinkPath = customDeeplinkData.iosDeepLinkPath || data.context.deepLinkPath || '';
  }

  const context: Record<string, string> = {
    ...data.context,
    ...parseGetParams(pageUrl),
    ...encodeContext(customDeeplinkData.context)
  };

  deepLinkPath = interpolate(deepLinkPath, context); // replace {templates} with values if deep_link_path

  const deepLink = (appSchema && deepLinkPath) ? `${appSchema}://${deepLinkPath}` : null;

  return {
    'deep_link_path': deepLinkPath, // for ios template
    'deep_link': encodeURIComponent(deepLink || interpolate(data.context.deepLink || '', context)) // for android template
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
