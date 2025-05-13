import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
    },
});
// This configuration file is for Vitest, a test runner for JavaScript and TypeScript.
// It defines the test environment as Node.js and enables global variables for tests.