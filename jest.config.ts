module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  cacheDirectory: ".tmp/jestCache",
  testMatch: [
    "**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
  ],
  moduleNameMapper: {
    "@context/(.*)": "<rootDir>/src/context/$1",
    "@router/(.*)": "<rootDir>/src/router/$1",
    "@config/(.*)": "<rootDir>/src/config/$1",
    "@interface/(.*)": "<rootDir>/src/interface/$1",
    "@middlewares/(.*)": "<rootDir>/src/middlewares/$1",
    "@utils/(.*)": "<rootDir>/src/utils/$1",
  },
  transform: {
    ".spec.ts$": "ts-jest",
  },
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
  coverageReporters: ["json", "lcov", "text", "clover"],
};
