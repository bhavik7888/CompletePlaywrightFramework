export interface InventoryMatrix {
  productSlug: string;
  expectedName: string;
}

// Data-Driven test cases arrays matching TypeScript interface contracts
export const InventoryTestDataset: InventoryMatrix[] = [
  { productSlug: 'sauce-labs-backpack', expectedName: 'Sauce Labs Backpack' },
  { productSlug: 'sauce-labs-bike-light', expectedName: 'Sauce Labs Bike Light' }//,
  //{ productSlug: 'sauce-labs-bolt-t-shirt', expectedName: 'Sauce Labs Bolt T-Shirt' }
];
