import { test, expect } from '@playwright/test';

test.describe('Theme', () => {
  test('settings page has theme controls', async ({ page }) => {
    await page.goto('/#/settings');

    // Check that settings page loaded
    await expect(page.locator('#main-content')).toContainText(/settings/i);

    // Check for theme-related content
    await expect(page.locator('#main-content')).toContainText(/theme/i);
  });

  test('can switch to dark theme', async ({ page }) => {
    await page.goto('/#/settings');

    // Find and click dark theme option
    const darkThemeBtn = page.locator('button:has-text("Dark"), input[value="dark"]').first();
    if (await darkThemeBtn.isVisible()) {
      await darkThemeBtn.click();

      // Verify theme attribute changed
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    }
  });

  test('can switch to light theme', async ({ page }) => {
    await page.goto('/#/settings');

    // Find and click light theme option
    const lightThemeBtn = page.locator('button:has-text("Light"), input[value="light"]').first();
    if (await lightThemeBtn.isVisible()) {
      await lightThemeBtn.click();

      // Verify theme attribute changed
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    }
  });
});
