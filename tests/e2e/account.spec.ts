// tests/e2e/account.spec.ts
import { test, expect } from '@playwright/test'

test.describe('User Account Flow', () => {
  test('unauthenticated user is redirected from account page to login', async ({ page }) => {
    await page.goto('/account/profile')
    // Should be redirected to the login page by the middleware
    await expect(page).toHaveURL(/.*\/login/)
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible()
  })

  test.describe('Authenticated User', () => {
    // Log in once for all tests in this block
    test.beforeEach(async ({ page }) => {
      await page.goto('/login')
      await page.getByLabel('Email').first().fill('test@thescent.com')
      await page.getByLabel('Password').first().fill('StrongPass123!')
      await page.getByRole('button', { name: 'Sign In' }).click()
      await expect(page).toHaveURL(/.*\/account\/profile/)
    })

    test('can view their profile information', async ({ page }) => {
      await page.goto('/account/profile')
      await expect(page.getByRole('heading', { name: 'My Profile' })).toBeVisible()
      await expect(page.getByText('Test User')).toBeVisible()
      await expect(page.getByText('test@thescent.com')).toBeVisible()
    })

    test('can view their order history', async ({ page }) => {
      await page.goto('/account/orders')
      await expect(page.getByRole('heading', { name: 'Order History' })).toBeVisible()
      // In a real scenario with orders, you would assert that order items are visible.
      // For now, we check that the "no orders" message appears correctly.
      await expect(page.getByText("You haven't placed any orders yet.")).toBeVisible()
    })
    
    test('can sign out successfully', async ({ page }) => {
      await page.goto('/account/profile')
      await page.getByRole('button', { name: 'Sign Out' }).click()

      // Should be redirected to the homepage
      await expect(page).toHaveURL('/')
      
      // Verify that the account page is no longer accessible
      await page.goto('/account/profile')
      await expect(page).toHaveURL(/.*\/login/)
    })
  })
})
