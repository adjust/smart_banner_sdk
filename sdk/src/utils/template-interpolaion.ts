import { Logger } from './logger';
/**
 * Replaces in template all occurences of parameters in curly brackets by values founded by names in context.
 * Logs a warning if there is no value for a certain placeholder.
 * 
 * @param template a string containing parameter names in curly brackets
 * @param context an object containing parameters for interpolation
 * @returns interpolated template
 * 
 * @example
 * const greet = interpolate("Hello, {username}!", { username: 'John Smith' });
 * console.log(greet); // prints "Hello John Smith!"
 */
export function interpolate(template: string, context: Record<string, Primitive>) {
  const re = /{(\w+)}/g;
  const replacer = (_: string, paramName: string): string => {
    if (context[paramName] === undefined) {
      Logger.warn(`No value for placeholder: {${paramName}}`);
    }
    return String(context[paramName] || '');
  };
  return template.replace(re, replacer);
}

type Primitive = number | string | boolean | null | undefined
