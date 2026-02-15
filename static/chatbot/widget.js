
// Support Chatbot - Client-Side Mode (works on static hosting)
(function() {
  'use strict';

  const config = {
    instanceName: 'bible360',
    brandName: 'Bible360',
    provider: 'openrouter',
    model: undefined, // Will be loaded from settings or auto-select from free models
    apiKey: undefined, // Removed hardcoded key - user provides their own
    knowledgeBase: {"chunks":[{"id":"kb-1","content":"Bible360 is a chronological Bible reading plan comparison tool. It helps users compare different chronological reading plans from multiple sources including Blue Letter Bible, Logos Academic, BibleHub, and ESV.","metadata":{"source":"knowledge-base.json","tags":["about","overview","what is"],"category":"general"}},{"id":"kb-2","content":"Bible360 offers 365-day chronological Bible reading plans. Each plan takes you through the entire Bible in historical/chronological order rather than the traditional book order.","metadata":{"source":"knowledge-base.json","tags":["reading plan","365 days","chronological"],"category":"plans"}},{"id":"kb-3","content":"The Blue Letter Bible reading plan is a 365-day chronological plan from Blue Letter Bible (blueletterbible.org). It includes combined readings for some books and spreads Revelation across the final 4 days.","metadata":{"source":"knowledge-base.json","tags":["blue letter bible","blb","provider"],"category":"providers"}},{"id":"kb-4","content":"The Logos Academic reading plan is a 365-day chronological plan from Logos Bible Software (logos.com). It includes all epistles at their correct chronological positions with combined readings for shorter books.","metadata":{"source":"knowledge-base.json","tags":["logos","logos academic","provider"],"category":"providers"}},{"id":"kb-5","content":"The BibleHub reading plan is a 365-day chronological plan from BibleHub.com. It includes Paul's commentary on key passages with theological insights.","metadata":{"source":"knowledge-base.json","tags":["biblehub","provider","commentary"],"category":"providers"}},{"id":"kb-6","content":"Chronological Bible reading means reading the Bible in the order events actually happened historically, rather than in the order of books as they appear in the Bible. For example, Job is read after Genesis 11 because Job lived during the patriarchal period.","metadata":{"source":"knowledge-base.json","tags":["chronological","order","how it works"],"category":"explanation"}},{"id":"kb-7","content":"Each daily reading in Bible360 includes the passage reference, historical context, approximate date, and a description of the theological significance of that reading.","metadata":{"source":"knowledge-base.json","tags":["daily reading","features","context"],"category":"features"}},{"id":"kb-8","content":"The New Testament readings in the chronological plan are placed in their historical order. James is read early (around Acts 13-14) because it was written around AD 45-48, making it one of the earliest NT books.","metadata":{"source":"knowledge-base.json","tags":["new testament","james","chronology","epistles"],"category":"nt"}},{"id":"kb-9","content":"Revelation is always the final book in chronological plans, dated around AD 95 during the reign of Domitian. Bible360 plans spread Revelation across 4 days (chapters 1-5, 6-11, 12-18, 19-22) for better pacing.","metadata":{"source":"knowledge-base.json","tags":["revelation","apocalypse","end times"],"category":"revelation"}},{"id":"kb-10","content":"Bible360 is built with SvelteKit and deployed as a static site. It's open source and available on GitHub at github.com/pokho/Bible360.","metadata":{"source":"knowledge-base.json","tags":["github","open source","technology"],"category":"technical"}},{"id":"kb-11","content":"To use Bible360, simply visit bible360.net and select a reading plan from the available providers. Click on any day to see the readings and historical context. You can compare plans side by side.","metadata":{"source":"knowledge-base.json","tags":["how to use","getting started","tutorial"],"category":"usage"}},{"id":"kb-12","content":"The Apocrypha reading plan includes deuterocanonical books like Tobit, Judith, Wisdom, Sirach, Baruch, and 1-2 Maccabees, read in their historical context.","metadata":{"source":"knowledge-base.json","tags":["apocrypha","deuterocanonical","catholic"],"category":"apocrypha"}}],"metadata":{"version":"1.0.0","exportedAt":"2026-02-14T12:00:00.000Z","totalChunks":12,"categories":["general","plans","providers","explanation","features","nt","revelation","technical","usage","apocrypha"],"compressed":false}},
    escalationEnabled: false,
    oksomeUrl: '',
    escalationThreshold: 50,
    mode: 'support',
    autoOpen: true,
    draggable: false,
    constrainToViewport: true,
    rememberPosition: true,
    dragHandleStyle: 'bar',
  };

  // Settings management
  const SETTINGS_KEY = 'chatbot_settings';

  function loadSettings() {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        const settings = JSON.parse(stored);
        return {
          apiKey: settings.apiKey || null,
          model: settings.model || null
        };
      }
    } catch (e) {
      console.warn('Could not load settings:', e);
    }
    return { apiKey: null, model: null };
  }

  function saveSettings(apiKey, model) {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({
        apiKey: apiKey,
        model: model || null
      }));
      // Update config and cache
      config.model = model || undefined;
      apiKeyCache = apiKey;
      console.log('%c✓ Settings saved', 'color: #10b981');
    } catch (e) {
      console.error('Could not save settings:', e);
    }
  }

  function openSettings() {
    const modal = document.getElementById('sc-settings-modal');
    const keyInput = document.getElementById('sc-api-key-input');
    const modelSelect = document.getElementById('sc-model-select');

    if (!modal) return;

    // Load current settings
    const settings = loadSettings();
    if (keyInput) keyInput.value = settings.apiKey || '';

    // Populate model dropdown
    populateModelSelect();

    if (modelSelect) {
      modelSelect.value = settings.model || '';
    }

    modal.style.display = 'flex';
  }

  function closeSettings() {
    const modal = document.getElementById('sc-settings-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  function populateModelSelect() {
    const modelSelect = document.getElementById('sc-model-select');
    if (!modelSelect) return;

    // Clear existing options except the first one
    while (modelSelect.options.length > 1) {
      modelSelect.remove(1);
    }

    // Add free models
    freeModels.forEach(modelId => {
      const option = document.createElement('option');
      option.value = modelId;
      option.textContent = modelId;
      modelSelect.appendChild(option);
    });
  }

  
        // Draggable disabled - no drag handle or CSS
      
  
// Client-side RAG (Retrieval-Augmented Generation)
function searchKnowledge(query) {
  if (!config.knowledgeBase || !config.knowledgeBase.chunks) {
    return { chunks: [], context: '', confidence: 0 };
  }

  const queryWords = query.toLowerCase().split(/\s+/);
  const scoredChunks = config.knowledgeBase.chunks.map(chunk => {
    const content = chunk.content.toLowerCase();
    let score = 0;

    // Exact phrase match
    if (content.includes(query.toLowerCase())) {
      score += 50;
    }

    // Word matches
    for (const word of queryWords) {
      if (word.length > 2 && content.includes(word)) {
        score += 10;
      }
    }

    // Tag matches
    if (chunk.metadata.tags) {
      for (const tag of chunk.metadata.tags) {
        if (queryWords.some(qw => tag.toLowerCase().includes(qw))) {
          score += 15;
        }
      }
    }

    // Priority boost
    if (chunk.metadata.priority) {
      score += chunk.metadata.priority * 5;
    }

    return { chunk, score };
  });

  // Sort by score and filter relevant results
  scoredChunks.sort((a, b) => b.score - a.score);
  const relevantChunks = scoredChunks
    .filter(s => s.score > 0)
    .slice(0, 5)
    .map(s => s.chunk);

  // Build context from relevant chunks
  const context = relevantChunks
    .map(c => `[Source: ${c.metadata.source}] ${c.content}`)
    .join('\n\n');

  const confidence = scoredChunks.length > 0 ? Math.min(100, scoredChunks[0].score) : 0;

  return { chunks: relevantChunks, context, confidence };
}

  
// Client-side frustration detection
function detectFrustration(message) {
  const msgLower = message.toLowerCase().trim();
  const msgUpper = message.toUpperCase();
  const msgRaw = message;

  // Escalation keywords
  const escalationKeywords = [
    'human', 'agent', 'person', 'representative', 'support',
    'useless', 'terrible', 'horrible', 'awful', 'stupid',
    'manager', 'supervisor', ' escalate', 'talk to someone'
  ];

  // Check for escalation keywords
  const hasKeyword = escalationKeywords.some(kw => msgLower.includes(kw));

  // ALL CAPS detection (at least 3 words, mostly uppercase)
  const words = msgRaw.split(/\s+/).filter(w => w.length > 0);
  const allCapsWords = words.filter(w => w === w.toUpperCase() && w.length > 1);
  const isAllCaps = words.length >= 3 && allCapsWords.length / words.length > 0.7;

  // Excessive punctuation detection
  const punctuationMatch = msgRaw.match(/[!?]/g);
  const exclamationCount = punctuationMatch ? punctuationMatch.length : 0;
  const hasExcessivePunctuation = exclamationCount >= 3;

  // Repeated characters (e.g., "hellooooo" or "!!!!")
  const repeatedChars = /(.)\1{4,}/.test(msgRaw);

  // Short, angry messages
  const isShortAngry = words.length <= 3 && (
    msgLower.includes('!!!') ||
    msgLower.includes('??') ||
    (msgRaw === msgUpper && msgRaw !== msgLower)
  );

  return {
    shouldEscalate: hasKeyword || isAllCaps || hasExcessivePunctuation || repeatedChars || isShortAngry,
    reason: hasKeyword ? 'escalation_keyword' :
            isAllCaps ? 'all_caps' :
            hasExcessivePunctuation ? 'excessive_punctuation' :
            repeatedChars ? 'repeated_chars' :
            isShortAngry ? 'short_angry' :
            'none',
    confidence: hasKeyword ? 90 :
                 isAllCaps ? 80 :
                 hasExcessivePunctuation ? 70 :
                 repeatedChars ? 60 :
                 isShortAngry ? 75 :
                 0
  };
}

  
// Free models fetched from OpenRouter API (cached locally)
let freeModels = [];
let currentModelIndex = 0;
let modelsFetchFailed = false;

// Fetch free models from OpenRouter API
async function fetchFreeModels() {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models');
    if (!response.ok) {
      throw new Error('Failed to fetch models');
    }
    const data = await response.json();
    // Filter free models (prompt price is 0 or 0.0)
    freeModels = data.data
      .filter(m => m.pricing?.prompt === '0' || m.pricing?.prompt === '0.0')
      .map(m => m.id)
      .sort(); // Sort alphabetically for consistent ordering
    console.log('%c✓ Loaded ' + freeModels.length + ' free models from OpenRouter', 'color: #10b981');
  } catch (error) {
    console.warn('Failed to fetch free models, using fallback list:', error);
    modelsFetchFailed = true;
    // Fallback list of known free models
    freeModels = [
      'arcee-ai/trinity-large-preview:free',
      'google/gemma-3-12b-it:free',
      'google/gemma-3-27b-it:free',
      'google/gemma-3-4b-it:free',
      'mistralai/mistral-small-3.1-24b-instruct:free',
      'stepfun/step-3.5-flash:free',
      'deepseek/deepseek-r1-0528:free',
      'nvidia/nemotron-3-nano-30b-a3b:free',
    ];
  }
}

// Get next available model
function getNextModel() {
  if (freeModels.length === 0) {
    return config.model || 'arcee-ai/trinity-large-preview:free';
  }
  const model = freeModels[currentModelIndex % freeModels.length];
  currentModelIndex++;
  return model;
}

// Reset model index for new conversation
function resetModelIndex() {
  currentModelIndex = 0;
}

// Direct OpenRouter API call with SSE streaming and fallback
async function sendMessageWithStreaming(message, context, apiKey) {
  const provider = config.provider || 'openrouter';
  // Use configured model, or start with first free model
  let model = config.model || null;

  // If no model specified, we'll use free models
  if (!model) {
    if (freeModels.length === 0 && !modelsFetchFailed) {
      await fetchFreeModels();
    }
    model = getNextModel();
    console.log('%c🔄 Using free model: ' + model, 'color: #3b82f6');
  }

  let apiUrl = '';
  let headers = {
    'Content-Type': 'application/json',
    'HTTP-Referer': window.location.href,
  };

  // Configure based on provider
  if (provider === 'openrouter') {
    apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
    headers['Authorization'] = `Bearer ${apiKey}`;
  } else if (provider === 'anthropic') {
    apiUrl = 'https://api.anthropic.com/v1/messages';
    headers['x-api-key'] = apiKey;
    headers['anthropic-version'] = '2023-06-01';
  } else if (provider === 'openai') {
    apiUrl = 'https://api.openai.com/v1/chat/completions';
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  // Build messages array
  const systemMessage = context ?
    `You are a helpful support assistant. Use the following knowledge base to answer questions:\n\n${context}\n\nIf the knowledge base doesn't contain relevant information, say so politely and offer to connect with a human agent.` :
    'You are a helpful support assistant.';

  const messages = provider === 'anthropic' ? [
    { role: 'user', content: message }
  ] : [
    { role: 'system', content: systemMessage },
    { role: 'user', content: message }
  ];

  // Request body
  const body = provider === 'anthropic' ? {
    model: model,
    system: systemMessage,
    messages: messages,
    max_tokens: 4096,
    stream: true
  } : {
    model: model,
    messages: messages,
    stream: true
  };

  // Try with current model, fallback to next free model on error
  let lastError = null;
  let maxRetries = freeModels.length > 0 ? Math.min(freeModels.length, 5) : 1;
  let response;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    if (!config.model) {
      model = getNextModel();
      body.model = model;
      console.log('%c🔄 Attempt ' + (attempt + 1) + '/' + maxRetries + ' with model: ' + model, 'color: #f59e0b');
    }

    try {
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorText = await response.text();
        // If using free models and this is not the last attempt, try next model
        if (!config.model && attempt < maxRetries - 1) {
          console.warn('%c⚠️ Model ' + model + ' failed, trying next free model...', 'color: #f59e0b');
          continue;
        }
        throw new Error(`API error (${response.status}): ${errorText}`);
      }

      // Success! Break out of retry loop
      console.log('%c✅ Model ' + model + ' responded successfully', 'color: #10b981');
      break;
    } catch (err) {
      lastError = err;
      // If using free models and this is not the last attempt, try next model
      if (!config.model && attempt < maxRetries - 1) {
        console.warn('%c⚠️ Request failed with ' + model + ', trying next free model...', 'color: #f59e0b');
        continue;
      }
      throw err;
    }
  }

  // If we exhausted all retries without a configured model
  if (lastError && !config.model && freeModels.length > 0) {
    throw new Error('All free models failed. Please provide your own API key for better reliability.');
  }

  // Parse SSE stream
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let fullResponse = '';

  return {
    reader,
    decoder,
    buffer,
    fullResponse,
    parseStream: async function(onChunk, onComplete) {
        while (true) {
          const { done, value } = await this.reader.read();
          if (done) break;

          this.buffer += this.decoder.decode(value, { stream: true });

          // SSE format: "data: {...}\n\n"
          const lines = this.buffer.split('\n\n');
          this.buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();

              if (data === '[DONE]') continue;

              try {
                let json;
                if (provider === 'openrouter') {
                  json = JSON.parse(data);
                  if (json.choices?.[0]?.delta?.content) {
                    const token = json.choices[0].delta.content;
                    this.fullResponse += token;
                    onChunk(token);
                  }
                } else if (provider === 'anthropic') {
                  json = JSON.parse(data);
                  if (json.type === 'content_block_delta' && json.delta?.text) {
                    const token = json.delta.text;
                    this.fullResponse += token;
                    onChunk(token);
                  }
                } else if (provider === 'openai') {
                  json = JSON.parse(data);
                  if (json.choices?.[0]?.delta?.content) {
                    const token = json.choices[0].delta.content;
                    this.fullResponse += token;
                    onChunk(token);
                  }
                }
              } catch (e) {
                // Skip invalid JSON
                console.warn('Failed to parse SSE data:', data);
              }
            }
          }
        }

      if (onComplete) onComplete(this.fullResponse);
    }
  };
}

// Get API key from settings
async function getApiKey() {
  // Check settings (localStorage)
  const settings = loadSettings();
  if (settings.apiKey) {
    return settings.apiKey;
  }

  // No key stored - show settings modal
  openSettings();

  // Return a promise that resolves when settings are saved
  return new Promise((resolve, reject) => {
    const checkSettings = () => {
      const newSettings = loadSettings();
      if (newSettings.apiKey) {
        resolve(newSettings.apiKey);
      } else {
        reject(new Error('API key is required. Please enter your OpenRouter API key in Settings.'));
      }
    };

    // Set up one-time listener for save button
    const saveBtn = document.getElementById('sc-save-settings');
    if (saveBtn) {
      const originalHandler = saveBtn.onclick;
      saveBtn.onclick = (e) => {
        if (originalHandler) originalHandler(e);
        setTimeout(checkSettings, 100);
      };
    }
  });
}


  // DOM Elements - will be initialized when elements are available
  let container, chatButton, chatWindow, closeButton, messagesContainer, inputField, sendButton, escalationNotice;
  let isOpen = false;
  let conversationHistory = [];
  let apiKeyCache = null;
  let isDragging = false;
  let dragOffset = { x: 0, y: 0 };
  let savedPosition = { x: null, y: null };

  // Initialize DOM elements
  function initElements() {
    container = document.getElementById('sc-widget-container');
    chatButton = document.getElementById('sc-chat-button');
    chatWindow = document.getElementById('sc-chat-window');
    closeButton = document.getElementById('sc-close-button');
    messagesContainer = document.getElementById('sc-messages');
    inputField = document.getElementById('sc-input-field');
    sendButton = document.getElementById('sc-send-button');
    escalationNotice = document.getElementById('sc-escalation-notice');

    return chatButton && chatWindow && closeButton && messagesContainer && inputField && sendButton;
  }

  // Toggle chat window
  async function toggleChat() {
    // Re-query chat window in case Svelte re-rendered it
    const win = document.getElementById('sc-chat-window');
    if (!win) {
      console.error('Chat window not found');
      return;
    }

    isOpen = !isOpen;
    win.classList.toggle('sc-open', isOpen);
    console.log('%c🔄 Chat toggled, isOpen:', 'color: #3b82f6', isOpen);
    if (isOpen) {
      const input = document.getElementById('sc-input-field');
      if (input) input.focus();
      // Fetch and log free models when chatbot opens (if not already fetched)
      if (freeModels.length === 0 && !modelsFetchFailed && !config.model) {
        await fetchFreeModels();
      }
      console.log('%c📱 Chatbot opened', 'color: #3b82f6; font-weight: bold');
      if (!config.model) {
        console.log('%cFree models available on OpenRouter (' + freeModels.length + ' total):', 'color: #6b7280; font-weight: bold');
        freeModels.slice(0, 5).forEach((m, i) => console.log('  ' + (i + 1) + '. ' + m));
        if (freeModels.length > 5) {
          console.log('  ... and ' + (freeModels.length - 5) + ' more');
        }
        console.log('%c✨ Chatbot will automatically try free models if one fails.', 'color: #10b981; font-style: italic');
      }
    }
  }

  // Add message to chat
  function addMessage(content, isUser = false, container = null) {
    const msgContainer = container || document.getElementById('sc-messages');
    if (!msgContainer) {
      console.error('Messages container not found');
      return;
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = 'sc-message ' + (isUser ? 'user' : 'bot');
    messageDiv.textContent = content;
    msgContainer.appendChild(messageDiv);
    msgContainer.scrollTop = msgContainer.scrollHeight;

    conversationHistory.push({
      role: isUser ? 'user' : 'assistant',
      content: content,
      timestamp: new Date().toISOString(),
    });

    // Save to localStorage
    saveConversation();
  }

  // Show typing indicator
  function showTyping(container = null) {
    const msgContainer = container || document.getElementById('sc-messages');
    if (!msgContainer) return;

    const typingDiv = document.createElement('div');
    typingDiv.className = 'sc-message typing';
    typingDiv.id = 'sc-typing';
    typingDiv.innerHTML = '<div class="sc-typing-indicator"><span></span><span></span><span></span></div>';
    msgContainer.appendChild(typingDiv);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  // Hide typing indicator
  function hideTyping() {
    const typing = document.getElementById('sc-typing');
    if (typing) {
      typing.remove();
    }
  }

  // Save conversation to localStorage
  function saveConversation() {
    try {
      localStorage.setItem('chatbot_conversation', JSON.stringify(conversationHistory));
    } catch (e) {
      console.warn('Could not save conversation:', e);
    }
  }

  // Load conversation from localStorage
  function loadConversation() {
    try {
      const saved = localStorage.getItem('chatbot_conversation');
      if (saved) {
        conversationHistory = JSON.parse(saved);
        return true;
      }
    } catch (e) {
      console.warn('Could not load conversation:', e);
    }
    return false;
  }

  // Restore conversation to UI
  function restoreConversation() {
    const messagesContainer = document.getElementById('sc-messages');
    if (!messagesContainer || conversationHistory.length === 0) return;

    // Clear existing messages
    messagesContainer.innerHTML = '';

    // Add each message
    conversationHistory.forEach(msg => {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'sc-message ' + (msg.role === 'user' ? 'user' : 'bot');
      messageDiv.textContent = msg.content;
      messagesContainer.appendChild(messageDiv);
    });

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Export conversation as text file
  function exportConversation() {
    if (conversationHistory.length === 0) {
      alert('No conversation to export yet.');
      return;
    }

    const lines = [
      '═══════════════════════════════════════════════════════════════',
      '                    BIBLE360 CHATBOT CONVERSATION',
      '═══════════════════════════════════════════════════════════════',
      '',
    ];

    conversationHistory.forEach(msg => {
      const timestamp = msg.timestamp ? new Date(msg.timestamp).toLocaleString() : '';
      const role = msg.role === 'user' ? 'YOU' : 'BIBLE360';
      lines.push(`[${timestamp}] ${role}:`);
      lines.push(msg.content);
      lines.push('');
      lines.push('───────────────────────────────────────────────────────────────');
      lines.push('');
    });

    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push(`Exported on: ${new Date().toLocaleString()}`);
    lines.push('═══════════════════════════════════════════════════════════════');

    const text = lines.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `bible360-chat-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('%c📥 Conversation exported', 'color: #10b981');
  }

  // Drag functionality for chatbot widget
  function initDrag() {
    if (!config.draggable?.enabled) return;

    const dragHandle = document.getElementById('sc-drag-handle');
    if (!dragHandle) return;

    // Mouse events
    dragHandle.addEventListener('mousedown', startDrag);

    // Touch events
    dragHandle.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      startDrag({ clientX: touch.clientX, clientY: touch.clientY });
    }, { passive: false });

    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      drag({ clientX: touch.clientX, clientY: touch.clientY });
    }, { passive: false });

    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDragTouch);

    // Restore saved position on load
    if (config.rememberPosition && savedPosition.x !== null && container) {
      container.style.left = savedPosition.x + 'px';
      container.style.top = savedPosition.y + 'px';
    }
  }

  function startDrag(e) {
    if (!config.draggable) return;
    isDragging = true;
    if (container) container.classList.add('dragging');

    const rect = container.getBoundingClientRect();
    dragOffset.x = e.clientX - rect.left;
    dragOffset.y = e.clientY - rect.top;

    // Save initial position for potential restore
    const currentX = parseFloat(container.style.left) || 0;
    const currentY = parseFloat(container.style.top) || 0;
    savedPosition = { x: currentX.toString(), y: currentY.toString() };
  }

  function drag(e) {
    if (!isDragging || !container) return;

    e.preventDefault();

    const x = e.clientX - dragOffset.x;
    const y = e.clientY - dragOffset.y;

    // Constrain to viewport
    const maxX = window.innerWidth - 400;
    const maxY = window.innerHeight - 550;

    container.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
    container.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
    container.style.right = 'auto';
    container.style.bottom = 'auto';

    // Save position
    savedPosition = { x: container.style.left, y: container.style.top };

    // Store in localStorage
    try {
      localStorage.setItem('chatbot-position', JSON.stringify(savedPosition));
    } catch (e) {
      console.warn('Could not save position:', e);
    }
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    if (container) container.classList.remove('dragging');
  }

  function endDragTouch() {
    endDrag();
  }

  // Send message to AI
  async function sendMessage(message) {
    if (!message.trim()) return;

    // Re-query elements in case Svelte re-rendered them
    const input = document.getElementById('sc-input-field');
    const send = document.getElementById('sc-send-button');
    const messages = document.getElementById('sc-messages');

    if (!input || !send || !messages) {
      console.error('Chatbot elements not found');
      return;
    }

    // Add user message
    addMessage(message, true, messages);
    input.value = '';
    send.disabled = true;

    // Check for frustration
    const frustration = detectFrustration(message);
    if (frustration.shouldEscalate && config.escalationEnabled) {
      showTyping(messages);

      const escalationEl = document.getElementById('sc-escalation-notice');
      setTimeout(() => {
        hideTyping();
        if (escalationEl) escalationEl.style.display = 'block';
        setTimeout(() => {
          if (escalationEl) escalationEl.style.display = 'none';
          addMessage('I understand you need assistance. Let me connect you with a human agent who can better help you.', false, messages);
          if (config.oksomeUrl) {
            window.open(config.oksomeUrl, '_blank');
          }
        }, 1500);
      }, 500);

      send.disabled = false;
      input.focus();
      return;
    }

    // Search knowledge base
    const kb = searchKnowledge(message);
    showTyping(messages);

    // Create streaming message div
    const messageDiv = document.createElement('div');
    messageDiv.className = 'sc-message bot';
    messages.appendChild(messageDiv);

    try {
      // Get API key (cache it)
      if (!apiKeyCache) {
        apiKeyCache = await getApiKey();
      }

      // Send message with streaming
      const stream = await sendMessageWithStreaming(message, kb.context, apiKeyCache);

      hideTyping();

      await stream.parseStream(
        (token) => {
          messageDiv.textContent += token;
          messages.scrollTop = messages.scrollHeight;
        },
        (fullResponse) => {
          conversationHistory.push({
            role: 'assistant',
            content: fullResponse,
            timestamp: new Date().toISOString(),
          });
        }
      );

    } catch (error) {
      hideTyping();
      messageDiv.textContent = 'I apologize, I\'m having trouble connecting. Please check your API key or try again later.';
      console.error('Chatbot error:', error);
    } finally {
      send.disabled = false;
      input.focus();
    }
  }

  // Main initialization function
  function init() {
    // Try to initialize elements, retry if not ready
    if (!initElements()) {
      console.log('%c⏳ Chatbot waiting for DOM elements...', 'color: #f59e0b');
      setTimeout(init, 100);
      return;
    }

    // Load settings on init
    const settings = loadSettings();
    if (settings.model) {
      config.model = settings.model;
    }
    if (settings.apiKey) {
      apiKeyCache = settings.apiKey;
    }

    // Use event delegation for better compatibility with Svelte hydration
    document.addEventListener('click', (e) => {
      // Handle chat button click
      if (e.target.closest('#sc-chat-button')) {
        e.preventDefault();
        e.stopPropagation();
        toggleChat();
        return;
      }
      // Handle close button click
      if (e.target.closest('#sc-close-button')) {
        e.preventDefault();
        e.stopPropagation();
        toggleChat();
        return;
      }
      // Handle send button click
      if (e.target.closest('#sc-send-button')) {
        e.preventDefault();
        const input = document.getElementById('sc-input-field');
        if (input) sendMessage(input.value);
        return;
      }
      // Handle export button click
      if (e.target.closest('#sc-export-button')) {
        e.preventDefault();
        exportConversation();
        return;
      }
      // Handle settings button click
      if (e.target.closest('#sc-settings-button')) {
        e.preventDefault();
        e.stopPropagation();
        openSettings();
        return;
      }
      // Handle save settings button click
      if (e.target.closest('#sc-save-settings')) {
        e.preventDefault();
        const keyInput = document.getElementById('sc-api-key-input');
        const modelSelect = document.getElementById('sc-model-select');
        const apiKey = keyInput ? keyInput.value.trim() : '';
        const model = modelSelect ? modelSelect.value : '';

        if (!apiKey) {
          alert('Please enter an API key.');
          return;
        }

        saveSettings(apiKey, model);
        closeSettings();
        return;
      }
      // Handle cancel settings button click
      if (e.target.closest('#sc-cancel-settings')) {
        e.preventDefault();
        closeSettings();
        return;
      }
      // Close modal when clicking overlay
      if (e.target.id === 'sc-settings-modal') {
        closeSettings();
        return;
      }
    });

    // Re-query elements when needed for input handling
    document.addEventListener('keypress', (e) => {
      const input = document.getElementById('sc-input-field');
      if (e.target === input && e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(input.value);
      }
    });

    // Keyboard shortcut (Ctrl/Cmd + K)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleChat();
      }
    });

    console.log('%c🤖 Support chatbot initialized (client-side mode)', 'color: #10b981; font-weight: bold');
    console.log('%cProvider:', 'color: #6b7280', config.provider);
    console.log('%cModel:', 'color: #6b7280', config.model || '(auto-selecting from free models)');
    console.log('%cKnowledge chunks:', 'color: #6b7280', config.knowledgeBase?.metadata?.totalChunks || 0);
    console.log('%cAuto-open:', 'color: #6b7280', config.autoOpen ? 'enabled' : 'disabled');

    // Load saved conversation from localStorage
    if (loadConversation()) {
      restoreConversation();
      console.log('%c💾 Restored previous conversation (' + conversationHistory.length + ' messages)', 'color: #10b981');
    }

    // Fetch free models on initialization (needed for settings dropdown)
    fetchFreeModels().then(() => {
      if (freeModels.length > 0) {
        console.log('%c✓ Fetched ' + freeModels.length + ' free models for automatic fallback', 'color: #10b981');
      }
    }).catch(err => {
      console.warn('Failed to fetch free models:', err);
    });

    // Initialize drag functionality
    initDrag();

    // Auto-open chatbot on page load if configured
    if (config.autoOpen) {
      setTimeout(() => {
        if (!isOpen) {
          toggleChat();
        }
        // Show settings modal if no API key is stored
        if (!settings.apiKey) {
          setTimeout(() => {
            openSettings();
          }, 300);
        }
      }, 500);
    }
  }

  // Start initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
