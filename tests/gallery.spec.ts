import { expect, test } from '@playwright/test';

test('clicking on dragon loads detail page', async ({ page }) => {
    await page.goto(`/gallery`);
    await page.getByRole('link', { name: 'TestDrogon' }).first().click();

    await page.waitForURL('**/dragon/**');

    await expect(page.getByRole('img', { name: 'TestDrogon' })).toBeVisible();
});