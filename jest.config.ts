export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Soporte para rutas alias
  },
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
};
