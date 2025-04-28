/**
 * Operation systems
 * @public
 */
export enum Platform {
  Android = 'android',
  iOS = 'ios',
}

/**
 * Detects if current platform is Android or iOS using window.navigator data and relying on touch and pointing device availablity.
 */
export function getPlatform(): Platform | undefined {
  const platform = (navigator.userAgentData?.platform || navigator.userAgent || navigator.platform || '').toLowerCase();

  const maxTouchPoints = navigator.maxTouchPoints || 0;
  const isTouchDevice = matchMedia('(hover: none) and (pointer: coarse)').matches;

  if (
    /iphone|ipad|ipod/.test(platform) ||
    (platform === 'macintel' && maxTouchPoints > 1)
  ) {
    return Platform.iOS
  }

  if (
    (platform.includes('android') || platform.includes('linux')) &&
    isTouchDevice && maxTouchPoints > 1
  ) {
    return Platform.Android
  }

  return undefined;
}
