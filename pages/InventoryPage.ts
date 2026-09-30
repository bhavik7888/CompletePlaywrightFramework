import { Page, Locator, expect } from '@playwright/test';
import { Navbar } from './components/Navbar';
import { WebActions } from '../helpers/webActions';

export class InventoryPage {
  private readonly actions: WebActions;
  public readonly nav: Navbar;
  private readonly titleHeader: Locator;
  private readonly itemPriceLabels: Locator;

  constructor(private readonly page: Page) {
    this.actions = new WebActions(page);
    this.nav = new Navbar(page);
    this.titleHeader = page.locator('[data-test="title"]');
    this.itemPriceLabels = page.locator('[data-test="inventory-item-price"]');
  }

  async verifyPageHeader(): Promise<void> {
    await expect(this.titleHeader).toBeVisible();
    await expect(this.titleHeader).toHaveText('Products');
  }

  async addProductToCart(productNameSlug: string): Promise<void> {
    const targetSelector = this.page.locator(`[data-test="add-to-cart-${productNameSlug}"]`);
    await this.actions.safelyClick(targetSelector, `Add to cart button for: ${productNameSlug}`);
  }

  async getAllProductPrices(): Promise<number[]> {
    const texts = await this.itemPriceLabels.allTextContents();
    return texts.map(price => parseFloat(price.replace('\$', '')));
  }
}
