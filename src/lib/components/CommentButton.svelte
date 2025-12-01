<script lang="ts">
  export let commentary;
  export let onClick;
  export let provider;

  // Provider-specific colors matching existing color scheme
  const providerColors = {
    'biblehub': '#27ae60',
    'logos': '#3498db',
    'blb': '#9b59b6',
    'apocrypha': '#e67e22'
  };

  $: buttonColor = providerColors[provider] || '#666';

  function handleClick() {
    onClick();
  }

  function handleKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  }
</script>

<button
  class="comment-btn"
  style="border-color: {buttonColor}; color: {buttonColor};"
  on:click={handleClick}
  on:keydown={handleKeydown}
  title="View commentary"
  aria-label="View commentary for this reading"
>
  💬
</button>

<style>
  .comment-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid;
    background: white;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    z-index: 10;
    flex-shrink: 0;
  }

  .comment-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    background: #f8f9fa;
  }

  .comment-btn:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }

  .comment-btn:active {
    transform: translateY(0);
  }

  /* Mobile adjustments */
  @media (max-width: 768px) {
    .comment-btn {
      width: 24px;
      height: 24px;
      font-size: 10px;
      top: 6px;
      right: 6px;
    }
  }
</style>