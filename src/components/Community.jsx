import { useMemo, useState } from 'react';

const animeAvatars = [
  { id: 'sailor', label: 'Sailor', color: '#8b5cf6' },
  { id: 'sun', label: 'Sun', color: '#f59e0b' },
  { id: 'moon', label: 'Moon', color: '#60a5fa' },
  { id: 'rose', label: 'Rose', color: '#f472b6' },
  { id: 'midnight', label: 'Midnight', color: '#34d399' },
  { id: 'shadow', label: 'Shadow', color: '#f87171' },
];

const starterMessages = [
  { author: 'Aoi', avatar: 'sun', text: 'Hey! Welcome to the community lounge ✨' },
  { author: 'Kaito', avatar: 'moon', text: 'Drop your nickname and jump in.' },
  { author: 'Mina', avatar: 'rose', text: 'Share your projects, ideas, or favorite anime vibes.' },
];

function Community({ isActive = true }) {
  const [nickname, setNickname] = useState('Guest');
  const [selectedAvatar, setSelectedAvatar] = useState('sailor');
  const [messages, setMessages] = useState(starterMessages);
  const [draft, setDraft] = useState('');

  const selectedAvatarMeta = useMemo(
    () => animeAvatars.find((avatar) => avatar.id === selectedAvatar) || animeAvatars[0],
    [selectedAvatar]
  );

  const handleSend = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      {
        author: nickname.trim() || 'Guest',
        avatar: selectedAvatar,
        text: trimmed,
      },
    ]);
    setDraft('');
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
          <span className="community-live-badge">Live</span>
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

            <div className="community-avatar-picker">
              <span>Anime style avatar</span>
              <div className="avatar-options">
                {animeAvatars.map((avatar) => (
                  <button
                    key={avatar.id}
                    type="button"
                    className={`avatar-option ${selectedAvatar === avatar.id ? 'selected' : ''}`}
                    onClick={() => setSelectedAvatar(avatar.id)}
                    aria-label={`Select ${avatar.label} avatar`}
                    title={avatar.label}
                    style={{ '--avatar-color': avatar.color }}
                  >
                    <span className="avatar-face">{avatar.label.slice(0, 1)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="community-chat-box">
            <div className="community-chat-header">
              <div className="community-user-identity">
                <span className="community-preview-avatar" style={{ '--avatar-color': selectedAvatarMeta.color }}>
                  {selectedAvatarMeta.label.slice(0, 1)}
                </span>
                <div>
                  <strong>{nickname.trim() || 'Guest'}</strong>
                  <small>online</small>
                </div>
              </div>
            </div>

            <div className="community-message-list">
              {messages.map((message, index) => (
                <div key={`${message.author}-${index}`} className="community-message">
                  <span
                    className="community-message-avatar"
                    style={{ '--avatar-color': animeAvatars.find((avatar) => avatar.id === message.avatar)?.color || '#8b5cf6' }}
                  >
                    {(animeAvatars.find((avatar) => avatar.id === message.avatar)?.label || 'A').slice(0, 1)}
                  </span>
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
