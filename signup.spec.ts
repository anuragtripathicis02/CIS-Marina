import { test, expect } from '@playwright/test';

test('Signup Flow E2E Test', async ({ page }) => {
  // Navigate to the registration page
  await page.goto('http://localhost:3005/auth/register');

  // Verify the page loaded correctly
  await expect(page.getByRole('heading', { name: 'Create Owner Account' })).toBeVisible();

  // Fill in the form fields
  // Using placeholders or exact labels to locate fields
  await page.getByPlaceholder('Alexander').fill('Test');
  await page.getByPlaceholder('Vanderbilt').fill('User');
  await page.getByPlaceholder('alex@monacoyachts.com').fill(`testuser_${Date.now()}@example.com`);
  await page.getByPlaceholder('••••••••').fill('StrongPassword123!');

  // Submit the form
  await page.getByRole('button', { name: 'Continue to Organization Setup →' }).click();

  // Wait for navigation or success state
  // Based on the code, successful registration redirects to /auth/onboarding
  await expect(page).toHaveURL('http://localhost:3005/auth/onboarding', { timeout: 10000 });
  
  console.log('Signup test completed successfully!');
});
