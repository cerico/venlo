import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:2960/',
    timeout: 120 * 1000,
    reuseExistingServer: true
  },
  use: {
    baseURL: 'http://localhost:2960/',
  },
});
