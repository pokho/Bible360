
// Support Chatbot - Client-Side Mode (works on static hosting)
(function() {
  'use strict';

  const config = {
    instanceName: 'bible360',
    brandName: 'Bible360',
    provider: 'openrouter',
    model: 'meta-llama/llama-3-8b-instruct:free',
    apiKey: undefined,
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

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    if (!config.model) {
      model = getNextModel();
      body.model = model;
      console.log('%c🔄 Attempt ' + (attempt + 1) + '/' + maxRetries + ' with model: ' + model, 'color: #f59e0b');
    }

    try {
      const response = await fetch(apiUrl, {
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
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// Get or prompt for API key
async function getApiKey() {
  // Check environment variable (build-time)
  if (config.apiKey) {
    return config.apiKey;
  }

  // Check localStorage (runtime)
  const storedKey = localStorage.getItem('chatbot_api_key');
  if (storedKey) {
    return storedKey;
  }

  // Prompt user for API key
  const key = prompt(
    'Enter your ' + config.provider.toUpperCase() + ' API key:\n\n' +
    'Your key will be stored locally in your browser for future use.'
  );

  if (key && key.trim().length > 0) {
    localStorage.setItem('chatbot_api_key', key.trim());
    return key.trim();
  }

  throw new Error('API key is required for client-side chatbot');
}


  // DOM Elements
  const container = document.getElementById('sc-widget-container');
  const chatButton = document.getElementById('sc-chat-button');
  const chatWindow = document.getElementById('sc-chat-window');
  const closeButton = document.getElementById('sc-close-button');
  const messagesContainer = document.getElementById('sc-messages');
  const inputField = document.getElementById('sc-input-field');
  const sendButton = document.getElementById('sc-send-button');
  const escalationNotice = document.getElementById('sc-escalation-notice');

  let isOpen = false;
  let conversationHistory = [];
  let apiKeyCache = null;

  // Toggle chat window
  async function toggleChat() {
    isOpen = !isOpen;
    chatWindow.classList.toggle('sc-open', isOpen);
    if (isOpen) {
      inputField.focus();
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
  function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'sc-message ' + (isUser ? 'user' : 'bot');
    messageDiv.textContent = content;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    conversationHistory.push({
      role: isUser ? 'user' : 'assistant',
      content: content,
      timestamp: new Date().toISOString(),
    });
  }

  // Show typing indicator
  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'sc-message typing';
    typingDiv.id = 'sc-typing';
    typingDiv.innerHTML = '<div class="sc-typing-indicator"><span></span><span></span><span></span></div>';
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Hide typing indicator
  function hideTyping() {
    const typing = document.getElementById('sc-typing');
    if (typing) {
      typing.remove();
    }
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
    if (config.draggable?.rememberPosition && savedPosition.x !== null) {
      widgetContainer.style.left = savedPosition.x + 'px';
      widgetContainer.style.top = savedPosition.y + 'px';
    }
  }

  function startDrag(e) {
    if (!config.draggable?.enabled) return;
    isDragging = true;
    widgetContainer.classList.add('dragging');

    const rect = widgetContainer.getBoundingClientRect();
    dragOffset.x = e.clientX - rect.left;
    dragOffset.y = e.clientY - rect.top;

    // Save initial position for potential restore
    const currentX = parseFloat(widgetContainer.style.left) || 0;
    const currentY = parseFloat(widgetContainer.style.top) || 0;
    savedPosition = { x: currentX.toString(), y: currentY.toString() };
  }

  function drag(e) {
    if (!isDragging) return;

    e.preventDefault();

    const x = e.clientX - dragOffset.x;
    const y = e.clientY - dragOffset.y;

    // Constrain to viewport
    const maxX = window.innerWidth - 400;
    const maxY = window.innerHeight - 550;

    widgetContainer.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
    widgetContainer.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
    widgetContainer.style.right = 'auto';
    widgetContainer.style.bottom = 'auto';

    // Save position
    savedPosition = { x: widgetContainer.style.left, y: widgetContainer.style.top };

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
    widgetContainer.classList.remove('dragging');
  }

  function endDragTouch() {
    endDrag();
  }

  // Send message to AI
  async function sendMessage(message) {
    if (!message.trim()) return;

    // Add user message
    addMessage(message, true);
    inputField.value = '';
    sendButton.disabled = true;

    // Check for frustration
    const frustration = detectFrustration(message);
    if (frustration.shouldEscalate && config.escalationEnabled) {
      showTyping();

      setTimeout(() => {
        hideTyping();
        escalationNotice.style.display = 'block';
        setTimeout(() => {
          escalationNotice.style.display = 'none';
          addMessage('I understand you need assistance. Let me connect you with a human agent who can better help you.', false);
          if (config.oksomeUrl) {
            window.open(config.oksomeUrl, '_blank');
          }
        }, 1500);
      }, 500);

      sendButton.disabled = false;
      inputField.focus();
      return;
    }

    // Search knowledge base
    const kb = searchKnowledge(message);
    showTyping();

    // Create streaming message div
    const messageDiv = document.createElement('div');
    messageDiv.className = 'sc-message bot';
    messagesContainer.appendChild(messageDiv);

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
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
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
      sendButton.disabled = false;
      inputField.focus();
    }
  }

  // Event listeners
  chatButton.addEventListener('click', toggleChat);
  closeButton.addEventListener('click', toggleChat);

  sendButton.addEventListener('click', () => {
    sendMessage(inputField.value);
  });

  inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputField.value);
    }
  });

  // Keyboard shortcut (Ctrl/Cmd + K)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      toggleChat();
    }
  });

  // Initialize
  console.log('%c🤖 Support chatbot initialized (client-side mode)', 'color: #10b981; font-weight: bold');
  console.log('%cProvider:', 'color: #6b7280', config.provider);
  console.log('%cModel:', 'color: #6b7280', config.model || '(auto-selecting from free models)');
  console.log('%cKnowledge chunks:', 'color: #6b7280', config.knowledgeBase?.metadata?.totalChunks || 0);
  console.log('%cAuto-open:', 'color: #6b7280', config.autoOpen ? 'enabled' : 'disabled');

  // Fetch free models on initialization if no model is configured
  if (!config.model) {
    fetchFreeModels().then(() => {
      if (freeModels.length > 0) {
        console.log('%c✓ Fetched ' + freeModels.length + ' free models for automatic fallback', 'color: #10b981');
      }
    }).catch(err => {
      console.warn('Failed to fetch free models:', err);
    });
  }

  // Initialize drag functionality
  initDrag();

  // Auto-open chatbot on page load if configured
  if (config.autoOpen) {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
          if (!isOpen) {
            toggleChat();
          }
        }, 500);
      });
    } else {
      // DOM is already loaded
      setTimeout(() => {
        if (!isOpen) {
          toggleChat();
        }
      }, 500);
    }
  }
})();
