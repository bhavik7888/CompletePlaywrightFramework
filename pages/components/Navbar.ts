import { Page, Locator } from '@playwright/test';
import { WebActions } from '../../helpers/webActions';

export class Navbar {
  private readonly actions: WebActions;
  public readonly shoppingCart: Locator;
  public readonly menuButton: Locator;

  constructor(private readonly page: Page) {
    this.actions = new WebActions(page);
    this.shoppingCart = page.locator('[data-test="shopping-cart-link"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
  }

  async openCart(): Promise<void> {
    await this.actions.safelyClick(this.shoppingCart, 'Navbar Shopping Cart icon');
  }
}
