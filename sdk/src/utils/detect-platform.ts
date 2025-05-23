/**
 * Device platforms
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
  const platform = (navigator.userAgentData?.platform || navigator.userAgent || '').toLowerCase();

  // Sometimes navigator.maxTouchPoints equals 256 instead of 0 when touch actually isn't supported
  const maxTouchPoints = navigator.maxTouchPoints & 0xFF;
  const isMultiTouch = maxTouchPoints > 0;
  const isTouchDevice = matchMedia('(hover: none) and (pointer: coarse)').matches;
  const supportsTouch = isMultiTouch || isTouchDevice;

  if (/iphone|ipad|ipod/.test(platform) || (platform.includes('macintosh') && supportsTouch)) {
    return Platform.iOS;
  }

  if (platform.includes('android') || (platform.includes('linux') && supportsTouch)) {
    return Platform.Android;
  }

  return undefined;
}
