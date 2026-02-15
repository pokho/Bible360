<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
	<!-- Support Chatbot (Client-side Mode) -->
	<link rel="stylesheet" href="/chatbot/widget.css">
	<script src="/chatbot/widget.js"></script>
</svelte:head>

<div id="app">
	<slot />
</div>

<!-- Support Chatbot Widget -->
<div class="sc-widget-container" id="sc-widget-container">
	<button class="sc-chat-button" id="sc-chat-button" aria-label="Open chat">
		<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
		</svg>
	</button>

	<div class="sc-chat-window" id="sc-chat-window">
		<div class="sc-chat-header">
			<div class="sc-chat-avatar">
				<svg viewBox="0 0 24 24" fill="white" width="24" height="24">
					<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
				</svg>
			</div>
			<div class="sc-chat-info">
				<h3>Bible360</h3>
				<p>Support Assistant</p>
			</div>
			<button class="sc-settings-button" id="sc-settings-button" aria-label="Settings" title="Settings">
				<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
					<path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
				</svg>
			</button>
			<button class="sc-export-button" id="sc-export-button" aria-label="Export conversation" title="Download conversation">
				<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
					<path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
				</svg>
			</button>
			<button class="sc-close-button" id="sc-close-button" aria-label="Close chat">
				<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
					<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
				</svg>
			</button>
		</div>

		<div class="sc-messages" id="sc-messages">
			<div class="sc-message bot">
				Hi! I'm Bible360 assistant.
			</div>
		</div>

		<div class="sc-escalation-notice" id="sc-escalation-notice" style="display: none;">
			Connecting you to a human agent...
		</div>

		<div class="sc-input-area">
			<input
				type="text"
				class="sc-input-field"
				id="sc-input-field"
				placeholder="Type your message..."
				autocomplete="off"
			>
			<button class="sc-send-button" id="sc-send-button" aria-label="Send message">
				<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
					<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
				</svg>
			</button>
		</div>
	</div>
</div>

<!-- Settings Modal -->
<div class="sc-settings-modal" id="sc-settings-modal" style="display: none;">
	<div class="sc-settings-content">
		<h4>Chatbot Settings</h4>
		<div class="sc-setting-group">
			<label for="sc-api-key-input">OpenRouter API Key</label>
			<input type="password" id="sc-api-key-input" placeholder="sk-or-v1-...">
			<small>Get your key at <a href="https://openrouter.ai/settings/keys" target="_blank" rel="noopener">openrouter.ai/settings/keys</a></small>
		</div>
		<div class="sc-setting-group">
			<label for="sc-model-select">Model</label>
			<select id="sc-model-select">
				<option value="">Auto-select (Free Models)</option>
			</select>
			<small>Leave empty to automatically use available free models</small>
		</div>
		<div class="sc-settings-actions">
			<button id="sc-save-settings">Save</button>
			<button id="sc-cancel-settings">Cancel</button>
		</div>
	</div>
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
