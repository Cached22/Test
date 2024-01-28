module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: [
    '**/tests/backend/**/*.test.js',
    '**/tests/frontend/**/*.test.js'
  ],
  moduleNameMapper: {
    '^@backend/(.*)$': '<rootDir>/backend/$1',
    '^@frontend/(.*)$': '<rootDir>/frontend/src/$1',
    '^@utilities/(.*)$': '<rootDir>/frontend/src/utilities/$1',
    '^@redux/(.*)$': '<rootDir>/frontend/src/redux/$1',
    '^@components/(.*)$': '<rootDir>/frontend/src/components/$1',
    '^@styles/(.*)$': '<rootDir>/frontend/src/styles/$1'
  },
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'backend/**/*.js',
    'frontend/src/**/*.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  coverageReporters: ['text', 'lcov', 'json', 'clover'],
  testPathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: ['/node_modules/'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  }
};