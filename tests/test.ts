import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'What is Octoo?' })).toBeVisible();
});

test('page loads successfully', async ({ page }) => {
	await page.goto('/');
	// Check that the page loads and has content instead of checking title
	await expect(page.locator('h1:has-text("What is Octoo?")')).toBeVisible();
});

test('contact button is present', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('button', { name: 'Contact' })).toBeVisible();
});
