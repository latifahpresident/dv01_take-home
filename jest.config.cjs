/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'jsdom',

  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    // stub out your CSV→url imports
    '\\.csv\\?url$': '<rootDir>/src/tests/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup-tests.ts'],

  transform: {
    // Handle TS and JS (including your ESM .js files) via ts-jest, with ESM support
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};
