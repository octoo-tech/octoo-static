import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		setupFiles: ['src/test-setup.ts'],
		globals: true,
		coverage: {
			reporter: ['text', 'json', 'html'],
			include: [
				'src/**/*.{js,ts,svelte}',
				'octoo-theme.ts'
			],
			exclude: [
				// Dependencies and build artifacts
				'node_modules/',
				'**/coverage/**',
				'**/dist/**',
				'**/build/**',
				'**/.svelte-kit/**',

				// Test files and utilities
				'src/test-setup.ts',
				'src/test-utils.ts',
				'src/**/*.{test,spec}.{js,ts}',
				'tests/**',

				// Configuration files
				'**/*.config.*',
				'**/*.d.ts',
				'.eslintrc.cjs',
				'*.config.{js,ts,cjs,mjs}',

				// Infrastructure and deployment
				'infra/**',
				'scripts/**',

				// Static assets and templates
				'src/app.html',
				'src/app.postcss',
				'static/**',

				// SvelteKit generated files
				'src/routes/+layout.js',
				'src/routes/+layout.svelte',
				'src/lib/index.ts'
			]
		}
	}
});
