/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  clearMocks: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/_setup/utils.ts'
  ],
  coverageProvider: 'v8',
  coverageReporters: [
    'text',
  ],
  globals: {
    __ADJUST_SB__NAMESPACE: 'adjust-sdk',
    __ADJUST_SB__SDK_VERSION: 'TEST',
    _DEV_MODE_: true,
    _DEV_ENDPOINT_: ''
  },
  moduleNameMapper: {
    '.(css|scss)$': '<rootDir>/_mocks/style.ts',
    '@sdk/(.*)$': '<rootDir>/../sdk/src/$1',
    '@utils/(.*)$': '<rootDir>/../sdk/src/utils/$1',
    '@layout': '<rootDir>/../layout/dist/adj-sb-layout.js',
  },
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          esModuleInterop: true,
        },
        diagnostics: {
          ignoreCodes: ['2307']
        },
      },
    ],
  },
  setupFiles: [
    'jest-localstorage-mock',
    '<rootDir>/_setup/utils.ts'
  ],
  setupFilesAfterEnv: ['jest-extended/all'],
  testEnvironment: 'jsdom',
  testMatch: [
    '**/?(*.)+(spec|test).{js,ts}'
  ],
};

export default config;
