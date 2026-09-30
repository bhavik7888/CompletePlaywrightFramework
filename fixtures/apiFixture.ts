import { APIRequestContext, request } from '@playwright/test';

/**
 * Custom dedicated API controller fixture separating UI sessions from headless endpoints
 */
export const createApiContext = async (): Promise<APIRequestContext> => {
  return await request.newContext({
    baseURL: 'https://saucedemo.com', // Explicit backend API tracking domain representation
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
};
