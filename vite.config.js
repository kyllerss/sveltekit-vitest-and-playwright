import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */
export default {
  define: {
    // Eliminate in-source test code
    'import.meta.vitest': 'undefined'
  },
  test: {
    // jest like globals
    globals: true,
    environment: 'jsdom',
    // in-source testing
    includeSource: ['src/**/*.{js,ts,svelte}'],
		// msw setup
		setupFiles: ['./src/mocks/setup.ts'],
		coverage: {
			exclude: ['src/mocks']
		},
		deps: {
			// Put Svelte component here, e.g., inline: [/svelte-multiselect/, /msw/]
			inline: [/msw/]
		},
    include: ['tests/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  plugins: [sveltekit()]
}
