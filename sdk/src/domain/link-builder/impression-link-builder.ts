import { parseGetParams } from '@utils/parse-get-params';
import { interpolate } from '@utils/template-interpolation';
import { Context } from '../../data/types';

export interface ImpressionData {
  impression_url: string;
  context: Context;
}

export const ImpressionLinkBuilder = {
  build: (data: ImpressionData, pageUrl: string, { context: customContext = {} }: { context?: Record<string, string> }): string => {
    const { impression_url: template = '' } = data;

    const combinedContext = {
      ...data.context,
      ...parseGetParams(pageUrl),
      ...customContext
    };

    return interpolate(template, combinedContext).result;
  }
};
