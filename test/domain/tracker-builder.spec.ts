import { buildSmartBannerUrl } from '@sdk/domain/tracker-builder';

describe('Smart Banners tracker link building', () => {
  const trackerWithoutDeeplink = 'https://{domain}/{tracker}?campaign={campaign}&adgroup={adgroup}';
  const trackerWithDeeplink = 'https://{domain}/{tracker}?campaign={campaign}&deeplink={deeplink}&adgroup={adgroup}';

  const context = {
    domain: 'app.adjust.com',
    tracker: 'qtzy19',
    campaign: 'banner test 1',
    adgroup: 'en',
    deeplink: null
  };

  describe('No custom data, all data received from BE', () => {
    it('builds tracker without deeplink', () => {
      const trackerData = {
        template: trackerWithoutDeeplink,
        context
      };

      const expected = 'https://app.adjust.com/qtzy19?campaign=banner%20test%201&adgroup=en';

      expect(buildSmartBannerUrl(trackerData, '', null)).toBe(expected);
    });

    it('builds tracker with deeplink', () => {
      const trackerData = {
        template: trackerWithDeeplink,
        context: { ...context, deeplink: 'myapp://super/promotion' }
      };

      const expected = 'https://app.adjust.com/qtzy19?campaign=banner%20test%201&deeplink=myapp%3A%2F%2Fsuper%2Fpromotion&adgroup=en';

      expect(buildSmartBannerUrl(trackerData, '', null)).toBe(expected);
    });

    it('interpolates deeplink with GET parameters', () => {
      const trackerData = {
        template: trackerWithDeeplink,
        context: { ...context, deeplink: 'myapp://promotion/{promotion_id}' }
      };

      const expected = 'https://app.adjust.com/qtzy19?campaign=banner%20test%201&deeplink=myapp%3A%2F%2Fpromotion%2Fnew-user&adgroup=en';

      expect(buildSmartBannerUrl(trackerData, 'https://example.com?promotion_id=new-user', null)).toBe(expected);
    });
  });

  describe('Custom deeplink context', () => {
    describe('Custom static deeplink provided', () => {
      const customTrackerData = {
        deeplink: 'myapp://super/promotion'
      };

      it('builds tracker and appends deeplink', () => {
        const expected = 'https://app.adjust.com/qtzy19?campaign=banner%20test%201&adgroup=en&deeplink=myapp%3A%2F%2Fsuper%2Fpromotion';

        expect(buildSmartBannerUrl({ template: trackerWithoutDeeplink, context }, '', customTrackerData)).toBe(expected);
      });

      it('builds tracker from template containing deeplink', () => {
        const expected = 'https://app.adjust.com/qtzy19?campaign=banner%20test%201&deeplink=myapp%3A%2F%2Fsuper%2Fpromotion&adgroup=en';

        expect(buildSmartBannerUrl({ template: trackerWithDeeplink, context }, '', customTrackerData)).toBe(expected);
      });
    });

    describe('Custom deeplink template provided, but no custom context', () => {
      const customTrackerData = {
        deeplink: 'myapp://promotion/{promotion_id}'
      };

      describe('Template contains deeplink placeholder', () => {
        it('interpolates deeplink with GET params', () => {
          const expected = 'https://app.adjust.com/qtzy19?campaign=banner%20test%201&deeplink=myapp%3A%2F%2Fpromotion%2Fnew-user&adgroup=en';

          expect(buildSmartBannerUrl(
            { template: trackerWithDeeplink, context },
            'https://example.com?cat=meow&promotion_id=new-user',
            customTrackerData
          ))
            .toBe(expected);
        });

        it('interpolates deeplink param with empty string if no such GET param', () => {
          const expected = 'https://app.adjust.com/qtzy19?campaign=banner%20test%201&deeplink=myapp%3A%2F%2Fpromotion%2F&adgroup=en';

          expect(buildSmartBannerUrl(
            { template: trackerWithDeeplink, context },
            'https://example.com?cat=meow&param=oops',
            customTrackerData
          ))
            .toBe(expected);
        });
      });

      describe('Template does not contain deeplink placeholder', () => {
        it('interpolates deeplink with GET params', () => {
          const expected = 'https://app.adjust.com/qtzy19?campaign=banner%20test%201&adgroup=en&deeplink=myapp%3A%2F%2Fpromotion%2Fnew-user';

          expect(buildSmartBannerUrl(
            { template: trackerWithoutDeeplink, context },
            'https://example.com?cat=meow&promotion_id=new-user',
            customTrackerData
          ))
            .toBe(expected);
        });

        it('interpolates deeplink param with empty string if no such GET param', () => {
          const expected = 'https://app.adjust.com/qtzy19?campaign=banner%20test%201&adgroup=en&deeplink=myapp%3A%2F%2Fpromotion%2F';

          expect(buildSmartBannerUrl(
            { template: trackerWithoutDeeplink, context },
            'https://example.com?cat=meow&param=oops',
            customTrackerData
          ))
            .toBe(expected);
        });
      });
    });

    describe('Custom deeplink and custom context provided', () => {
      const customDeeplink = 'myapp://{catalog}?product={product_id}&discout={discount_id}';
      const customContext = {
        product_id: '123',
        discount_id: 'new-client'
      };

      describe('Template contains deeplink placeholder', () => {
        it('interpolates deeplink with custom context, ignoring GET params', () => {
          const customTrackerData = { deeplink: customDeeplink, context: { ...customContext, catalog: 'summer_dresses' } };

          const expectedDeeplink = encodeURIComponent('myapp://summer_dresses?product=123&discout=new-client');
          const expected = `https://app.adjust.com/qtzy19?campaign=banner%20test%201&deeplink=${expectedDeeplink}&adgroup=en`;

          expect(buildSmartBannerUrl(
            { template: trackerWithDeeplink, context },
            'https://example.com?catalog=winter-shoes',
            customTrackerData
          ))
            .toBe(expected);
        });

        it('interpolates deeplink parameter with GET param if missing in custom context', () => {
          const expectedDeeplink = encodeURIComponent('myapp://winter-shoes?product=123&discout=new-client');
          const expected = `https://app.adjust.com/qtzy19?campaign=banner%20test%201&deeplink=${expectedDeeplink}&adgroup=en`;

          expect(buildSmartBannerUrl(
            { template: trackerWithDeeplink, context },
            'https://example.com?catalog=winter-shoes',
            { deeplink: customDeeplink, context: customContext }
          ))
            .toBe(expected);
        });

        it('interpolates deeplink param with empty string if no such param found', () => {
          const expectedDeeplink = encodeURIComponent('myapp://?product=123&discout=new-client');
          const expected = `https://app.adjust.com/qtzy19?campaign=banner%20test%201&deeplink=${expectedDeeplink}&adgroup=en`;

          expect(buildSmartBannerUrl(
            { template: trackerWithDeeplink, context },
            'https://example.com?param=oops',
            { deeplink: customDeeplink, context: customContext }
          ))
            .toBe(expected);
        });
      });

      describe('Template does not contain deeplink placeholder', () => {
        it('interpolates deeplink with custom context, ignoring GET params', () => {
          const customTrackerData = { deeplink: customDeeplink, context: { ...customContext, catalog: 'summer_dresses' } };

          const expectedDeeplink = encodeURIComponent('myapp://summer_dresses?product=123&discout=new-client');
          const expected = `https://app.adjust.com/qtzy19?campaign=banner%20test%201&adgroup=en&deeplink=${expectedDeeplink}`;

          expect(buildSmartBannerUrl(
            { template: trackerWithoutDeeplink, context },
            'https://example.com?catalog=winter-shoes',
            customTrackerData
          ))
            .toBe(expected);
        });

        it('interpolates deeplink parameter with GET param if missing in custom context', () => {
          const expectedDeeplink = encodeURIComponent('myapp://winter-shoes?product=123&discout=new-client');
          const expected = `https://app.adjust.com/qtzy19?campaign=banner%20test%201&adgroup=en&deeplink=${expectedDeeplink}`;

          expect(buildSmartBannerUrl(
            { template: trackerWithoutDeeplink, context },
            'https://example.com?catalog=winter-shoes',
            { deeplink: customDeeplink, context: customContext }
          ))
            .toBe(expected);
        });

        it('interpolates deeplink param with empty string if no such param found', () => {
          const expectedDeeplink = encodeURIComponent('myapp://?product=123&discout=new-client');
          const expected = `https://app.adjust.com/qtzy19?campaign=banner%20test%201&adgroup=en&deeplink=${expectedDeeplink}`;

          expect(buildSmartBannerUrl(
            { template: trackerWithoutDeeplink, context },
            'https://example.com?param=oops',
            { deeplink: customDeeplink, context: customContext }
          ))
            .toBe(expected);
        });
      });
    });

    describe('Custom context, default deeplink', () => {
      describe('Static deeplink', () => {
        const trackerData = {
          template: trackerWithDeeplink,
          context: { ...context, deeplink: 'myapp://super/promotion' }
        };

        const expected = 'https://app.adjust.com/qtzy19?campaign=banner%20test%201&deeplink=myapp%3A%2F%2Fsuper%2Fpromotion&adgroup=en';

        it('ignores custom context parameters', () => {
          expect(buildSmartBannerUrl(trackerData, '', { context: { everything: 'ignored' } })).toBe(expected);
        });

        it('ignores GET parameters', () => {
          expect(buildSmartBannerUrl(trackerData, 'https://example.com?param=oops', { context: { everything: 'ignored' } })).toBe(expected);
        });
      });

      describe('Deeplink template', () => {
        const deeplinkTemplate = 'myapp://{catalog}?product={product_id}';
        const trackerData = {
          template: trackerWithDeeplink,
          context: { ...context, deeplink: deeplinkTemplate }
        };

        it('interpolates deeplink with custom context ignoring GET params', () => {
          const expectedDeeplink = encodeURIComponent('myapp://summer-dresses?product=123');
          const expected = `https://app.adjust.com/qtzy19?campaign=banner%20test%201&deeplink=${expectedDeeplink}&adgroup=en`;

          expect(buildSmartBannerUrl(
            trackerData,
            'https://example.com?catalog=winter-shoes',
            {
              context: {
                catalog: 'summer-dresses',
                product_id: '123'
              }
            }
          ))
            .toBe(expected);
        });

        it('interpolates deeplink with GET parameters if no such parameters in context', () => {
          const expectedDeeplink = encodeURIComponent('myapp://winter-shoes?product=123');
          const expected = `https://app.adjust.com/qtzy19?campaign=banner%20test%201&deeplink=${expectedDeeplink}&adgroup=en`;

          expect(buildSmartBannerUrl(
            trackerData,
            'https://example.com?catalog=winter-shoes',
            { context: { product_id: '123' } }
          ))
            .toBe(expected);
        });

        it('interpolates deeplink param with empty string if no such param found', () => {
          const expectedDeeplink = encodeURIComponent('myapp://?product=123');
          const expected = `https://app.adjust.com/qtzy19?campaign=banner%20test%201&deeplink=${expectedDeeplink}&adgroup=en`;

          expect(buildSmartBannerUrl(
            trackerData,
            'https://example.com?param=oops',
            { context: { product_id: '123' } }
          ))
            .toBe(expected);
        });
      });
    });
  });
});
