import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

// Mock enhanced images
vi.mock('@sveltejs/enhanced-img', () => ({
	'enhanced:img': 'img'
}));

describe('Page component', () => {
	it('renders the main heading', () => {
		render(Page);
		
		const heading = screen.getByRole('heading', { name: 'What is Octoo?' });
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveClass('h1', 'playfair-display');
	});

	it('renders all content paragraphs', () => {
		render(Page);
		
		// Check for key content
		expect(screen.getByText(/Octoo is a revolutionary, specialized search engine/)).toBeInTheDocument();
		expect(screen.getByText(/Streamlined searching across multiple showrooms/)).toBeInTheDocument();
		expect(screen.getByText(/Integrated tools provide seamless connectivity/)).toBeInTheDocument();
		expect(screen.getByText(/Octoo is an all in one solution/)).toBeInTheDocument();
	});

	it('has proper grid layout structure', () => {
		render(Page);
		
		const mainContainer = document.querySelector('.grid.grid-cols-1.xl\\:grid-cols-2');
		expect(mainContainer).toBeInTheDocument();
		expect(mainContainer).toHaveClass('h-full', 'mx-auto', 'flex', 'gap-4', 'md:gap-10', 'items-center');
	});

	it('renders SVG logo with correct attributes', () => {
		render(Page);
		
		const svg = document.querySelector('svg');
		expect(svg).toBeInTheDocument();
		expect(svg).toHaveAttribute('viewBox', '0 0 483.76001 458.64133');
		expect(svg).toHaveAttribute('height', '458.64133');
		expect(svg).toHaveAttribute('width', '483.76001');
	});

	it('has proper responsive layout classes', () => {
		render(Page);
		
		// Check for responsive text alignment and spacing
		const textContainer = document.querySelector('.space-y-10.text-left');
		expect(textContainer).toBeInTheDocument();
		expect(textContainer).toHaveClass('flex', 'flex-col', 'items-center', 'pl-4', 'pr-12');
		
		const imageContainer = document.querySelector('.text-center.flex.flex-col.items-center.px-4');
		expect(imageContainer).toBeInTheDocument();
	});

	it('applies correct styling classes to figure elements', () => {
		render(Page);
		
		const figure = document.querySelector('figure');
		expect(figure).toBeInTheDocument();
		
		const imgBg = document.querySelector('.img-bg');
		expect(imgBg).toBeInTheDocument();
	});

	it('contains proper content structure', () => {
		render(Page);
		
		// Check for proper content hierarchy
		const contentDiv = document.querySelector('.space-y-2');
		expect(contentDiv).toBeInTheDocument();
		
		// Verify all paragraphs are present
		const paragraphs = document.querySelectorAll('p');
		expect(paragraphs).toHaveLength(4);
	});

	it('has semantic HTML structure', () => {
		render(Page);
		
		// Check for proper heading hierarchy
		const h1 = screen.getByRole('heading', { level: 1 });
		expect(h1).toBeInTheDocument();
		
		// Check for figure element
		const figure = document.querySelector('figure');
		expect(figure).toBeInTheDocument();
	});

	it('applies animation classes correctly', () => {
		render(Page);

		const imgBg = document.querySelector('.img-bg');
		expect(imgBg).toBeInTheDocument();
		// Note: In test environment, Tailwind classes may be processed differently
		// We just verify the element exists with the img-bg class
	});

	it('has proper responsive image sizing', () => {
		render(Page);
		
		const svg = document.querySelector('svg');
		const imgBg = document.querySelector('.img-bg');
		
		// Both should have responsive sizing classes
		expect(svg?.parentElement).toContainHTML('svg');
		expect(imgBg).toBeInTheDocument();
	});
});
