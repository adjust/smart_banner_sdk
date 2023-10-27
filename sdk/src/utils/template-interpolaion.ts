import { Logger } from './logger';

export interface InterpolationResult {
  result: string;
  notReplaced: string[];
}

/**
 * Replaces in template all occurences of parameters in curly brackets by values founded by names in context.
 * Logs a warning if there is no value for a certain placeholder.
 * 
 * @param template a string containing parameter names in curly brackets
 * @param context an object containing parameters for interpolation
 * @returns an object containing interpolated template as a result and a list of placeholders which were not replaced
 * 
 * @example
 * const greet = interpolate("Hello, {username}!", { username: 'John Smith' });
 * console.log(greet); // prints "Hello John Smith!"
 */
export function interpolate(template: string, context: Record<string, Primitive>): InterpolationResult {
  const notReplacedPlaceholders: string[] = [];

  const re = /{(\w+)}/g;
  const replacer = (_: string, paramName: string): string => {
    if (context[paramName] === undefined) {
      notReplacedPlaceholders.push(paramName);
      Logger.warn(`No value for placeholder: {${paramName}}`);
    }
    return String(context[paramName] || '');
  };

  return {
    result: template.replace(re, replacer),
    notReplaced: notReplacedPlaceholders
  };
}

type Primitive = number | string | boolean | null | undefined
