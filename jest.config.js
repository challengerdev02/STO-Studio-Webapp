// jest.config.js
// const nextJest = require("next/jest");
//
// const createJestConfig = nextJest({
//   // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
//   dir: "./",
// });
//
// // Add any custom config to be passed to Jest
// const customJestConfig = {
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
//   testEnvironment: 'jest-environment-jsdom',
//   moduleNameMapper: {
//     "\\.(css|scss|sass|less)$": "identity-obj-proxy",
//     // "src/(.*)": "<rootDir>/src/$1",
//     "@/actions": "<rootDir>/src/redux/actions/index.ts",
//     "@/middlewares": "<rootDir>/src/redux/middlewares/index.ts",
//     "@/reducers": "<rootDir>/src/redux/reducers/index.ts",
//     "@/selectors": "<rootDir>/src/selectors/index.ts",
//     "@/hooks": "<rootDir>/src/hooks/index.ts",
//     "@/context": "<rootDir>/src/context/index.ts",
//     "@/components": "<rootDir>/src/components/index.ts",
//     "@/shared/(.*)": "<rootDir>/src/_shared/$1",
//     "@/components/(.*)": "<rootDir>/src/_components/$1",
//   },
// };
//
// // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// module.exports = createJestConfig(customJestConfig);

module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/*.stories.tsx',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/stories/**',
    '!**/.storybook/**',
    '!**/public/**',
  ],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.ts',

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': `<rootDir>/__mocks__/fileMock.js`,

    // Handle module aliases
    '@/actions': '<rootDir>/src/redux/actions/index.ts',
    '@/middlewares': '<rootDir>/src/redux/middlewares/index.ts',
    '@/reducers': '<rootDir>/src/redux/reducers/index.ts',
    '@/selectors': '<rootDir>/src/selectors/index.ts',
    '@/hooks': '<rootDir>/src/hooks/index.ts',
    '@/context': '<rootDir>/src/context/index.ts',
    '@/components': '<rootDir>/src/components/index.ts',
    '@/shared/(.*)': '<rootDir>/src/_shared/$1',
    '@/components/(.*)$': '<rootDir>/src/_components/$1',
    '@/web3/(.*)$': '<rootDir>/src/web3/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jsdom',
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};
