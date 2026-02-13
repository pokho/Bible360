<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
	<!-- Support Chatbot (Client-side Mode) -->
	<link rel="stylesheet" href="/chatbot/widget.css">
	<script src="/chatbot/widget.js" defer></script>
</svelte:head>

<div id="app">
	<slot />
</div>

<style>
	:global(body) {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		line-height: 1.6;
		color: #333;
		background: #f8f9fa;
		margin: 0;
		padding: 0;
		min-height: 100vh;
	}

	:global(*) {
		box-sizing: border-box;
	}

	#app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>
