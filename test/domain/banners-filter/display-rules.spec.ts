import { SmartBannerData } from '@sdk/data/types';
import { DisplayRules } from '@sdk/domain/banners-filter/display-rules';

const defaultBanner = {
  id: 'default-banner',
  display_rules: null,
} as SmartBannerData;

const oneConditionBanner = {
  id: 'one-condition-banner',
  display_rules: {
    operator: 'or',
    rules: [
      {
        operator: 'and',
        rules: ['(\\/?\\?|&)param=test(&|$)'] // URL contains GET parameter 'param=test'
      }
    ]
  },
} as SmartBannerData;

const orConditionBanner = {
  id: 'or-condition-banner',
  display_rules: {
    operator: 'or',
    rules: [
      {
        operator: 'and',
        rules: ['(\\/?\\?|&)param=test(&|$)'] // URL contains GET parameter 'param=test'
      },
      {
        operator: 'and',
        rules: ['https?:\\/\\/[\\w.-]*localhost'] // domain contains 'localhost'
      }
    ]
  },
} as SmartBannerData;

const andConditionBanner = {
  id: 'and-condition-banner',
  display_rules: {
    operator: 'or',
    rules: [
      {
        operator: 'and',
        rules: [
          'https?:\\/\\/[\\w.-]*localhost', // domain contains 'localhost'
          '(\\/?\\?|&)param=test(&|$)' // URL contains GET parameter 'param=test'
        ]
      }
    ]
  },
} as SmartBannerData;

const recursiveConditionBanner = {
  id: 'embedded-rules',
  display_rules: {
    operator: 'or',
    rules: [
      {
        operator: 'and',
        rules: [
          'https?:\\/\\/[\\w.-]*localhost', // domain contains 'localhost'
          '(\\/?\\?|&)param=recursive1(&|$)' // URL contains GET parameter 'param=recursive1'
        ]
      },
      {
        operator: 'and',
        rules: ['(\\/?\\?|&)param=recursive2(&|$)'] // URL contains GET parameter 'param=recursive2'
      }
    ]
  },
} as SmartBannerData;

describe('DisplayRules tests', () => {
  describe('Rule with a single condition', () => {
    it('applies a rule', () => {
      const actual = new DisplayRules('domain.test/?param=test').filter([defaultBanner, oneConditionBanner, orConditionBanner]);
      expect(actual).toEqual([oneConditionBanner, orConditionBanner]);
    });

    it('returns a default banner when no suitable ones', () => {
      const actual = new DisplayRules('domain.test/?test=false').filter([defaultBanner, oneConditionBanner, orConditionBanner]);
      expect(actual).toEqual([defaultBanner]);
    });

    it('returns an empty array if no suitable and no default banners', () => {
      const actual = new DisplayRules('domain.test/?param=pam-param').filter([oneConditionBanner, orConditionBanner]);
      expect(actual).toEqual([]);
    });
  });

  describe('OR rule', () => {
    it('applies a rule', () => {
      const actualByParam = new DisplayRules('domain.test/?param=test').filter([defaultBanner, oneConditionBanner, orConditionBanner]);
      expect(actualByParam).toEqual([oneConditionBanner, orConditionBanner]);

      const actualByDomain = new DisplayRules('https://my.localhost/?param=pam-param').filter([defaultBanner, oneConditionBanner, orConditionBanner]);
      expect(actualByDomain).toEqual([orConditionBanner]);
    });

    it('returns a default banner when no suitable ones', () => {
      const actual = new DisplayRules('domain.test').filter([defaultBanner, oneConditionBanner, orConditionBanner]);
      expect(actual).toEqual([defaultBanner]);
    });

    it('returns an empty array if no suitable and no default banners', () => {
      const actual = new DisplayRules('domain.test').filter([oneConditionBanner, orConditionBanner]);
      expect(actual).toEqual([]);
    });
  });

  describe('AND rule', () => {
    it('applies a rule', () => {
      const actualMatching = new DisplayRules('https://my.localhost.test/?param=test').filter([defaultBanner, orConditionBanner, andConditionBanner]);
      expect(actualMatching).toEqual([orConditionBanner, andConditionBanner]);

      const actualNonMatching = new DisplayRules('https://my.localhost.test?param=pam-param').filter([defaultBanner, orConditionBanner, andConditionBanner]);
      expect(actualNonMatching).toEqual([orConditionBanner]); // Note: it's expected that andConditionBanner doesn't match here
    });

    it('returns a default banner when no suitable ones', () => {
      const actual = new DisplayRules('domain.test').filter([defaultBanner, oneConditionBanner, orConditionBanner, andConditionBanner]);
      expect(actual).toEqual([defaultBanner]);
    });

    it('returns an empty array if no suitable and no default banners', () => {
      const actual = new DisplayRules('domain.test').filter([oneConditionBanner, orConditionBanner, andConditionBanner]);
      expect(actual).toEqual([]);
    });
  });

  describe('Recursive rule', () => {
    it('applies a rule', () => {
      const banners = [defaultBanner, oneConditionBanner, recursiveConditionBanner];

      const actualByParamOnly = new DisplayRules('https://my.localhost.test/?param=recursive1').filter(banners);
      expect(actualByParamOnly).toEqual([recursiveConditionBanner]);

      const actualByDomainAndParam = new DisplayRules('https://my.localhost.test?param=recursive2').filter(banners);
      expect(actualByDomainAndParam).toEqual([recursiveConditionBanner]);

      const actualNonMatching = new DisplayRules('domain.test?param=test').filter(banners);
      expect(actualNonMatching).toEqual([oneConditionBanner]); // Note: it's expected that recursiveConditionBanner doesn't match here
    });

    it('returns a default banner when no suitable ones', () => {
      const actual = new DisplayRules('domain.test?param=recursive1').filter([defaultBanner, oneConditionBanner, recursiveConditionBanner]);
      expect(actual).toEqual([defaultBanner]);
    });

    it('returns an empty array if no suitable and no default banners', () => {
      const actual = new DisplayRules('domain.test').filter([oneConditionBanner, recursiveConditionBanner]);
      expect(actual).toEqual([]);
    });
  });

  it('does not throw when empty array passed', () => {
    const actual = new DisplayRules('domain.test').filter([]);
    expect(actual).toEqual([]);
  });
});

