import { NetworkFactory } from "@sdk/network/network-factory";
import * as drNetworkModule from "@sdk/network/data-residency/data-residency-network";
import * as xhrNetworkModule from "@sdk/network/xhr-network";
import { ENDPOINTS } from "@sdk/network/data-residency/endpoints";

describe('NetworkFactory', () => {

  beforeAll(() => {
    jest.spyOn(xhrNetworkModule, 'XhrNetwork')
    jest.spyOn(drNetworkModule, 'NetworkWithDataResidency')
  })

  afterEach(() => jest.clearAllMocks())

  afterAll(() => jest.resetAllMocks())

  it('creates XhrNetwork if no DataResidency.Region defined', () => {
    const network = NetworkFactory.create({ dataEndpoint: 'endpoint.test' })

    expect(xhrNetworkModule.XhrNetwork).toBeCalled()
    expect(network.trackerEndpoint).toBe(ENDPOINTS.default.app)
  })

  it('creates NetworkWithDataResidency if DataResidency.Region defined', () => {
    const network = NetworkFactory.create({ dataEndpoint: 'endpoint.test', dataResidencyRegion: 'EU' })

    expect(drNetworkModule.NetworkWithDataResidency).toBeCalled()
    expect(network.trackerEndpoint).toBe(ENDPOINTS.EU.app)
  })
})
