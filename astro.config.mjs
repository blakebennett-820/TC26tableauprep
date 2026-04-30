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
			head: [
				{
					tag: 'script',
					content: `if (!localStorage.getItem('starlight-theme')) { localStorage.setItem('starlight-theme', 'dark'); }`,
				},
			],
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{ label: 'Home', slug: '' },
				{ label: 'Downloads', slug: 'downloads' },
				{
					label: 'Lab Instructions',
					items: [
						{ label: 'Step 0: Preliminaries', slug: 'steps/step-0' },
						{ label: 'Step 1: Connect, Prep & Cleanse', slug: 'steps/step-1' },
						{ label: 'Step 2: Pivot & Join', slug: 'steps/step-2' },
						{ label: 'Step 3: Predictive (TabPy)', slug: 'steps/step-3' },
						{ label: 'Step 4: Spatial', slug: 'steps/step-4' },
						{ label: 'Step 5: Parameter & Output', slug: 'steps/step-5' },
						{ label: 'Step 6: Publish & Schedule', slug: 'steps/step-6' },
						{ label: 'Extra Credit: Tableau Desktop', slug: 'steps/extra-credit' },
					],
				},
				{
					label: 'Session Documentation',
					collapsed: true,
					items: [
						{ label: 'Connect to Data', link: 'https://help.tableau.com/current/prep/en-us/prep_connect.htm', attrs: { target: '_blank' } },
						{ label: 'Clean and Shape Data', link: 'https://help.tableau.com/current/prep/en-us/prep_clean.htm', attrs: { target: '_blank' } },
						{ label: 'Build Flows with Agent', link: 'https://help.tableau.com/current/prep/en-us/prep_einstein.htm', attrs: { target: '_blank' } },
						{ label: 'Pivot Your Data', link: 'https://help.tableau.com/current/prep/en-us/prep_pivot.htm', attrs: { target: '_blank' } },
						{ label: 'Use Python in a Flow', link: 'https://help.tableau.com/current/prep/en-us/prep_scripts_TabPy.htm', attrs: { target: '_blank' } },
						{ label: 'Spatial Calculations & Joins', link: 'https://help.tableau.com/current/prep/en-us/prep_spatial_calculations_and_joins.htm', attrs: { target: '_blank' } },
						{ label: 'Create Parameters', link: 'https://help.tableau.com/current/prep/en-us/prep_parameters.htm', attrs: { target: '_blank' } },
						{ label: 'Publish a Flow', link: 'https://help.tableau.com/current/prep/en-us/prep_conductor_publish_flow.htm', attrs: { target: '_blank' } },
					],
				},
				{
					label: 'Additional Docs',
					collapsed: true,
					items: [
						{ label: 'Use Custom SQL', link: 'https://help.tableau.com/current/prep/en-us/prep_connect.htm#use-custom-sql-to-connect-to-data', attrs: { target: '_blank' } },
						{ label: 'Using Custom Connectors', link: 'https://help.tableau.com/current/prep/en-us/prep_connect.htm#custom-connectors', attrs: { target: '_blank' } },
						{ label: 'Improve Performance of Flows', link: 'https://www.tableau.com/blog/best-practices-authoring-data-preparation-flow', attrs: { target: '_blank' } },
						{ label: 'Validate Data with Data Roles', link: 'https://help.tableau.com/current/prep/en-us/prep_validate_data.htm', attrs: { target: '_blank' } },
						{ label: 'TabPy', link: 'https://www.tableau.com/developer/tools/python-integration-tabpy', attrs: { target: '_blank' } },
						{ label: 'API Methods', link: 'https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api_ref_flow.htm', attrs: { target: '_blank' } },
					],
				},
			],
		}),
	],
});
