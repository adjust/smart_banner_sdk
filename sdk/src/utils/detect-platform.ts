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

  // Sometimes navigator.maxTouchPoints equals 256 instead of 0 when touch actually isn't supported
  const isMultiTouch = navigator.maxTouchPoints > 0 && navigator.maxTouchPoints !== 256;
  const isTouchDevice = matchMedia('(hover: none) and (pointer: coarse)').matches;
  const supportsTouch = isMultiTouch || isTouchDevice;

  if (/iphone|ipad|ipod/.test(platform) || (platform.includes('macintel') && supportsTouch)) {
    return Platform.iOS
  }

  if (platform.includes('android') || (platform.includes('linux') && supportsTouch)) {
    return Platform.Android
  }

  return undefined;
}
