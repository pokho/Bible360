
// Support Chatbot - Client-Side Mode (works on static hosting)
(function() {
  'use strict';

  const config = {
    instanceName: 'bible360',
    brandName: 'Bible360',
    provider: 'openrouter',
    model: 'meta-llama/llama-3-8b-instruct:free',
    apiKey: undefined,
    knowledgeBase: {"chunks":[],"metadata":{"version":"1.0.0","exportedAt":"2026-02-12T17:21:52.958Z","totalChunks":0,"categories":[],"compressed":false}},
    escalationEnabled: false,
    oksomeUrl: '',
    escalationThreshold: 50,
    mode: 'support',
    autoOpen: true,
  };

  
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

  
// Direct OpenRouter API call with SSE streaming
async function sendMessageWithStreaming(message, context, apiKey) {
  const provider = config.provider || 'openrouter';
  // Use free model as default when no model is specified
  const model = config.model || 'meta-llama/llama-3-8b-instruct:free';

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

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error (${response.status}): ${errorText}`);
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
  function toggleChat() {
    isOpen = !isOpen;
    chatWindow.classList.toggle('sc-open', isOpen);
    if (isOpen) {
      inputField.focus();
      // Log free models when chatbot opens
      console.log('%c📱 Chatbot opened', 'color: #3b82f6; font-weight: bold');
      console.log('%cCurrent free models available on OpenRouter:', 'color: #6b7280; font-weight: bold');
      console.log('  1. meta-llama/llama-3-8b-instruct:free');
      console.log('  2. mistralai/mistral-7b-instruct:free');
      console.log('  3. mistralai/mistral-tiny:free');
      console.log('  4. gryphe/mythomax-l2-13b:free');
      console.log('  5. teknium/openhermes-2.5-mistral-7b:free');
      console.log('%cModel will auto-select from free tier if default model fails.', 'color: #f59e0b; font-style: italic');
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
  console.log('%cModel:', 'color: #6b7280', config.model);
  console.log('%cKnowledge chunks:', 'color: #6b7280', config.knowledgeBase?.metadata?.totalChunks || 0);
  console.log('%cAuto-open:', 'color: #6b7280', config.autoOpen ? 'enabled' : 'disabled');

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
