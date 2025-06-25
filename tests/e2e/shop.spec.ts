// tests/e2e/shop.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Shopping Flow', () => {
  test('User can navigate from PLP to PDP', async ({ page }) => {
    // Navigate to the Product Listing Page (PLP)
    await page.goto('/products')

    // Verify the page title is correct
    await expect(page).toHaveTitle(/All Products/)
    const heading = page.getByRole('heading', { name: 'Our Collection' })
    await expect(heading).toBeVisible()

    // Find the first product card and get its name
    const firstProductCard = page.locator('a.group').first()
    await expect(firstProductCard).toBeVisible()
    const productName = await firstProductCard.getByRole('heading').textContent()
    expect(productName).not.toBeNull()

    // Click the first product card to navigate to the Product Detail Page (PDP)
    await firstProductCard.click()

    // Verify the URL has changed to the product's slug
    await expect(page).toHaveURL(/\/products\//)

    // Verify the PDP shows the correct product name in its heading
    const pdpHeading = page.getByRole('heading', { name: productName! })
    await expect(pdpHeading).toBeVisible()

    // Verify the page title now reflects the product name
    await expect(page).toHaveTitle(new RegExp(productName!))
  })
})
