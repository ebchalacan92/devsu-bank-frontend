const fs = require('fs');
const JSON5 = require('json5');

let compilerOptions = {};
try {
  const tsconfig = JSON5.parse(fs.readFileSync('./tsconfig.json', 'utf8'));
  compilerOptions = tsconfig.compilerOptions || {};
} catch (e) {
  console.warn('⚠️ No se pudo leer tsconfig.json');
}

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|mjs)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(rxjs|@angular|@ngrx|tslib)/)'
  ],
  moduleFileExtensions: ['ts', 'js', 'html', 'json', 'mjs'],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/app/**/*.ts', '!src/**/*.spec.ts'],
  coverageReporters: ['html', 'text-summary']
};
