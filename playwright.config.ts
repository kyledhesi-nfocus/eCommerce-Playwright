import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import type { ProductOptions } from './fixtures/hooks-fixture';

dotenv.config({ path: 'my.env'});

export default defineConfig<ProductOptions>({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  reporter: 'allure-playwright',
  globalSetup: require.resolve('./global-setup'),
  use: {
    headless: false,
    baseURL: process.env.BASE_URL,
    storageState: 'storageState.json',
    trace: 'on-first-retry',
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name : 'teardown',
      testDir : './',
      testMatch : 'global-teardown.ts'
    },
    
    {
      name: 'Hoodie',
      use: { ...devices['Desktop Firefox'], product: 'Hoodie' },
      teardown : 'teardown'
    },

    {
      name: 'Cap',
      use: { ...devices['Desktop Chrome'], product: 'Cap' },
      teardown : 'teardown'
    },
  ],

});
