import { test, expect } from '@playwright/test';

test.describe('Sidebar', () => {
  test('sidebar toggle works', async ({ page }) => {
    await page.goto('/');

    const appContainer = page.locator('#app');
    const toggleBtn = page.locator('#sidebar-toggle');

    // Initially sidebar should not be collapsed
    await expect(appContainer).not.toHaveClass(/sidebar-collapsed/);

    // Click toggle to collapse
    await toggleBtn.click();
    await expect(appContainer).toHaveClass(/sidebar-collapsed/);

    // Click toggle again to expand
    await toggleBtn.click();
    await expect(appContainer).not.toHaveClass(/sidebar-collapsed/);
  });

  test('sidebar contains navigation links', async ({ page }) => {
    await page.goto('/');

    const sidebar = page.locator('#sidebar');

    // Check for main navigation links (use .first() where there may be multiple matches)
    await expect(sidebar.locator('.sidebar-logo')).toBeVisible();
    await expect(sidebar.locator('a[href="#/curriculum"]')).toBeVisible();
    await expect(sidebar.locator('a[href="#/progress"]')).toBeVisible();
    await expect(sidebar.locator('a[href="#/settings"]')).toBeVisible();
  });

  test('sidebar persists collapsed state', async ({ page }) => {
    await page.goto('/');

    const appContainer = page.locator('#app');
    const toggleBtn = page.locator('#sidebar-toggle');

    // Collapse sidebar
    await toggleBtn.click();
    await expect(appContainer).toHaveClass(/sidebar-collapsed/);

    // Reload page
    await page.reload();

    // Sidebar should still be collapsed
    await expect(appContainer).toHaveClass(/sidebar-collapsed/);
  });
});
