import { useMemo, useState } from 'react';

const animeAvatars = [
  { id: 'zoro', label: 'Zoro', image: '/pic/community/zoro.svg' },
  { id: 'naruto', label: 'Naruto', image: '/pic/community/naruto.svg' },
  { id: 'luffy', label: 'Luffy', image: '/pic/community/luffy.svg' },
  { id: 'saitama', label: 'Saitama', image: '/pic/community/saitama.svg' },
  { id: 'goku', label: 'Goku', image: '/pic/community/goku.svg' },
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

            <div className="community-message-list">
              {messages.map((message, index) => (
                <div key={`${message.author}-${index}`} className="community-message">
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
