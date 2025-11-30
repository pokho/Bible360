import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 7777,
		strictPort: true
	},
	build: {
		target: 'esnext'
	}
});