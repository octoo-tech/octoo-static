import { test, expect } from '@playwright/test';

test.describe('Contact Form Integration', () => {
	test.beforeEach(async ({ page }) => {
		// Set longer timeout for navigation
		await page.goto('/', { waitUntil: 'networkidle' });

		// Ensure page is fully loaded
		await expect(page.locator('h1:has-text("What is Octoo?")')).toBeVisible();
	});

	test('opens contact modal when contact button is clicked', async ({ page }) => {
		// Click the contact button
		await page.click('button:has-text("Contact")');
		
		// Wait for modal to appear
		await expect(page.locator('text=Contact Us')).toBeVisible();
		
		// Check form fields are present
		await expect(page.locator('input[placeholder="Your name..."]')).toBeVisible();
		await expect(page.locator('input[placeholder="Your email address..."]')).toBeVisible();
		await expect(page.locator('textarea[placeholder="Please, enter your message here..."]')).toBeVisible();
	});

	test('can fill out and submit contact form', async ({ context }) => {
		// Create a new page to avoid context issues
		const newPage = await context.newPage();
		await newPage.goto('/', { waitUntil: 'networkidle' });

		// Mock the form submission endpoint
		await newPage.route('https://submit-form.com/mzNITeDuV', async route => {
			await route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({ success: true })
			});
		});

		// Open contact modal
		await newPage.click('button:has-text("Contact")');
		await expect(newPage.locator('text=Contact Us')).toBeVisible({ timeout: 10000 });

		// Fill out the form
		await newPage.fill('input[placeholder="Your name..."]', 'John Doe');
		await newPage.fill('input[placeholder="Your email address..."]', 'john@example.com');
		await newPage.fill('textarea[placeholder="Please, enter your message here..."]', 'This is a test message');

		// Submit the form
		await newPage.click('button:has-text("Submit")');

		// Modal should close after submission
		await expect(newPage.locator('text=Contact Us')).not.toBeVisible({ timeout: 10000 });

		// Clean up
		await newPage.close();
	});

	test('can cancel contact form', async ({ page }) => {
		// Open contact modal
		await page.click('button:has-text("Contact")');
		await expect(page.locator('text=Contact Us')).toBeVisible();

		// Click cancel button
		await page.click('button:has-text("Cancel")');

		// Modal should close
		await expect(page.locator('text=Contact Us')).not.toBeVisible();
	});

	test('form fields accept input correctly', async ({ context }) => {
		// Create a new page to avoid context issues
		const newPage = await context.newPage();
		await newPage.goto('/', { waitUntil: 'networkidle' });

		// Open contact modal
		await newPage.click('button:has-text("Contact")');
		await expect(newPage.locator('text=Contact Us')).toBeVisible({ timeout: 10000 });

		const nameInput = newPage.locator('input[placeholder="Your name..."]');
		const emailInput = newPage.locator('input[placeholder="Your email address..."]');
		const messageTextarea = newPage.locator('textarea[placeholder="Please, enter your message here..."]');

		// Test input functionality
		await nameInput.fill('Test User');
		await expect(nameInput).toHaveValue('Test User');

		await emailInput.fill('test@example.com');
		await expect(emailInput).toHaveValue('test@example.com');

		await messageTextarea.fill('This is a test message with multiple lines.\nSecond line here.');
		await expect(messageTextarea).toHaveValue('This is a test message with multiple lines.\nSecond line here.');

		// Clean up
		await newPage.close();
	});

	test('submit button is disabled during submission', async ({ page }) => {
		// Mock a slow response to test loading state
		await page.route('https://submit-form.com/mzNITeDuV', async route => {
			await new Promise(resolve => setTimeout(resolve, 1000));
			await route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({ success: true })
			});
		});

		// Open contact modal and fill form
		await page.click('button:has-text("Contact")');
		await page.fill('input[placeholder="Your name..."]', 'John Doe');
		
		const submitButton = page.locator('button:has-text("Submit")');
		
		// Button should be enabled initially
		await expect(submitButton).toBeEnabled();
		
		// Click submit
		await submitButton.click();
		
		// Button should be disabled during submission
		await expect(submitButton).toBeDisabled();
	});

	test('handles form submission errors gracefully', async ({ context }) => {
		// Create a new page to avoid context issues
		const newPage = await context.newPage();
		await newPage.goto('/', { waitUntil: 'networkidle' });

		// Mock a failed response
		await newPage.route('https://submit-form.com/mzNITeDuV', async route => {
			await route.fulfill({
				status: 500,
				contentType: 'application/json',
				body: JSON.stringify({ error: 'Server error' })
			});
		});

		// Open contact modal and submit form
		await newPage.click('button:has-text("Contact")');
		await expect(newPage.locator('text=Contact Us')).toBeVisible({ timeout: 10000 });
		await newPage.fill('input[placeholder="Your name..."]', 'John Doe');
		await newPage.click('button:has-text("Submit")');

		// Modal should still close (based on current implementation)
		await expect(newPage.locator('text=Contact Us')).not.toBeVisible({ timeout: 10000 });

		// Clean up
		await newPage.close();
	});

	test('form sends correct data to API', async ({ context }) => {
		// Create a new page to avoid context issues
		const newPage = await context.newPage();
		await newPage.goto('/', { waitUntil: 'networkidle' });

		let requestBody: any;

		// Intercept and capture the request
		await newPage.route('https://submit-form.com/mzNITeDuV', async route => {
			const request = route.request();
			requestBody = JSON.parse(request.postData() || '{}');

			await route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({ success: true })
			});
		});

		// Open contact modal and fill form
		await newPage.click('button:has-text("Contact")');
		await expect(newPage.locator('text=Contact Us')).toBeVisible({ timeout: 10000 });
		await newPage.fill('input[placeholder="Your name..."]', 'Jane Smith');
		await newPage.fill('input[placeholder="Your email address..."]', 'jane@example.com');
		await newPage.fill('textarea[placeholder="Please, enter your message here..."]', 'Hello from integration test');

		// Submit form
		await newPage.click('button:has-text("Submit")');

		// Wait for request to complete
		await newPage.waitForTimeout(500);

		// Verify the request body
		expect(requestBody).toEqual({
			name: 'Jane Smith',
			email: 'jane@example.com',
			text: 'Hello from integration test'
		});

		// Clean up
		await newPage.close();
	});

	test('modal has proper accessibility attributes', async ({ page }) => {
		// Open contact modal
		await page.click('button:has-text("Contact")');
		await expect(page.locator('text=Contact Us')).toBeVisible({ timeout: 10000 });

		// Check form labels and inputs
		const emailInput = page.locator('input[placeholder="Your email address..."]');

		// Inputs should be properly labeled
		await expect(page.locator('label:has-text("Name")')).toBeVisible();
		await expect(page.locator('label:has-text("Email")')).toBeVisible();
		await expect(page.locator('label:has-text("Text")')).toBeVisible();

		// Email input should have correct type
		await expect(emailInput).toHaveAttribute('type', 'email');
	});

	test('contact button is accessible', async ({ page }) => {
		const contactButton = page.locator('button:has-text("Contact")');
		
		// Button should be focusable
		await contactButton.focus();
		await expect(contactButton).toBeFocused();
		
		// Button should be clickable with keyboard
		await contactButton.press('Enter');
		await expect(page.locator('text=Contact Us')).toBeVisible();
	});
});
