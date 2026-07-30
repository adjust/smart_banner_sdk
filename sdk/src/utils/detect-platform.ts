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
  const platform = (navigator.userAgentData?.platform || '').toLowerCase();
  const userAgent = (navigator.userAgent || '').toLowerCase();

  // Sometimes navigator.maxTouchPoints equals 256 instead of 0 when touch actually isn't supported
  const maxTouchPoints = navigator.maxTouchPoints & 0xFF;
  const isMultiTouch = maxTouchPoints > 0;
  const isTouchDevice = typeof matchMedia === 'function'
    ? matchMedia('(hover: none) and (pointer: coarse)').matches
    : false;
  const supportsTouch = isMultiTouch || isTouchDevice;

  // It's not expected to get navigator.userAgentData?.platform on iOS/iPadOS device, but
  // some third-party libraries override this value
  const isIosPlatform = (['iphone', 'ipad', 'ipod', 'ios', 'ipados']).includes(platform);
  const isIosUA = /iphone|ipad|ipod/.test(userAgent);
  const isIpad = userAgent.includes('macintosh') && supportsTouch;

  if (isIosPlatform || isIosUA || isIpad) {
    return Platform.iOS;
  }

  const isAndroidPlatform = platform.includes('android');
  const isAndroidUA = userAgent.includes('android');
  const isLinuxTablet = (platform.includes('linux') || userAgent.includes('linux')) && supportsTouch;

  if (isAndroidPlatform || isAndroidUA || isLinuxTablet) {
    return Platform.Android;
  }

  return undefined;
}
