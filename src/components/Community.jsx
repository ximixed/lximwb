import { useEffect, useMemo, useRef, useState } from 'react';

const animeAvatars = [
  { id: 'zoro', label: 'Zoro', image: '/pic/community/zoro.svg' },
  { id: 'naruto', label: 'Naruto', image: '/pic/community/naruto.svg' },
  { id: 'luffy', label: 'Luffy', image: '/pic/community/luffy.svg' },
  { id: 'saitama', label: 'Saitama', image: '/pic/community/saitama.svg' },
  { id: 'goku', label: 'Goku', image: '/pic/community/goku.svg' },
];

const starterMessages = [
  { id: 'starter-1', userId: 'system', email: 'hello@community.local', author: 'xim', avatar: 'zoro', text: 'Hey! Welcome to the community lounge ✨' },
  { id: 'starter-2', userId: 'system', email: 'hello@community.local', author: 'xim', avatar: 'naruto', text: 'Use your email to join and chat with other visitors.' },
];

const STORAGE_KEYS = {
  account: 'community-account',
  accounts: 'community-accounts',
  nickname: 'community-nickname',
  avatar: 'community-avatar',
  email: 'community-email',
  messages: 'community-messages',
  portfolioViews: 'portfolio-view-count',
  portfolioViewTracker: 'portfolio-view-email-tracker',
  visitors: 'community-visitor-log',
};

const normalizeEmail = (value = '') => value.trim().toLowerCase();

const makeUserId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `user-${Date.now()}-${Math.random().toString(16).slice(2)}`;
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

const readCurrentAccount = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.account);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

const readAccountsMap = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.accounts);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    return {};
  }
};

const readPortfolioViewTracker = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.portfolioViewTracker);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    return {};
  }
};

const readVisitorLog = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.visitors);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

function Community({ isActive = true }) {
  const currentAccount = readCurrentAccount();
  const [email, setEmail] = useState(() => normalizeEmail(currentAccount?.email || safeRead(STORAGE_KEYS.email, '')));
  const [nickname, setNickname] = useState(() => currentAccount?.name || safeRead(STORAGE_KEYS.nickname, 'Guest'));
  const [selectedAvatar, setSelectedAvatar] = useState(() => currentAccount?.avatar || safeRead(STORAGE_KEYS.avatar, animeAvatars[0].id));
  const [messages, setMessages] = useState(() => safeReadMessages());
  const [draft, setDraft] = useState('');
  const [portfolioViews, setPortfolioViews] = useState(() => safeReadNumber(STORAGE_KEYS.portfolioViews, 0));
  const [visitorLog, setVisitorLog] = useState(() => readVisitorLog());
  const [accountMessage, setAccountMessage] = useState('');
  const channelRef = useRef(null);
  const messageListRef = useRef(null);

  const selectedAvatarMeta = useMemo(
    () => animeAvatars.find((avatar) => avatar.id === selectedAvatar) || animeAvatars[0],
    [selectedAvatar]
  );

  useEffect(() => {
    const trackedEmail = normalizeEmail(readCurrentAccount()?.email || safeRead(STORAGE_KEYS.email, ''));
    const viewTracker = readPortfolioViewTracker();
    const sessionCountKey = 'community-portfolio-view-session';
    const alreadyCountedThisSession = sessionStorage.getItem(sessionCountKey) === 'true';

    if (trackedEmail) {
      if (viewTracker[trackedEmail]) {
        setPortfolioViews(safeReadNumber(STORAGE_KEYS.portfolioViews, 0));
        return;
      }

      const nextViews = safeReadNumber(STORAGE_KEYS.portfolioViews, 0) + 1;
      setPortfolioViews(nextViews);

      try {
        viewTracker[trackedEmail] = new Date().toISOString();
        localStorage.setItem(STORAGE_KEYS.portfolioViewTracker, JSON.stringify(viewTracker));
        localStorage.setItem(STORAGE_KEYS.portfolioViews, String(nextViews));
      } catch (error) {
        // Ignore storage issues in private browsing or restricted environments.
      }

      return;
    }

    if (alreadyCountedThisSession) {
      setPortfolioViews(safeReadNumber(STORAGE_KEYS.portfolioViews, 0));
      return;
    }

    const nextViews = safeReadNumber(STORAGE_KEYS.portfolioViews, 0) + 1;
    setPortfolioViews(nextViews);

    try {
      sessionStorage.setItem(sessionCountKey, 'true');
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
        if (payload.email && normalizeEmail(email) !== normalizeEmail(payload.email)) {
          setEmail(payload.email);
        }
        if (payload.nickname) setNickname(payload.nickname || 'Guest');
        if (payload.avatar) setSelectedAvatar(payload.avatar);
      }
    };

    return () => channel.close();
  }, [email]);

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

      if (event.key === STORAGE_KEYS.email && event.newValue) {
        setEmail(normalizeEmail(event.newValue));
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

  const syncVisitorLog = (visitor) => {
    const nextEmail = normalizeEmail(visitor?.email || '');
    if (!nextEmail) return;

    const nextName = (visitor?.name || nextEmail.split('@')[0] || 'Visitor').trim() || 'Visitor';
    const nextAvatar = visitor?.avatar || selectedAvatar || animeAvatars[0].id;
    const nextEntry = {
      email: nextEmail,
      name: nextName,
      avatar: nextAvatar,
      viewedAt: new Date().toISOString(),
    };

    const existingLog = readVisitorLog();
    const filtered = existingLog.filter((entry) => normalizeEmail(entry.email) !== nextEmail);
    const updated = [nextEntry, ...filtered].slice(0, 8);

    setVisitorLog(updated);

    try {
      localStorage.setItem(STORAGE_KEYS.visitors, JSON.stringify(updated));
    } catch (error) {
      // Ignore storage issues in private browsing or restricted environments.
    }
  };

  const persistAccount = (nextEmail = email, nextNickname = nickname, nextAvatar = selectedAvatar) => {
    const normalizedEmail = normalizeEmail(nextEmail);
    const safeNickname = (nextNickname || '').trim() || (normalizedEmail ? normalizedEmail.split('@')[0] : 'Guest');
    const safeAvatar = nextAvatar || animeAvatars[0].id;

    if (!normalizedEmail) {
      setAccountMessage('Please enter an email to save your community account.');
      return null;
    }

    const account = {
      id: currentAccount?.id || makeUserId(),
      email: normalizedEmail,
      name: safeNickname,
      avatar: safeAvatar,
      updatedAt: new Date().toISOString(),
    };

    const accounts = readAccountsMap();
    accounts[normalizedEmail] = account;

    try {
      localStorage.setItem(STORAGE_KEYS.account, JSON.stringify(account));
      localStorage.setItem(STORAGE_KEYS.accounts, JSON.stringify(accounts));
      localStorage.setItem(STORAGE_KEYS.email, normalizedEmail);
      localStorage.setItem(STORAGE_KEYS.nickname, safeNickname);
      localStorage.setItem(STORAGE_KEYS.avatar, safeAvatar);
    } catch (error) {
      // Ignore storage issues in private browsing or restricted environments.
    }

    setEmail(normalizedEmail);
    setNickname(safeNickname);
    setSelectedAvatar(safeAvatar);
    setAccountMessage(`Signed in as ${normalizedEmail}`);
    syncVisitorLog({ email: normalizedEmail, name: safeNickname, avatar: safeAvatar });

    channelRef.current?.postMessage({
      type: 'profile',
      payload: { email: normalizedEmail, nickname: safeNickname, avatar: safeAvatar },
    });

    return account;
  };

  const saveProfile = (nextAvatar = selectedAvatar) => {
    persistAccount(email, nickname, nextAvatar);
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

    const activeAccount = persistAccount(email, nickname, selectedAvatar);
    if (!activeAccount) {
      return;
    }

    const nextMessage = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      email: activeAccount.email,
      userId: activeAccount.id,
      author: activeAccount.name,
      avatar: activeAccount.avatar,
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

  const isCurrentUserMessage = (message) => normalizeEmail(message.email || '') === normalizeEmail(email);

  useEffect(() => {
    if (email) {
      syncVisitorLog({ email, name: nickname, avatar: selectedAvatar });
    }
  }, [email, nickname, selectedAvatar]);

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

        <div className="community-visitor-panel">
          <div className="community-visitor-head">
            <span>Recent visitors</span>
            <strong>{visitorLog.length}</strong>
          </div>

          <div className="community-visitor-list">
            {visitorLog.length === 0 ? (
              <p className="community-empty-state">No viewers yet</p>
            ) : (
              visitorLog.map((visitor) => (
                <div key={`${visitor.email}-${visitor.viewedAt}`} className="community-visitor-item">
                  <img
                    src={animeAvatars.find((avatar) => avatar.id === visitor.avatar)?.image || animeAvatars[0].image}
                    alt={visitor.name}
                    className="community-message-avatar"
                  />
                  <div>
                    <strong>{visitor.name}</strong>
                    <small>{visitor.email}</small>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="community-card">
          <div className="community-form">
            <div className="community-field-row">
              <label className="community-field">
                <span>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(normalizeEmail(event.target.value))}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </label>

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
            </div>

            <div className="community-save-row">
              <button type="button" className="btn btn-secondary community-save-btn" onClick={saveProfile}>
                Save account
              </button>

              <button type="button" className="btn btn-secondary community-save-profile-btn" onClick={() => saveProfile(selectedAvatar)}>
                Save profile
              </button>
            </div>

            {accountMessage ? <div className="community-account-status">{accountMessage}</div> : null}

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
                  <small>{email || 'Guest access'}</small>
                </div>
              </div>
            </div>

            <div ref={messageListRef} className="community-message-list">
              {messages.map((message, index) => (
                <div key={message.id || `${message.author}-${index}`} className={`community-message ${isCurrentUserMessage(message) ? 'mine' : ''}`}>
                  <img
                    src={animeAvatars.find((avatar) => avatar.id === message.avatar)?.image || animeAvatars[0].image}
                    alt={animeAvatars.find((avatar) => avatar.id === message.avatar)?.label || 'Avatar'}
                    className="community-message-avatar"
                  />
                  <div className="community-message-body">
                    <div className="community-message-meta">
                      <span>{message.author}</span>
                      {message.email ? <small>{message.email}</small> : null}
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
