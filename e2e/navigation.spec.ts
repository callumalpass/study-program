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
    await page.click('.sidebar-nav a[href="#/curriculum"]');

    // Verify URL changed
    await expect(page).toHaveURL(/#\/curriculum$/);

    // Verify curriculum content is displayed
    await expect(page.locator('#main-content')).toContainText(/curriculum/i);
  });

  test('navigates to progress page', async ({ page }) => {
    await page.goto('/');

    // Click on the Progress link
    await page.click('.sidebar-nav a[href="#/progress"]');

    // Verify URL changed
    await expect(page).toHaveURL(/#\/progress$/);
  });

  test('navigates to settings page', async ({ page }) => {
    await page.goto('/');

    // Click on the Settings link
    await page.click('.sidebar-nav a[href="#/settings"]');

    // Verify URL changed
    await expect(page).toHaveURL(/#\/settings$/);
  });

  test('starts a study session from the dashboard', async ({ page }) => {
    await page.goto('/');

    await page.click('#start-study-session-action');

    await expect(page).toHaveURL(/#\/study-session$/);
    await expect(page.locator('#main-content')).toContainText('Study Session');
    await expect(page.locator('#main-content')).toContainText('Queue');
    await expect(page.locator('#main-content').getByRole('link', { name: /continue/i })).toBeVisible();

    const firstQueueItem = page.locator('.study-session-queue .study-session-queue-link').first();
    await expect(firstQueueItem).toBeVisible();
    await expect(firstQueueItem).toHaveAttribute('href', /#\/subject\//);

    await firstQueueItem.click();
    await expect(page).toHaveURL(/#\/subject\//);
  });

  test('starts a study session from the shared app dock', async ({ page }) => {
    await page.goto('/#/curriculum');
    await expect(page.locator('#main-content')).toContainText(/curriculum/i, { timeout: 15000 });

    const sessionDock = page.locator('#study-session-access .study-session-access');
    await expect(sessionDock).toBeVisible({ timeout: 15000 });
    await expect(sessionDock).toContainText('Start a guided queue');

    await page.click('#global-start-study-session');

    await expect(page).toHaveURL(/#\/study-session$/);
    await expect(page.locator('#study-session-access')).toBeEmpty();
    await expect(page.locator('#main-content')).toContainText('Study Session');
  });

  test('updates the shared study session dock after completing the current item', async ({ page }) => {
    await page.goto('/');
    await page.click('#start-study-session-action');

    const currentItemLink = page.locator('.study-session-current-cta');
    await expect(currentItemLink).toBeVisible({ timeout: 15000 });
    await currentItemLink.click();

    const dock = page.locator('#study-session-access .study-session-access');
    await expect(dock).toContainText('Read: Introduction', { timeout: 15000 });

    await page.getByRole('button', { name: /complete section/i }).click();

    await expect(dock).not.toContainText('Read: Introduction', { timeout: 15000 });
    await expect(dock).toContainText('Start a guided queue');
  });

  test('can navigate back to home', async ({ page }) => {
    await page.goto('/#/settings');

    // Click on the sidebar logo link (visible on desktop)
    await page.click('.sidebar-logo');

    // Verify we're back at home
    await expect(page).toHaveURL(/\/#\/$/);
  });
});
