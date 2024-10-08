import { expect, test } from '@playwright/test';

test('about page exists', async ({ page }) => {
    await page.goto(`/about`);
    await expect(page.getByRole('heading', { name: 'Queen of the dragons?' })).toBeVisible();
});