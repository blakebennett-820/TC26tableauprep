// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://blakebennett-820.github.io',
	base: '/TC26tableauprep',
	integrations: [
		starlight({
			title: 'TC26',
			description: 'Selling Sunset: Renovate Your Data with Tableau Prep',
			logo: {
				src: './src/assets/tableau-prep-logo.svg',
				replacesTitle: false,
			},
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{ label: 'Home', slug: '' },
				{
					label: 'Lab Instructions',
					items: [
						{ label: 'Step 0: Preliminaries', slug: 'steps/step-0' },
						{ label: 'Step 1: Connect, Prep & Cleanse', slug: 'steps/step-1' },
						{ label: 'Step 2: Pivot & Join', slug: 'steps/step-2' },
						{ label: 'Step 3: Predictive (TabPy)', slug: 'steps/step-3' },
						{ label: 'Step 4: Spatial', slug: 'steps/step-4' },
						{ label: 'Step 5: Parameter & Output', slug: 'steps/step-5' },
						{ label: 'Extra Credit: Tableau Desktop', slug: 'steps/extra-credit' },
					],
				},
			{ label: 'Downloads', slug: 'downloads' },
			],
		}),
	],
});
