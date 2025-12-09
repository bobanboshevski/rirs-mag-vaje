const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
    testEnvironment: 'jest-environment-jsdom',

    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },

    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
        '^.+\\.jsx?$': 'babel-jest', // for JS modules
    },

    // transform: {
    //     '^.+\\.(ts|tsx|js|jsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
    // },
    transformIgnorePatterns: [
        '/node_modules/(?!(lucide-react)/)', // transform lucide-react
    ],
};

module.exports = createJestConfig(customJestConfig);