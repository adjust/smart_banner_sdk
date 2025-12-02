/**
 * Main SDK class to access public methods
 * @public
 */
declare class AdjustSmartBanner {
    private static smartBanner;
    static init({ logLevel, ...restOptions }: InitialisationOptions): void;
    static hide(): void;
    static show(): void;
    static setLanguage(lang: string): void;
    static setIosDeepLinkPath(deeplinkPath: string): void;
    static setAndroidDeepLinkPath(deeplinkPath: string): void;
    static setContext(context?: Record<string, string>): void;
}
export default AdjustSmartBanner;

/** @public */
export declare type AppToken = {
    [k in Platform]?: string;
} | string;

/** @public */
export declare type Callback = () => any;

/** @public */
export declare type InitialisationOptions = SmartBannerOptions & {
    logLevel?: LogLevel;
};

/** @public */
export declare type LogLevel = 'none' | 'verbose' | 'info' | 'warning' | 'error';

/**
 * Device platforms
 * @public
 */
export declare enum Platform {
    Android = "android",
    iOS = "ios"
}

/** @public */
export declare interface SmartBannerOptions {
    appToken: AppToken;
    language?: string;
    androidDeepLinkPath?: string;
    iosDeepLinkPath?: string;
    context?: Record<string, string>;
    bannerParent?: HTMLElement;
    onCreated?: Callback;
    onDismissed?: Callback;
}

export { }
