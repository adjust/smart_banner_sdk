import { parseGetParams } from '@utils/parse-get-params';
import { interpolate } from '@utils/template-interpolaion';
import { Context } from '../../data/types';
import { LinkBuilder } from './types';

export interface ImpressionData {
  impression_url: string;
  default_impression_url: string;
  context: Context;
}

export const ImpressionLinkBuilder = {
  build: (impressionData: ImpressionData, pageUrl: string): string => {
    const { impression_url: template = '', default_impression_url = '', context } = impressionData;

    const combinedContext = {
      ...context,
      ...parseGetParams(pageUrl),
    };

    const { result, notReplaced } = interpolate(template, combinedContext);

    if (notReplaced.length > 0) {
      return interpolate(default_impression_url, combinedContext).result;
    }

    return result;
  }
} as LinkBuilder<ImpressionData>;
