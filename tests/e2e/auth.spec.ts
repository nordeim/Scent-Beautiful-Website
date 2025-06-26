// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

const uniqueEmail = `testuser_${Date.now()}@example.com`

test.describe('Authentication Flow', () => {
  test('User can register for a new account', async ({ page }) => {
    await page.goto('/register')

    // Verify UI elements
    await expect(page.getByRole('heading', { name: 'Create an Account' })).toBeVisible()
    const createAccountTab = page.getByRole('tab', { name: 'Create Account' })
    await expect(createAccountTab).toHaveAttribute('data-state', 'active')

    // Fill out the registration form
    await page.getByLabel('First Name').fill('Test')
    await page.getByLabel('Last Name').fill('User')
    await page.getByLabel('Email').nth(1).fill(uniqueEmail) // Use nth(1) to distinguish from login email
    await page.getByLabel('Password').nth(1).fill('password123')
    await page.getByRole('button', { name: 'Create Account' }).click()

    // After successful registration, user should be on the login tab
    await expect(page.getByRole('tab', { name: 'Sign In' })).toHaveAttribute('data-state', 'active')
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible()
  });

  test('User can log in with newly created account', async ({ page }) => {
    // This test depends on the registration test having run, or a seeded user
    // For a standalone test, you would programmatically create a user first.
    await page.goto('/login')
    
    // Fill out the login form
    await page.getByLabel('Email').first().fill(uniqueEmail)
    await page.getByLabel('Password').first().fill('password123')
    await page.getByRole('button', { name: 'Sign In' }).click()

    // Verify successful login by checking for redirection
    // to a protected route like the account profile page.
    await expect(page).toHaveURL(/.*\/account\/profile/)
  });

  test('User sees an error for incorrect password', async ({ page }) => {
    await page.goto('/login')

    await page.getByLabel('Email').first().fill(uniqueEmail)
    await page.getByLabel('Password').first().fill('wrongpassword')
    await page.getByRole('button', { name: 'Sign In' }).click()

    // Verify error message is displayed
    await expect(page.getByText('Invalid email or password.')).toBeVisible()
  });
});
