import { expect, test } from '@playwright/test';
import { testDragon } from './global.setup';

test('clicking generate generates dragon with valid data', async ({ page }) => {
    await page.goto(`/create`);
    await page.getByRole('button', { name: 'Generate' }).click();

    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Color is required', { exact: true })).toBeVisible();
    await expect(page.getByText('Eye Color is required', { exact: true })).toBeVisible();

    await page.getByLabel('Name:').fill(testDragon.name);
    await page.getByLabel('Color:', { exact: true }).fill('Green');
    await page.getByLabel('Eye Color:', { exact: true }).fill('Yellow');
    await page.getByRole('button', { name: 'Generate' }).click();

    await expect(page.getByRole('img', { name: 'dragon' })).toBeVisible();
});