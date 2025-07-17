import { render, type RenderResult } from '@testing-library/svelte';
import { vi } from 'vitest';
import type { SvelteComponent } from 'svelte';

// Mock modal store for testing
export const createMockModalStore = () => ({
	trigger: vi.fn(),
	close: vi.fn(),
	subscribe: vi.fn(() => vi.fn()),
	set: vi.fn(),
	update: vi.fn(),
});

// Mock parent component for modal testing
export const createMockParent = () => ({
	regionFooter: 'mock-footer-class',
	buttonNeutral: 'mock-neutral-button',
	buttonPositive: 'mock-positive-button',
	buttonTextCancel: 'Cancel',
	onClose: vi.fn()
});

// Helper to render Svelte components with common setup
export const renderComponent = (
	Component: any,
	props: Record<string, any> = {}
): RenderResult<SvelteComponent> => {
	return render(Component, { props });
};

// Mock fetch responses
export const mockFetchSuccess = () => {
	(global.fetch as any).mockResolvedValueOnce({
		ok: true,
		status: 200,
		json: async () => ({ success: true })
	});
};

export const mockFetchError = () => {
	(global.fetch as any).mockRejectedValueOnce(new Error('Network error'));
};

// Helper to wait for async operations
export const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock store values
export const mockStoreValue = (value: any) => ({
	subscribe: vi.fn((callback) => {
		callback(value);
		return vi.fn(); // unsubscribe function
	})
});
