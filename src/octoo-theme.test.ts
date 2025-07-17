import { describe, it, expect } from 'vitest';
import { octooTheme } from '../octoo-theme';

describe('octooTheme', () => {
	it('has correct theme name', () => {
		expect(octooTheme.name).toBe('octoo-theme');
	});

	it('has all required theme properties', () => {
		const properties = octooTheme.properties;
		
		// Base theme properties
		expect(properties['--theme-font-family-base']).toBeDefined();
		expect(properties['--theme-font-family-heading']).toBeDefined();
		expect(properties['--theme-font-color-base']).toBeDefined();
		expect(properties['--theme-font-color-dark']).toBeDefined();
		expect(properties['--theme-rounded-base']).toBeDefined();
		expect(properties['--theme-rounded-container']).toBeDefined();
		expect(properties['--theme-border-base']).toBeDefined();
	});

	it('has all on-color properties defined', () => {
		const properties = octooTheme.properties;
		
		expect(properties['--on-primary']).toBe('0 0 0');
		expect(properties['--on-secondary']).toBe('255 255 255');
		expect(properties['--on-tertiary']).toBe('0 0 0');
		expect(properties['--on-success']).toBe('0 0 0');
		expect(properties['--on-warning']).toBe('0 0 0');
		expect(properties['--on-error']).toBe('255 255 255');
		expect(properties['--on-surface']).toBe('0 0 0');
	});

	it('has complete primary color palette', () => {
		const properties = octooTheme.properties;

		// Test specific known primary colors
		expect(properties['--color-primary-50']).toBe('255 251 243');
		expect(properties['--color-primary-100']).toBe('255 250 239');
		expect(properties['--color-primary-200']).toBe('255 249 235');
		expect(properties['--color-primary-300']).toBe('255 245 222');
		expect(properties['--color-primary-400']).toBe('255 237 198');
		expect(properties['--color-primary-500']).toBe('255 229 173');
		expect(properties['--color-primary-600']).toBe('230 206 156');
		expect(properties['--color-primary-700']).toBe('191 172 130');
		expect(properties['--color-primary-800']).toBe('153 137 104');
		expect(properties['--color-primary-900']).toBe('125 112 85');
	});

	it('has complete secondary color palette', () => {
		const properties = octooTheme.properties;

		// Test key secondary colors
		expect(properties['--color-secondary-50']).toBeDefined();
		expect(properties['--color-secondary-500']).toBe('79 70 229');
		expect(properties['--color-secondary-900']).toBeDefined();
	});

	it('has complete tertiary color palette', () => {
		const properties = octooTheme.properties;

		// Test key tertiary colors
		expect(properties['--color-tertiary-50']).toBeDefined();
		expect(properties['--color-tertiary-500']).toBe('14 165 233');
		expect(properties['--color-tertiary-900']).toBeDefined();
	});

	it('has complete success color palette', () => {
		const properties = octooTheme.properties;

		// Test key success colors
		expect(properties['--color-success-50']).toBeDefined();
		expect(properties['--color-success-500']).toBe('132 204 22');
		expect(properties['--color-success-900']).toBeDefined();
	});

	it('has complete warning color palette', () => {
		const properties = octooTheme.properties;

		// Test key warning colors
		expect(properties['--color-warning-50']).toBeDefined();
		expect(properties['--color-warning-500']).toBe('234 179 8');
		expect(properties['--color-warning-900']).toBeDefined();
	});

	it('has complete error color palette', () => {
		const properties = octooTheme.properties;

		// Test key error colors
		expect(properties['--color-error-50']).toBeDefined();
		expect(properties['--color-error-500']).toBe('212 25 118');
		expect(properties['--color-error-900']).toBeDefined();
	});

	it('has complete surface color palette', () => {
		const properties = octooTheme.properties;

		// Test key surface colors
		expect(properties['--color-surface-50']).toBeDefined();
		expect(properties['--color-surface-500']).toBe('221 221 221');
		expect(properties['--color-surface-900']).toBeDefined();
	});

	it('has valid RGB color format for all colors', () => {
		const properties = octooTheme.properties;
		const colorKeys = Object.keys(properties).filter(key => key.startsWith('--color-') || key.startsWith('--on-'));
		
		colorKeys.forEach(key => {
			const value = properties[key];
			expect(value).toMatch(/^\d{1,3} \d{1,3} \d{1,3}$/);
			
			// Validate RGB values are within valid range (0-255)
			const [r, g, b] = value.split(' ').map(Number);
			expect(r).toBeGreaterThanOrEqual(0);
			expect(r).toBeLessThanOrEqual(255);
			expect(g).toBeGreaterThanOrEqual(0);
			expect(g).toBeLessThanOrEqual(255);
			expect(b).toBeGreaterThanOrEqual(0);
			expect(b).toBeLessThanOrEqual(255);
		});
	});

	it('has proper font family values', () => {
		const properties = octooTheme.properties;
		
		expect(properties['--theme-font-family-base']).toBe('system-ui');
		expect(properties['--theme-font-family-heading']).toBe('system-ui');
	});

	it('has proper border and rounded values', () => {
		const properties = octooTheme.properties;
		
		expect(properties['--theme-rounded-base']).toBe('4px');
		expect(properties['--theme-rounded-container']).toBe('8px');
		expect(properties['--theme-border-base']).toBe('1px');
	});

	it('has proper contrast for on-colors', () => {
		const properties = octooTheme.properties;
		
		// Light on-colors (should be dark text)
		expect(properties['--on-primary']).toBe('0 0 0'); // black on light primary
		expect(properties['--on-tertiary']).toBe('0 0 0'); // black on light tertiary
		expect(properties['--on-success']).toBe('0 0 0'); // black on light success
		expect(properties['--on-warning']).toBe('0 0 0'); // black on light warning
		expect(properties['--on-surface']).toBe('0 0 0'); // black on light surface
		
		// Dark on-colors (should be light text)
		expect(properties['--on-secondary']).toBe('255 255 255'); // white on dark secondary
		expect(properties['--on-error']).toBe('255 255 255'); // white on dark error
	});

	it('has consistent color progression from light to dark', () => {
		const properties = octooTheme.properties;
		const colorTypes = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'surface'];
		
		colorTypes.forEach(colorType => {
			const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
			
			for (let i = 0; i < shades.length - 1; i++) {
				const currentShade = properties[`--color-${colorType}-${shades[i]}`];
				const nextShade = properties[`--color-${colorType}-${shades[i + 1]}`];
				
				expect(currentShade).toBeDefined();
				expect(nextShade).toBeDefined();
				
				// Colors should generally get darker as the number increases
				// (This is a basic check - in practice, color progression is more complex)
				const [r1, g1, b1] = currentShade.split(' ').map(Number);
				const [r2, g2, b2] = nextShade.split(' ').map(Number);
				
				// At least one component should be getting smaller (darker) or staying the same
				expect(r1 >= r2 || g1 >= g2 || b1 >= b2).toBe(true);
			}
		});
	});
});
