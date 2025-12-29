import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('loads the home page', async ({ page }) => {
    await page.goto('/');

    // Check the title
    await expect(page).toHaveTitle('stu.p');

    // Check that the main content area is visible
    await expect(page.locator('#main-content')).toBeVisible();

    // Check that the sidebar is present
    await expect(page.locator('#sidebar')).toBeVisible();
  });

  test('navigates to curriculum page', async ({ page }) => {
    await page.goto('/');

    // Click on the Curriculum link in the sidebar
    await page.click('a[href="#/curriculum"]');

    // Verify URL changed
    await expect(page).toHaveURL(/#\/curriculum$/);

    // Verify curriculum content is displayed
    await expect(page.locator('#main-content')).toContainText(/curriculum/i);
  });

  test('navigates to progress page', async ({ page }) => {
    await page.goto('/');

    // Click on the Progress link
    await page.click('a[href="#/progress"]');

    // Verify URL changed
    await expect(page).toHaveURL(/#\/progress$/);
  });

  test('navigates to settings page', async ({ page }) => {
    await page.goto('/');

    // Click on the Settings link
    await page.click('a[href="#/settings"]');

    // Verify URL changed
    await expect(page).toHaveURL(/#\/settings$/);
  });

  test('can navigate back to home', async ({ page }) => {
    await page.goto('/#/settings');

    // Click on the sidebar logo link (visible on desktop)
    await page.click('.sidebar-logo');

    // Verify we're back at home
    await expect(page).toHaveURL(/\/#\/$/);
  });
});
