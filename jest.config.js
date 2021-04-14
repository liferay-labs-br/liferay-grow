module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/packages/frontend/src/**/*.{ts,tsx}'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  preset: 'ts-jest',
  projects: ['<rootDir>/packages/**/jest.config.js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  verbose: true,
};
