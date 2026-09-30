import { Page, Locator, expect } from '@playwright/test';
import { WebActions } from '../helpers/webActions';

export class LoginPage {
  private readonly actions: WebActions;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(private readonly page: Page) {
    this.actions = new WebActions(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  async login(user: string, pass: string): Promise<void> {
    await this.actions.safelyFill(this.usernameInput, user, 'Username Input Box');
    await this.actions.safelyFill(this.passwordInput, pass, 'Password Input Box');
    await this.actions.safelyClick(this.loginButton, 'Submit Login Button');
  }
}
