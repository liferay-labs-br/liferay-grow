const { name } = require('./package.json');
const baseConfig = require('../../jest.config');
const { join } = require('path');

delete baseConfig.projects;
delete baseConfig.testEnvironment;

module.exports = {
  ...baseConfig,
  displayName: name,
  name,
  transform: {
    '^.+\\.(js|ts|tsx)?$': join(__dirname, 'babel-transform.js'),
  },
  setupFilesAfterEnv: [`${join(__dirname)}/jest.setup.js`],
  testPathIgnorePatterns: [
    `${join(__dirname, '/.next/')}`,
    `${join(__dirname, '/node_modules/')}`,
  ],
  testMatch: [join(__dirname, `__tests__/**/*.spec.{ts,tsx}`)],
};
