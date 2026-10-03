import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Loader2, MessageSquare } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const SYSTEM_PROMPT = `You are a helpful AI assistant embedded in Ilsim Sayon's personal portfolio website.

About Ilsim Sayon:
- Name: Ilsim Sayon
- Role: Front-End Web Developer
- Currently: 2nd Year BS Information Systems student at Mount Carmel College Escalante Inc. (MCCEI)
- Email: ilsimsayon@gmail.com
- GitHub: https://github.com/ximixed
- Skills: HTML, CSS, JavaScript, React, PHP, responsive design, UI/UX
- Available for work and collaborations
- Location: Philippines

Projects:
1. SAYON STORE - A responsive tech storefront with product search, cart management, checkout, and PHP API integration (Sep 2026)
2. Library Books - Clean mobile-first restaurant discovery and food ordering app concept (Aug 2026)
3. Information Systems Workspace - Clean web tools and responsive UI components for student management and academic workflows (Jul 2026)

You can answer general questions, help with coding, or tell visitors about Ilsim and his work.
Keep responses concise and friendly. If asked about Ilsim's contact or availability for hire, encourage them to reach out via email.`;

const API_KEY = typeof import.meta.env.VITE_GEMINI_API_KEY === 'string'
  ? import.meta.env.VITE_GEMINI_API_KEY.trim()
  : '';

const isPlaceholderKey = /paste_your_key_here|your_key_here|replace_me|example|AIzaSyA/i.test(API_KEY);
const hasValidApiKey = Boolean(API_KEY) && !isPlaceholderKey;
const chatbotStatus = hasValidApiKey ? 'Online' : 'Offline';
const offlineMessage = 'I\'m in offline mode right now. Add a real VITE_GEMINI_API_KEY to your .env file to enable live AI responses.';

function ChatBot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi! I'm Ilsim's AI assistant. Ask me anything about his work, skills, or just chat! 👋",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [prevInteractionId, setPrevInteractionId] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    if (!hasValidApiKey) {
      setMessages((prev) => [
        ...prev,
        { role: 'user', text },
        {
          role: 'assistant',
          text: offlineMessage,
        },
      ]);
      setInput('');
      return;
    }

    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');
    setLoading(true);

    setMessages((prev) => [...prev, { role: 'assistant', text: '', streaming: true }]);

    try {
      const client = new GoogleGenAI({ apiKey: API_KEY });
      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text }] }],
        config: {
          systemInstruction: SYSTEM_PROMPT,
        },
      });

      const fullText =
        response?.text ||
        response?.candidates?.[0]?.content?.parts
          ?.map((part) => part?.text || '')
          .join('') ||
        'No response received from the model.';

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', text: fullText };
        return updated;
      });
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          text: `Error: ${err.message || 'Something went wrong. Please try again.'}`,
          error: true,
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={`chatbot-panel ${isOpen ? 'open' : ''}`} role="dialog" aria-label="AI Chatbot">
      {/* Header */}
      <div className="chatbot-header">
        <div className="chatbot-header-left">
          <Bot size={16} strokeWidth={2} className="chatbot-bot-icon" />
          <div>
            <span className="chatbot-title">AI Assistant</span>
            <span className="chatbot-status">
              <span className={`chatbot-status-dot ${hasValidApiKey ? 'online' : 'offline'}`} />
              {chatbotStatus}
            </span>
          </div>
        </div>
        <button className="chatbot-close-btn" onClick={onClose} title="Close chat" aria-label="Close chat">
          <X size={15} strokeWidth={2} />
        </button>
      </div>

      {/* Messages */}
      <div className="chatbot-messages" role="log" aria-live="polite">
        {messages.map((msg, i) => (
          <div key={i} className={`chatbot-msg chatbot-msg-${msg.role} ${msg.error ? 'chatbot-msg-error' : ''}`}>
            {msg.role === 'assistant' && (
              <span className="chatbot-msg-avatar">
                <Bot size={13} strokeWidth={2} />
              </span>
            )}
            <div className="chatbot-msg-bubble">
              {msg.text || (msg.streaming && <span className="chatbot-cursor" />)}
              {msg.streaming && msg.text && <span className="chatbot-cursor" />}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="chatbot-input-row">
        <textarea
          ref={inputRef}
          className="chatbot-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask me anything…"
          rows={1}
          disabled={loading}
          aria-label="Chat message input"
        />
        <button
          className="chatbot-send-btn"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          title="Send message"
          aria-label="Send message"
        >
          {loading ? <Loader2 size={15} strokeWidth={2} className="chatbot-spinner" /> : <Send size={15} strokeWidth={2} />}
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
