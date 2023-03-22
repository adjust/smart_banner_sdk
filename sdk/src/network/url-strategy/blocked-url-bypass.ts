import { BaseUrlsMap } from './url-strategy';
import { ENDPOINTS } from './endpoints';

export namespace BlockedUrlBypass {
  export const Default = 'default';
  export const India = 'india';
  export const China = 'china';

  export type Strategy = typeof Default | typeof India | typeof China

  const endpoints: Record<Strategy, BaseUrlsMap> = {
    [Default]: ENDPOINTS.default,
    [India]: ENDPOINTS.india,
    [China]: ENDPOINTS.china,
  };

  const getPreferredUrlsWithOption = (endpoints: Record<Strategy, BaseUrlsMap>, option?: Strategy) => {

    if (option === India) {
      return [
        endpoints[India],
        endpoints[Default]
      ];
    }

    if (option === China) {
      return [
        endpoints[China],
        endpoints[Default]
      ];
    }

    return [
      endpoints[Default],
      endpoints[India],
      endpoints[China]
    ];
  };

  export function preferredUrlsGetter(option?: Strategy, endpointsMap: Record<Strategy, BaseUrlsMap> = endpoints) {
    return () => getPreferredUrlsWithOption(endpointsMap, option);
  }
}
