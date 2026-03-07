<script lang="ts">
	import '../app.css';
</script>

<div id="app">
	<slot />
</div>

<style>
	:global(html) {
		overflow-x: hidden;
	}

	:global(body) {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		line-height: 1.6;
		color: #333;
		background: #f8f9fa;
		margin: 0;
		padding: 0;
		min-height: 100vh;
		overflow-x: hidden;
	}

	:global(*) {
		box-sizing: border-box;
	}

	#app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		overflow-x: hidden;
	}
</style>
