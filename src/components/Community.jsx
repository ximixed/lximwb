import { useEffect, useMemo, useRef, useState } from 'react';

const animeAvatars = [
  { id: 'zoro', label: 'Zoro', image: '/pic/community/zoro.svg' },
  { id: 'naruto', label: 'Naruto', image: '/pic/community/naruto.svg' },
  { id: 'luffy', label: 'Luffy', image: '/pic/community/luffy.svg' },
  { id: 'saitama', label: 'Saitama', image: '/pic/community/saitama.svg' },
  { id: 'goku', label: 'Goku', image: '/pic/community/goku.svg' },
];

const starterMessages = [
  { id: 'starter-1', author: 'xim', avatar: 'zoro', text: 'Hey! Welcome to the community lounge ✨' },
  { id: 'starter-2', author: 'xim', avatar: 'naruto', text: 'Drop your nickname and jump in.' },
];

const STORAGE_KEYS = {
  nickname: 'community-nickname',
  avatar: 'community-avatar',
  messages: 'community-messages',
  portfolioViews: 'portfolio-view-count',
};

const safeRead = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ?? fallback;
  } catch (error) {
    return fallback;
  }
};

const safeReadNumber = (key, fallback = 0) => {
  const value = Number(safeRead(key, String(fallback)));
  return Number.isFinite(value) ? value : fallback;
};

const safeReadMessages = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.messages);
    return stored ? JSON.parse(stored) : starterMessages;
  } catch (error) {
    return starterMessages;
  }
};

function Community({ isActive = true }) {
  const [nickname, setNickname] = useState(() => safeRead(STORAGE_KEYS.nickname, 'Guest'));
  const [selectedAvatar, setSelectedAvatar] = useState(() => safeRead(STORAGE_KEYS.avatar, animeAvatars[0].id));
  const [messages, setMessages] = useState(() => safeReadMessages());
  const [draft, setDraft] = useState('');
  const [portfolioViews, setPortfolioViews] = useState(() => safeReadNumber(STORAGE_KEYS.portfolioViews, 0));
  const channelRef = useRef(null);
  const messageListRef = useRef(null);

  const selectedAvatarMeta = useMemo(
    () => animeAvatars.find((avatar) => avatar.id === selectedAvatar) || animeAvatars[0],
    [selectedAvatar]
  );

  useEffect(() => {
    const nextViews = safeReadNumber(STORAGE_KEYS.portfolioViews, 0) + 1;
    setPortfolioViews(nextViews);
    try {
      localStorage.setItem(STORAGE_KEYS.portfolioViews, String(nextViews));
    } catch (error) {
      // Ignore storage issues in private browsing or restricted environments.
    }
  }, []);

  useEffect(() => {
    if (!('BroadcastChannel' in window)) return undefined;

    const channel = new BroadcastChannel('community-chat');
    channelRef.current = channel;

    channel.onmessage = (event) => {
      const { type, payload } = event.data || {};

      if (type === 'message') {
        setMessages((prev) => {
          const alreadyExists = prev.some((item) => item.id === payload.id);
          return alreadyExists ? prev : [...prev, payload];
        });
      }

      if (type === 'profile') {
        if (payload.nickname) setNickname(payload.nickname || 'Guest');
        if (payload.avatar) setSelectedAvatar(payload.avatar);
      }
    };

    return () => channel.close();
  }, []);

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === STORAGE_KEYS.messages && event.newValue) {
        try {
          setMessages(JSON.parse(event.newValue));
        } catch (error) {
          // Ignore malformed storage data.
        }
      }

      if (event.key === STORAGE_KEYS.nickname && event.newValue) {
        setNickname(event.newValue || 'Guest');
      }

      if (event.key === STORAGE_KEYS.avatar && event.newValue) {
        setSelectedAvatar(event.newValue || animeAvatars[0].id);
      }

      if (event.key === STORAGE_KEYS.portfolioViews && event.newValue) {
        const count = Number(event.newValue);
        if (Number.isFinite(count)) {
          setPortfolioViews(count);
        }
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const saveProfile = (nextAvatar = selectedAvatar) => {
    const savedNickname = (nickname || '').trim() || 'Guest';
    const savedAvatar = nextAvatar || animeAvatars[0].id;

    setNickname(savedNickname);
    setSelectedAvatar(savedAvatar);

    try {
      localStorage.setItem(STORAGE_KEYS.nickname, savedNickname);
      localStorage.setItem(STORAGE_KEYS.avatar, savedAvatar);
    } catch (error) {
      // Ignore storage issues in private browsing or restricted environments.
    }

    channelRef.current?.postMessage({
      type: 'profile',
      payload: { nickname: savedNickname, avatar: savedAvatar },
    });
  };

  const appendMessage = (nextMessage) => {
    setMessages((prev) => {
      const merged = [...prev, nextMessage];
      try {
        localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(merged));
      } catch (error) {
        // Ignore storage issues in private browsing or restricted environments.
      }
      return merged;
    });
  };

  const handleSend = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    const nextMessage = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      author: nickname.trim() || 'Guest',
      avatar: selectedAvatar,
      text: trimmed,
    };

    appendMessage(nextMessage);
    setDraft('');
    channelRef.current?.postMessage({ type: 'message', payload: nextMessage });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <section id="community" className={`page-section ${isActive ? 'active' : ''}`}>
      <div className="community-wrap">
        <div className="community-header-row">
          <div>
            <p className="community-kicker">Community</p>
            <h2>Visitor Lounge</h2>
          </div>
          <div className="community-header-badges">
            <span className="community-live-badge">Live</span>
            <span className="community-view-badge">Views: {portfolioViews}</span>
          </div>
        </div>

        <div className="community-card">
          <div className="community-form">
            <label className="community-field">
              <span>Nickname</span>
              <input
                type="text"
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                placeholder="Enter your nickname"
                maxLength={18}
              />
            </label>

            <div className="community-save-row">
              <button type="button" className="btn btn-secondary community-save-btn" onClick={saveProfile}>
                Save
              </button>

              <button type="button" className="btn btn-secondary community-save-profile-btn" onClick={saveProfile}>
                Save profile
              </button>
            </div>

            <div className="community-avatar-picker">
              <span>Anime style avatar</span>
              <div className="avatar-options">
                {animeAvatars.map((avatar) => (
                  <button
                    key={avatar.id}
                    type="button"
                    className={`avatar-option ${selectedAvatar === avatar.id ? 'selected' : ''}`}
                    onClick={() => saveProfile(avatar.id)}
                    aria-label={`Select ${avatar.label} avatar`}
                    title={avatar.label}
                  >
                    <img src={avatar.image} alt={avatar.label} className="avatar-face" />
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="community-chat-box">
            <div className="community-chat-header">
              <div className="community-user-identity">
                <img src={selectedAvatarMeta.image} alt={selectedAvatarMeta.label} className="community-preview-avatar" />
                <div>
                  <strong>{nickname.trim() || 'Guest'}</strong>
                  <small>online</small>
                </div>
              </div>
            </div>

            <div ref={messageListRef} className="community-message-list">
              {messages.map((message, index) => (
                <div key={message.id || `${message.author}-${index}`} className="community-message">
                  <img
                    src={animeAvatars.find((avatar) => avatar.id === message.avatar)?.image || animeAvatars[0].image}
                    alt={animeAvatars.find((avatar) => avatar.id === message.avatar)?.label || 'Avatar'}
                    className="community-message-avatar"
                  />
                  <div className="community-message-body">
                    <div className="community-message-meta">
                      <span>{message.author}</span>
                    </div>
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="community-input-row">
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Share a thought with the community..."
                rows={2}
              />
              <button type="button" className="btn btn-primary" onClick={handleSend}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Community;
