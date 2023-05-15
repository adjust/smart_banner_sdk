import { Context, DeeplinkData } from '../data/types';
import { Logger } from '../utils/logger';
import { parseGetParams } from '../utils/parse-get-params';
import { interpolate } from '../utils/template-interpolaion';

export interface TrackerData {
  template: string;
  context: Context;
}

export function buildSmartBannerUrl(data: TrackerData, pageUrl: string, customDeeplinkData: DeeplinkData) {
  warnIfDataInconsistent(data, customDeeplinkData);

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


/**
 * Logs a warning message if data to create a deeplink is inconsistent
 */
function warnIfDataInconsistent({ template, context }: TrackerData, customDeeplinkData: DeeplinkData) {
  const androidDeeplink = template.indexOf('{deep_link}') >= 0;
  if (androidDeeplink) {
    const schema = customDeeplinkData.androidAppSchema;
    const path = customDeeplinkData.deepLinkPath;
    if ((schema && !path) || (!schema && path)) {
      Logger.warn('Both androidAppSchema and deepLinkPath needed for android platform');
    }
  }

  const hasDeeplinkPlaceholder = androidDeeplink || template.indexOf('{deep_link_path}') >= 0;
  if (!hasDeeplinkPlaceholder) {
    const customPath = customDeeplinkData.androidAppSchema || customDeeplinkData.deepLinkPath;
    if (context.deepLink || context.deepLinkPath || customPath) {
      Logger.warn(`Tracker template does not contain deep link placeholders, can not set ${customPath ? 'custom ' : ''}deep link path`);
    }
  }
}

function buildDeeplink(data: TrackerData, pageUrl: string, customDeeplinkData: DeeplinkData): Record<string, string> {
  const appSchema = customDeeplinkData.androidAppSchema || null;
  let deepLinkPath = customDeeplinkData.deepLinkPath || data.context.deepLinkPath || '';

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
