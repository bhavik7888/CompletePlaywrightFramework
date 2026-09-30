export interface EnvironmentConfig {
  baseUrl: string;
  timeout: number;
}

const envs: Record<string, EnvironmentConfig> = {
  local: { baseUrl: 'https://saucedemo.com', timeout: 30000 },
  staging: { baseUrl: 'https://saucedemo.com', timeout: 45000 },
  prod: { baseUrl: 'https://saucedemo.com', timeout: 60000 }
};

// Graceful fallback to 'local' if process.env.ENV remains undefined
export const Config = envs[process.env.ENV || 'local'] || envs.local;
