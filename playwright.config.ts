import { defineConfig, devices } from '@playwright/test';

const webPort = 4200;

export default defineConfig({
  testDir: './e2e',
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 1 : 0,
  reporter: process.env['CI'] ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${String(webPort)}`,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `npm run start -w web -- --port ${String(webPort)}`,
    url: `http://localhost:${String(webPort)}`,
    reuseExistingServer: !process.env['CI'],
    timeout: 120_000,
  },
});
