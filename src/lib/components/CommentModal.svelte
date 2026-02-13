<script lang="ts">
  export let isOpen = false;
  export let commentary = '';
  export let provider = '';
  export let day = 0;
  export let onClose;
  export let commentaryType = 'generic';

  $: comment = commentary && commentaryType === 'paul' ? `Paul's Commentary` : commentary;

  // Provider-specific colors matching existing color scheme
  const providerColors = {
    'biblehub': '#27ae60',
    'logos': '#3498db',
    'blb': '#9b59b6',
    'apocrypha': '#e67e22'
  };

  const providerNames = {
    'biblehub': 'BibleHub Chronological',
    'logos': 'Logos Academic',
    'blb': 'Blue Letter Bible',
    'apocrypha': 'Apocrypha & Pseudepigrapha'
  };

  $: accentColor = providerColors[provider] || '#666';
  $: providerName = providerNames[provider] || provider;

  // Convert escaped newlines to actual newlines for proper rendering
  $: formattedCommentary = commentary.replace(/\\n/g, '\n');

  function handleBackdropClick(event) {
    // Close only when clicking the backdrop, not the modal content
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      onClose();
    }
  }

  // Handle escape key when modal is open
  $: if (isOpen) {
    document.addEventListener('keydown', handleKeydown);
  } else {
    document.removeEventListener('keydown', handleKeydown);
  }
</script>

{#if isOpen}
  <div
    class="modal-backdrop"
    on:click={handleBackdropClick}
    on:keydown={handleKeydown}
    tabindex="-1"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <div class="modal-content" style="border-color: {accentColor};">
      <div class="modal-header" style="background-color: {accentColor};">
        <h3 id="modal-title" class="modal-title">
          {$comment}
        </h3>
        <button
          class="close-btn"
          on:click={onClose}
          aria-label="Close commentary modal"
        >
          ✕
        </button>
      </div>

      <div class="modal-body">
        <div class="provider-info">
          <span class="provider-badge" style="background-color: {accentColor};">
            {providerName}
          </span>
        </div>

        <div class="commentary-text">
          {formattedCommentary}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
    box-sizing: border-box;
  }

  .modal-content {
    background: white;
    border-radius: 12px;
    border: 3px solid;
    max-width: 500px;
    width: 100%;
    max-height: 80vh;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .modal-header {
    padding: 20px 24px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
  }

  .modal-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
  }

  .close-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .close-btn:focus {
    outline: 2px solid white;
    outline-offset: 2px;
  }

  .modal-body {
    padding: 24px;
    overflow-y: auto;
    flex: 1;
  }

  .provider-info {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }

  .provider-badge {
    color: white;
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .commentary-text {
    line-height: 1.6;
    font-size: 15px;
    color: #333;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  /* Mobile responsive design */
  @media (max-width: 768px) {
    .modal-backdrop {
      padding: 16px;
    }

    .modal-content {
      max-width: 100%;
      max-height: 90vh;
    }

    .modal-header {
      padding: 16px 20px;
    }

    .modal-title {
      font-size: 16px;
    }

    .modal-body {
      padding: 20px;
    }

    .commentary-text {
      font-size: 14px;
    }
  }

  /* Small mobile adjustments */
  @media (max-width: 480px) {
    .modal-backdrop {
      padding: 12px;
    }

    .modal-header {
      padding: 12px 16px;
    }

    .modal-body {
      padding: 16px;
    }

    .modal-title {
      font-size: 15px;
    }
  }

  /* Focus management for accessibility */
  .modal-backdrop:focus-within .modal-content {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
  }
</style>