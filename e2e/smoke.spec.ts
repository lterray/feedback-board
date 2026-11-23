import { expect, test } from '@playwright/test';

// Replace with a real flow once the idea list exists; this only proves the app boots in a browser.
test('the web app loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
