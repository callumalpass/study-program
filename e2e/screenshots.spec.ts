import { test } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOT_DIR = path.join(__dirname, '../docs/screenshots');

test.describe('Screenshots', () => {
  test.use({
    viewport: { width: 1280, height: 800 },
    colorScheme: 'light',
  });

  test('capture home page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500); // Let animations settle
    await page.screenshot({ path: `${SCREENSHOT_DIR}/home.png`, fullPage: false });
  });

  test('capture curriculum page', async ({ page }) => {
    await page.goto('/#/curriculum');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${SCREENSHOT_DIR}/curriculum.png`, fullPage: false });
  });

  test('capture progress page', async ({ page }) => {
    await page.goto('/#/progress');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${SCREENSHOT_DIR}/progress.png`, fullPage: false });
  });

  test('capture settings page', async ({ page }) => {
    await page.goto('/#/settings');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${SCREENSHOT_DIR}/settings.png`, fullPage: false });
  });

  test('capture subject page', async ({ page }) => {
    await page.goto('/#/subject/cs101');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${SCREENSHOT_DIR}/subject.png`, fullPage: false });
  });

  test('capture dark mode', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Set dark theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${SCREENSHOT_DIR}/home-dark.png`, fullPage: false });
  });

  test('capture reading material', async ({ page }) => {
    // Navigate to actual subtopic content (reading material)
    // Topic ID format is: {subjectId}-topic-{number}
    await page.goto('/#/subject/cs101/topic/cs101-topic-1/subtopic/introduction');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Wait for markdown/code highlighting to render
    await page.screenshot({ path: `${SCREENSHOT_DIR}/reading.png`, fullPage: true });
  });

  test('capture quiz page', async ({ page }) => {
    await page.goto('/#/subject/cs101/quiz/cs101-quiz-1');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Click "Start Quiz" to show actual quiz questions
    await page.click('button:has-text("Start Quiz")');
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${SCREENSHOT_DIR}/quiz.png`, fullPage: true });
  });

  test('capture exercise page', async ({ page }) => {
    await page.goto('/#/subject/cs101/exercise/cs101-exercise-1');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Wait for Monaco editor to load
    await page.screenshot({ path: `${SCREENSHOT_DIR}/exercise.png`, fullPage: true });
  });

  test('capture exam page', async ({ page }) => {
    await page.goto('/#/subject/cs101/exam/cs101-exam-midterm');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Click "Start Exam" to show actual exam questions
    await page.click('button:has-text("Start Exam")');
    await page.waitForTimeout(500);
    // Use viewport-only (not fullPage) since exams are very long
    await page.screenshot({ path: `${SCREENSHOT_DIR}/exam.png`, fullPage: false });
  });
});
