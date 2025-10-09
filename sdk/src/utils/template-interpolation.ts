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
 * @param emptyPlaceholder string to be inserted when no value for parameter found, default value is "none"
 * @returns an object containing interpolated template as a result and a list of placeholders which were not replaced
 * 
 * @example
 * const greet = interpolate("Hello, {title} {name}!", { title: 'Prof', name: 'Smith' });
 * console.log(greet.result); // prints "Hello, Prof Smith!"
 * 
 * @example
 * const greet = interpolate("Hello, {title} {name}!", { title: 'Prof' });
 * console.log(greet.result); // prints "Hello, Prof none!"
 * 
 * @example
 * const greet = interpolate("Hello, {title} {name}!", { title: 'Prof' }, 'unknown');
 * console.log(greet.result); // prints "Hello, Prof unknown!"
 */
export function interpolate(template: string, context: Record<string, Primitive>, emptyPlaceholder: string = 'none'): InterpolationResult {
  const notReplacedPlaceholders: string[] = [];

  const re = /{(\w+)}/g;
  const replacer = (_: string, paramName: string): string => {
    if (context[paramName] === undefined || context[paramName] === null) {
      notReplacedPlaceholders.push(paramName);
      Logger.warn(`No value for placeholder: {${paramName}}`);
      return emptyPlaceholder;
    }

    return String(context[paramName]);
  };

  return {
    result: template.replace(re, replacer),
    notReplaced: notReplacedPlaceholders
  };
}

type Primitive = number | string | boolean | null | undefined
