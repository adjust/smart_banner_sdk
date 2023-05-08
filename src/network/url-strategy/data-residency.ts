import { BaseUrlsMap } from './url-strategy';
import { ENDPOINTS } from './endpoints';

export namespace DataResidency {
  export const EU = 'EU';
  export const TR = 'TR';
  export const US = 'US';

  export type Region = typeof EU | typeof TR | typeof US

  const endpoints: Record<Region, BaseUrlsMap> = {
    [EU]: ENDPOINTS.EU,
    [TR]: ENDPOINTS.TR,
    [US]: ENDPOINTS.US,
  };

  const getPreferredUrlsWithOption = (endpoints: Record<Region, BaseUrlsMap>, option: Region) => {
    return [endpoints[option]];
  };

  export function preferredUrlsGetter(option: Region, endpointsMap: Record<Region, BaseUrlsMap> = endpoints) {
    return () => getPreferredUrlsWithOption(endpointsMap, option);
  }
}
