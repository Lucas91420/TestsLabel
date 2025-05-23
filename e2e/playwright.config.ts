import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',//'./e2e/tests',
  timeout: 30 * 1000,
  retries: 1,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10 * 1000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: [
    {
      command: 'yarn workspace node start',
      port: 3001,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'yarn workspace react-app start',
      port: 3000,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
