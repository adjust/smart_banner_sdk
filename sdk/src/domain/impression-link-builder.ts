import { parseGetParams } from '@utils/parse-get-params';
import { interpolate } from '@utils/template-interpolaion';
import { Context } from '../data/types';

export interface ImpressionData {
  impression_url: string;
  context: Context;
}

export function buildImpressionLink(impressionData: ImpressionData, pageUrl: string) {
  const { impression_url: template, context } = impressionData;

  let combinedContext = {
    ...context,
    ...parseGetParams(pageUrl),
  };

  return interpolate(template, combinedContext).result;
}
