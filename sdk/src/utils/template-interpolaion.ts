/**
 * Replaces in template all occurences of parameters in curly brackets by values founded by names in context
 * 
 * @param template a string containing parameter names in curly brackets
 * @param context an object containing parameters for interpolation
 * @returns interpolated template
 * 
 * @example
 * const greet = interpolate("Hello {username}!", { username: John Smith });
 * console.log(greet); // prints "Hello John Smith!"
 */
export function interpolate(template: string, context: Record<string, string | null>) {
  const re = /{(\w+)}/g
  const replacer = (_: string, paramName: string) => context[paramName] || ''
  return template.replace(re, replacer);
}
