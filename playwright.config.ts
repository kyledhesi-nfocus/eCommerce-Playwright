import { defineConfig, devices } from '@playwright/test';
import type { ProductOptions } from './modules/product-options';
import dotenv from 'dotenv';

dotenv.config({ path: 'my.env'});

export default defineConfig<ProductOptions>({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'allure-playwright',
  retries: 2,
  use: {
    defaultBrowserType: 'chromium',
    launchOptions: {slowMo:100},
    headless: false,
    baseURL: process.env.BASE_URL,
    storageState: 'storageState.json',
    trace: 'on-first-retry',
  },
  /* Configure projects for different products */
  projects: [
    {
      name: 'setup',
      testDir: './',
      testMatch: 'global-setup.ts',
      teardown: 'teardown'
    },

    {
      name: 'teardown',
      testDir: './',
      testMatch: 'global-teardown.ts'
    },
    
    {
      name: 'Hoodie',
      use: { ...devices['Desktop Chrome'], product: 'Hoodie' },
      dependencies: ['setup']
    },

    {
      name: 'Cap',
      use: { ...devices['Desktop Chrome'], product: 'Cap' },
      dependencies: ['setup']
    },
  ],

});
