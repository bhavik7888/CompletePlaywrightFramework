import { defineConfig, devices } from '@playwright/test';
import { Config } from './config/environment';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  testIgnore: process.env.CI ? '**/visualRegression.spec.ts' : undefined,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  //reporter: [['html', { open: 'never' }], ['list']],
  /* Advanced Reporting Pipeline */
  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright', { detail: true, outputFolder: 'allure-results' }]
  ],
  timeout: Config.timeout,
  /* Visual Regression Global Calibration */
  expect: {
    timeout: 5000,
    toHaveScreenshot: {
      maxDiffPixels: 20,         // Strict pixel variance allowance
      threshold: 0.2,            // Color comparison sensitivity matrix
    },
  },

  use: {
    baseURL: Config.baseUrl, //baseURL: process.env.SAUCE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    ignoreHTTPSErrors: true,
  },
  projects: [
    // --- AUTHENTICATION PRE-COMPILATION SEED TRACKS ---
    {
      name: 'setup_standard',
      testMatch: /standard\.setup\.ts/,
    },
    {
      name: 'setup_problem',
      testMatch: /problem\.setup\.ts/,
    },

    // --- FULL CHROMIUM RUNNERS MATRIX ---
    {
      name: 'chromium_standard_user',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/standard_user.json',
        /* Network Throttling Simulation (Simulate 3G/4G Lag) */
        contextOptions: {
          offline: false,
        },
      },
      dependencies: ['setup_standard'],
    },
    {
      name: 'chromium_problem_user',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/problem_user.json',
      },
      dependencies: ['setup_problem'],
    },
    /*
    // --- CROSS-BROWSER INTEROPERABILITY LAYER ---
    {
      name: 'firefox_regression',
      use: { 
        ...devices['Desktop Firefox'],
        storageState: '.auth/standard_user.json'
      },
      dependencies: ['setup_standard'],
    },
    {
      name: 'webkit_mobile',
      use: { 
        ...devices['iPhone 14 Pro Max'],
        storageState: '.auth/standard_user.json'
      },
      dependencies: ['setup_standard'],
    }
    */
  ],
});
