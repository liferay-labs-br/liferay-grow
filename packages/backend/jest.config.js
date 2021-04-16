const { name } = require('./package.json');
const { join } = require('path');

module.exports = {
  preset: 'ts-jest',
  displayName: name,
  modulePaths: ['src'],
  name,
  collectCoverage: true,
  testPathIgnorePatterns: [
    `${join(__dirname, '/.dist/')}`,
    `${join(__dirname, '/node_modules/')}`,
  ],
  collectCoverageFrom: ['src/**/*.ts'],
  testMatch: [join(__dirname, `__tests__/**/*.spec.ts`)],
};
