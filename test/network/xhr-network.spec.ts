import { NoConnectionError } from '@sdk/network/errors';
import { XhrNetwork } from '@sdk/network/xhr-network';

jest.mock('@sdk/utils/logger');

describe('XhrNetwork tests', () => {
  const dataEndpoint = 'load-data.test';

  const xhrMock: Partial<XMLHttpRequest> = {
    open: jest.fn(),
    setRequestHeader: jest.fn(),
    send: jest.fn(),
    onerror: jest.fn(),
    onreadystatechange: jest.fn()
  };

  const testedNetwork = new XhrNetwork(dataEndpoint);

  beforeAll(() => {
    jest.spyOn(window, 'XMLHttpRequest').mockImplementation(() => xhrMock as XMLHttpRequest);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('request method', () => {
    it('sends request to path with encoded params', async () => {
      expect.assertions(1);

      testedNetwork.request('/whatever', { foo: 'bar', n: 42 });

      const expectedUrl = `${dataEndpoint}/whatever?foo=bar&n=42`;

      expect(xhrMock.open).toHaveBeenCalledWith('GET', expectedUrl);
    });

    it('sends request to path without params', async () => {
      expect.assertions(1);

      testedNetwork.request('/whatever');

      const expectedUrl = `${dataEndpoint}/whatever`;

      expect(xhrMock.open).toHaveBeenCalledWith('GET', expectedUrl);
    });

    it('throws NoConnectionError if request failed due to network connection issue', async () => {
      expect.assertions(1);

      jest.spyOn(xhrMock, 'send').mockImplementationOnce(() => { (xhrMock as any).onerror(); });

      try {
        await testedNetwork.request('/whatever');
      } catch (error) {
        expect(error).toEqual(NoConnectionError);
      }
    });

    it('throws an error if request failed', async () => {
      expect.assertions(1);

      const err = { status: 400, message: 'Bad request' };

      jest.spyOn(xhrMock, 'send').mockImplementationOnce(() => {
        const xhrFailedMock = xhrMock as any;
        xhrFailedMock.readyState = 4;
        xhrFailedMock.status = err.status;
        xhrFailedMock.responseText = err.message;
        xhrFailedMock.onreadystatechange();
      });

      try {
        await testedNetwork.request('/whatever');
      } catch (error) {
        expect(error).toEqual(err);
      }
    });
  });
});
