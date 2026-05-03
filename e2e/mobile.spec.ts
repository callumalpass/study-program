import { expect, test, type Page } from '@playwright/test';

const MOBILE_VIEWPORTS = [
  { name: 'small phone', width: 375, height: 812 },
  { name: 'large phone', width: 430, height: 932 },
];

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'curriculum', path: '/#/curriculum' },
  { name: 'study session', path: '/#/study-session' },
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
        await expect(nav.getByRole('link', { name: /study/i })).toBeVisible();
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

      test('subject menu expands over content', async ({ page }) => {
        await page.goto('/#/subject/cs304/topic/cs304-topic-1/subtopic/introduction-compilers');
        await waitForApp(page);

        const subjectMenu = page.locator('.content-navigator .mobile-menu-toggle');
        await subjectMenu.click();

        const panel = page.locator('#subject-mobile-nav-panel');
        await expect(subjectMenu).toHaveAttribute('aria-expanded', 'true');
        await expect(panel).toBeVisible();
        await expect(panel.getByRole('tab', { name: /topics/i })).toBeVisible();
        await expect(panel.getByRole('tab', { name: /practice/i })).toBeVisible();

        const panelBox = await panel.boundingBox();
        const viewport = page.viewportSize();
        expect(panelBox).not.toBeNull();
        expect(viewport).not.toBeNull();
        expect(panelBox!.width).toBeGreaterThan(250);
        expect(panelBox!.x).toBeGreaterThanOrEqual(0);
        expect(panelBox!.x + panelBox!.width).toBeLessThanOrEqual(viewport!.width + 1);
      });

      test('subject menu stays open after choosing a topic', async ({ page }) => {
        await page.goto('/#/subject/cs304/topic/cs304-topic-1/subtopic/introduction-compilers');
        await waitForApp(page);

        const subjectMenu = page.locator('.content-navigator .mobile-menu-toggle');
        await subjectMenu.click();

        const panel = page.locator('#subject-mobile-nav-panel');
        await expect(panel).toBeVisible();

        await panel.getByRole('button', { name: /parsing/i }).click();

        await expect(subjectMenu).toHaveAttribute('aria-expanded', 'true');
        await expect(panel).toBeVisible();
        await expect(panel.getByRole('tab', { name: /topics/i })).toBeVisible();
        await expect(panel.getByRole('tab', { name: /practice/i })).toBeVisible();
        await expect(panel).toContainText('Parsing');
      });

      test('mobile chrome hides on scroll down and returns on scroll up', async ({ page }) => {
        await page.goto('/#/subject/cs304/topic/cs304-topic-1/subtopic/introduction-compilers');
        await waitForApp(page);

        const header = page.locator('#mobile-header');
        const bottomNav = page.locator('#mobile-bottom-nav');
        const subjectMenu = page.locator('.content-navigator .content-sidebar');
        const pagination = page.locator('.content-navigator .content-pagination');

        await expect(header).toBeVisible();
        await expect(bottomNav).toBeVisible();
        await expect(subjectMenu).toBeVisible();
        await expect(pagination).toBeVisible();

        await page.evaluate(() => window.scrollTo(0, 600));
        await expect(page.locator('body')).toHaveClass(/mobile-chrome-hidden/);

        await expect.poll(async () => page.evaluate(() => {
          const viewportHeight = window.innerHeight;
          const selectors = [
            '#mobile-header',
            '#mobile-bottom-nav',
            '.content-navigator .content-sidebar',
            '.content-navigator .content-pagination',
          ];
          return selectors.every((selector) => {
            const rect = document.querySelector<HTMLElement>(selector)?.getBoundingClientRect();
            return rect && (rect.bottom < 1 || rect.top > viewportHeight - 1);
          });
        })).toBe(true);

        await page.evaluate(() => window.scrollTo(0, 120));
        await expect(page.locator('body')).not.toHaveClass(/mobile-chrome-hidden/);
      });

      test('visible button text stays inside button bounds', async ({ page }) => {
        const routesToScan = [
          '/',
          '/#/subject/cs304',
          '/#/subject/cs304/topic/cs304-topic-1/subtopic/introduction-compilers',
          '/#/subject/cs304/exercise/cs304-t1-ex01',
          '/#/settings',
        ];

        for (const route of routesToScan) {
          await page.goto(route);
          await waitForApp(page);
          await page.waitForTimeout(300);

          const overflowing = await page.evaluate(() => {
            const candidates = Array.from(document.querySelectorAll<HTMLElement>('button, .btn, a.btn, .pagination-link, .mobile-bottom-nav-link'));
            return candidates
              .filter((el) => {
                const style = window.getComputedStyle(el);
                const rect = el.getBoundingClientRect();
                return rect.width > 0
                  && rect.height > 0
                  && style.display !== 'none'
                  && style.visibility !== 'hidden'
                  && el.offsetParent !== null;
              })
              .map((el) => {
                const rect = el.getBoundingClientRect();
                return {
                  text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80),
                  className: el.className,
                  deltaX: el.scrollWidth - Math.ceil(rect.width),
                  deltaY: el.scrollHeight - Math.ceil(rect.height),
                };
              })
              .filter((item) => item.deltaX > 1 || item.deltaY > 2);
          });

          expect(overflowing, `${route} has overflowing controls`).toEqual([]);
        }
      });
    });
  }
});
