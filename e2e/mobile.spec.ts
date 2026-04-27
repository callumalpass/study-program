import { expect, test, type Page } from '@playwright/test';

const MOBILE_VIEWPORTS = [
  { name: 'small phone', width: 375, height: 812 },
  { name: 'large phone', width: 430, height: 932 },
];

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'curriculum', path: '/#/curriculum' },
  { name: 'subject', path: '/#/subject/cs304' },
  { name: 'reading', path: '/#/subject/cs304/topic/cs304-topic-1/subtopic/introduction-compilers' },
  { name: 'quiz', path: '/#/subject/cs304/quiz/cs304-t1-quiz-1' },
  { name: 'exercise', path: '/#/subject/cs304/exercise/cs304-t1-ex01' },
  { name: 'progress', path: '/#/progress' },
  { name: 'settings', path: '/#/settings' },
];

async function waitForApp(page: Page) {
  await page.waitForLoadState('networkidle');
  await expect(page.locator('#main-content')).not.toBeEmpty();
}

test.describe('mobile layout', () => {
  for (const viewport of MOBILE_VIEWPORTS) {
    test.describe(viewport.name, () => {
      test.use({ viewport });

      for (const route of ROUTES) {
        test(`does not horizontally overflow on ${route.name}`, async ({ page }) => {
          await page.goto(route.path);
          await waitForApp(page);

          if (route.name === 'quiz') {
            await page.getByRole('button', { name: /start quiz/i }).click();
          }

          await page.waitForTimeout(300);
          const overflow = await page.evaluate(() => {
            const root = document.documentElement;
            return root.scrollWidth - root.clientWidth;
          });

          expect(overflow).toBeLessThanOrEqual(1);
        });
      }

      test('bottom navigation exposes core routes and highlights active route', async ({ page }) => {
        await page.goto('/#/progress');
        await waitForApp(page);

        const nav = page.getByRole('navigation', { name: 'Primary mobile navigation' });
        await expect(nav).toBeVisible();
        await expect(nav.getByRole('link', { name: /home/i })).toBeVisible();
        await expect(nav.getByRole('link', { name: /learn/i })).toBeVisible();
        await expect(nav.getByRole('link', { name: /progress/i })).toHaveAttribute('aria-current', 'page');
        await expect(nav.getByRole('link', { name: /settings/i })).toBeVisible();
      });

      test('app drawer opens, traps focus, and closes after navigation', async ({ page }) => {
        await page.goto('/');
        await waitForApp(page);

        const menuButton = page.getByRole('button', { name: /toggle navigation menu/i });
        await menuButton.click();
        await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
        await expect(page.locator('#sidebar')).toHaveClass(/open/);

        await page.keyboard.press('Tab');
        await expect(page.locator('#sidebar')).toContainText('Curriculum');

        await page.getByRole('link', { name: /curriculum/i }).first().click();
        await expect(page.locator('#sidebar')).not.toHaveClass(/open/);
        await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      });
    });
  }
});
