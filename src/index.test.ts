import { describe, it, expect } from 'vitest';

describe('Basic functionality', () => {
	it('should have working test environment', () => {
		expect(1 + 2).toBe(3);
	});

	it('should have access to DOM environment', () => {
		const div = document.createElement('div');
		div.textContent = 'test';
		expect(div.textContent).toBe('test');
	});

	it('should have mocked fetch available', () => {
		expect(global.fetch).toBeDefined();
		expect(typeof global.fetch).toBe('function');
	});
});
