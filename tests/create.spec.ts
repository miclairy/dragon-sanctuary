import { expect, test } from '@playwright/test';
import { testDragon } from './global.setup';
import { endMessages } from '@/app/create/ui/Loading';

test('happy flow generate dragon', async ({ page }) => {
    await page.goto('/create');
    await expect(await page.getByRole('heading', { name: 'Q1:' })).toBeVisible();
    await page.getByRole('button', { name: 'keep exploring -->' }).click();
    await expect(await page.getByRole('heading', { name: 'Q2:' })).toBeVisible();
    await page.getByRole('option', { name: 'Explore the dark Forest' }).click();
    await page.getByRole('button', { name: 'keep exploring -->' }).click();
    await expect(await page.getByRole('heading', { name: 'Q3:' })).toBeVisible();
    await page.getByLabel('You creep into the forest and').fill('green');
    await page.getByRole('button', { name: 'keep exploring -->' }).click();
    await page.getByLabel('There is something').fill('blue');
    await page.getByRole('button', { name: 'keep exploring -->' }).click();
    await page.getByRole('option', { name: 'Coatyl' }).click();
    await page.getByRole('button', { name: 'keep exploring -->' }).click();
    await page.getByRole('option', { name: 'spinning tail' }).click();
    await page.getByRole('button', { name: 'keep exploring -->' }).click();
    await page.getByLabel('They turn to you curiously.').fill('4');
    await page.getByRole('button', { name: 'keep exploring -->' }).click();
    await page.getByRole('option', { name: 'kind and wise' }).click();
    await page.getByRole('button', { name: 'keep exploring -->' }).click();
    await page.getByRole('option', { name: 'Wet and gasping for air' }).click();
    await page.getByRole('button', { name: 'keep exploring -->' }).click();
    await page.getByLabel("You haven't been eaten or").fill(testDragon.name);
    await page.getByRole('button', { name: 'keep exploring -->' }).click();
    await expect(await page.getByText(endMessages[0])).toBeVisible();
    const image = page.getByRole('img', { name: 'the dragon you found' });
    const loader = page.getByText(endMessages[1]);
    await expect(image.or(loader)).toBeVisible();
});

test('invalid data flow generate dragon', async ({ page }) => {
    await page.goto('/create');
    await page.getByRole('button', { name: 'keep exploring -->' }).click();
    await expect(await page.getByRole('heading', { name: 'Q2:' })).toBeVisible();
    await page.getByRole('button', { name: 'keep exploring -->' }).click();
    await expect(await page.getByText('You are you going to explore')).toBeVisible();
    await page.getByRole('option', { name: 'Explore the dark Forest' }).click();
    await page.getByRole('button', { name: 'keep exploring -->' }).click();
    await expect(await page.getByRole('heading', { name: 'Q3:' })).toBeVisible();
});

test('keyboard navigation through happy flow', async ({ page }) => {
    await page.goto('/create');
    await page.getByRole('button', { name: 'keep exploring -->' }).press('Enter');
    await page.getByRole('option', { name: 'Explore the dark Forest' }).press('Enter');
    await page.getByRole('option', { name: 'Explore the dark Forest' }).press('Tab');
    await page.getByRole('option', { name: 'Follow the scent of the sea' }).press('Tab');
    await page.getByRole('option', { name: 'Refresh in the Lake' }).press('Tab');
    await page.getByRole('option', { name: 'Relax in the Meadow' }).press('Tab');
    await page.getByRole('option', { name: 'Climb the Mountain' }).press('Tab');
    await page.getByRole('button', { name: '<-- back away' }).press('Tab');
    await page.getByRole('button', { name: 'keep exploring -->' }).press('Enter');
    await page.getByLabel('You creep into the forest and').fill('blue');
    await page.getByLabel('You creep into the forest and').press('Enter');
    await page.getByLabel('There is something').fill('green');
    await page.getByLabel('There is something').press('Enter');
    await page.getByRole('option', { name: 'Coatyl' }).press('Tab');
    await page.getByRole('option', { name: 'Dragon' }).press('Enter');
    await page.getByRole('option', { name: 'Dragon' }).press('Tab');
    await page.getByRole('option', { name: 'Wyvern' }).press('Tab');
    await page.getByRole('option', { name: 'Octolegged monstrosity' }).press('Tab');
    await page.getByRole('button', { name: '<-- back away' }).press('Tab');
    await page.getByRole('button', { name: 'keep exploring -->' }).press('Enter');
    await page.getByRole('option', { name: 'Beating wings' }).press('Enter');
    await page.getByRole('option', { name: 'Beating wings' }).press('Tab');
    await page.getByRole('option', { name: 'Spinning tail' }).press('Tab');
    await page.getByRole('button', { name: '<-- back away' }).press('Tab');
    await page.getByRole('button', { name: 'keep exploring -->' }).press('Enter');
    await page.getByLabel('They turn to you curiously.').fill('3');
    await page.getByLabel('They turn to you curiously.').press('Tab');
    await page.getByRole('button', { name: '<-- back away' }).press('Tab');
    await page.getByRole('button', { name: 'keep exploring -->' }).press('Enter');
    await page.getByRole('option', { name: 'Ready for a fight' }).press('Enter');
    await page.getByRole('option', { name: 'Ready for a fight' }).press('Tab');
    await page.getByRole('option', { name: 'Kind and wise' }).press('Tab');
    await page.getByRole('button', { name: '<-- back away' }).press('Tab');
    await page.getByRole('button', { name: 'keep exploring -->' }).press('Enter');
    await page.getByRole('option', { name: 'Wet and gasping for air' }).press('Enter');
    await page.getByRole('option', { name: 'Wet and gasping for air' }).press('Tab');
    await page.getByRole('option', { name: 'Roasted but unburnt' }).press('Tab');
    await page.getByRole('option', { name: 'Oddly settled' }).press('Tab');
    await page.getByRole('button', { name: '<-- back away' }).press('Tab');
    await page.getByRole('button', { name: 'keep exploring -->' }).press('Enter');
    await page.getByLabel("You haven't been eaten or").fill(testDragon.name);
    await page.getByLabel("You haven't been eaten or").press('Tab');
    await page.getByRole('button', { name: '<-- back away' }).press('Tab');
    await page.getByRole('button', { name: 'keep exploring -->' }).press('Enter');
    await expect(await page.getByText(endMessages[0])).toBeVisible();
    const image = page.getByRole('img', { name: 'the dragon you found' });
    const loader = page.getByText(endMessages[1]);
    await expect(image.or(loader)).toBeVisible();
});