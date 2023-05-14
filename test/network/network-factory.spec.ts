import { NetworkFactory } from '@sdk/network/network-factory';
import * as xhrNetworkModule from '@sdk/network/xhr-network';

describe('NetworkFactory', () => {

  beforeAll(() => {
    jest.spyOn(xhrNetworkModule, 'XhrNetwork');
  });

  afterEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  it('creates XhrNetwork', () => {
    NetworkFactory.create({ dataEndpoint: 'endpoint.test' });

    expect(xhrNetworkModule.XhrNetwork).toBeCalledWith('endpoint.test');
  });
});
