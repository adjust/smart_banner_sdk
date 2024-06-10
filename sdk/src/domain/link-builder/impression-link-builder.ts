import { parseGetParams } from '@utils/parse-get-params';
import { interpolate } from '@utils/template-interpolaion';
import { Context } from '../../data/types';
import { LinkBuilder } from './types';

export interface ImpressionData {
  impression_url: string;
  context: Context;
}

export const ImpressionLinkBuilder = {
  build: (impressionData: ImpressionData, pageUrl: string): string => {
    const { impression_url: template = '', context } = impressionData;

    const combinedContext = {
      ...context,
      ...parseGetParams(pageUrl),
    };

    return interpolate(template, combinedContext).result;
  }
} as LinkBuilder<ImpressionData>;
