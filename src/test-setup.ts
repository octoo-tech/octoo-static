import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock @skeletonlabs/skeleton stores
vi.mock('@skeletonlabs/skeleton', async () => {
	const actual = await vi.importActual('@skeletonlabs/skeleton');
	return {
		...actual,
		getModalStore: vi.fn(() => ({
			trigger: vi.fn(),
			close: vi.fn(),
			subscribe: vi.fn(() => vi.fn()),
		})),
		initializeStores: vi.fn(),
		storePopup: {
			set: vi.fn()
		},
		AppShell: vi.fn(() => ({ $$: { fragment: null } })),
		AppBar: vi.fn(() => ({ $$: { fragment: null } })),
		Modal: vi.fn(() => ({ $$: { fragment: null } }))
	};
});

// Mock @floating-ui/dom
vi.mock('@floating-ui/dom', () => ({
	computePosition: vi.fn(),
	autoUpdate: vi.fn(),
	flip: vi.fn(),
	shift: vi.fn(),
	offset: vi.fn(),
	arrow: vi.fn()
}));

// Mock enhanced images
vi.mock('$app/environment', () => ({
	browser: false,
	dev: true,
	building: false,
	version: '1.0.0'
}));

// Global fetch mock
global.fetch = vi.fn();

// Mock console methods to reduce noise in tests
global.console = {
	...console,
	log: vi.fn(),
	warn: vi.fn(),
	error: vi.fn()
};
