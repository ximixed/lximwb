import { useState, useEffect, useRef } from 'react';
import { X, RotateCcw, Trophy, Zap, Clock, Target, CheckCircle2, Flame, Trending2, BarChart3, Settings } from 'lucide-react';
import { playClickSound } from '../utils/audio.js';

// Enhanced quotes organized by difficulty
const QUOTE_CATEGORIES = {
  easy: [
    "Clean code always looks like it was written by someone who cares.",
    "First, solve the problem. Then, write the code.",
    "The best way to predict the future is to invent it.",
    "Code is poetry; make it beautiful.",
    "Simplicity is the ultimate sophistication."
  ],
  medium: [
    "Simplicity is prerequisite for reliability and maintainability.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "The function of good software is to make the complex appear to be simple.",
    "Make it work, make it right, make it fast, but always keep it clean.",
    "Learning web development is a marathon, not a sprint. Consistency always wins.",
    "Great software isn't just about syntax; it's about turning rough ideas into solutions people actually love."
  ],
  hard: [
    "The most important property of a program is that it accomplishes the intention of the programmer.",
    "Experience is the name everyone gives to their mistakes, so learn from every keystroke.",
    "Premature optimization is the root of all evil. Focus on clarity first, then performance.",
    "Every expert was once a beginner who refused to give up on their goals.",
    "In programming, we don't just solve problems; we architect elegant systems of thought."
  ]
};

function TypingTest({ isOpen, onClose, soundEnabled = false }) {
  // Test configuration
  const [testMode, setTestMode] = useState('quote'); // 'quote', 'timed', 'wordCount'
  const [difficulty, setDifficulty] = useState('medium'); // 'easy', 'medium', 'hard'
  const [showSettings, setShowSettings] = useState(true);
  const [timedDuration, setTimedDuration] = useState(60);
  const [wordCountTarget, setWordCountTarget] = useState(50);
  
  // Test state
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  
  // Stats
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('typingStats');
    return saved ? JSON.parse(saved) : { totalTests: 0, bestWpm: 0, avgAccuracy: 100, allScores: [] };
  });
  const [showStats, setShowStats] = useState(false);

  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const testTimerRef = useRef(null);

  const getCurrentQuotes = () => QUOTE_CATEGORIES[difficulty];
  const targetText = getCurrentQuotes()[quoteIndex];
  const wordCount = inputVal.trim().split(/\s+/).filter(w => w.length > 0).length;

  // Auto focus and reset when opening
  useEffect(() => {
    if (isOpen) {
      setShowSettings(true);
      setInputVal('');
      setStartTime(null);
      setWpm(0);
      setAccuracy(100);
      setIsFinished(false);
      setElapsedSeconds(0);
      setQuoteIndex(0);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Timer for elapsed time display
  useEffect(() => {
    if (startTime && !isFinished) {
      timerRef.current = setInterval(() => {
        const seconds = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
        setElapsedSeconds(seconds);
      }, 500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTime, isFinished]);

  // Timed mode timer - auto-finish when time runs out
  useEffect(() => {
    if (testMode === 'timed' && startTime && !isFinished) {
      testTimerRef.current = setInterval(() => {
        const seconds = Math.floor((Date.now() - startTime) / 1000);
        if (seconds >= timedDuration) {
          finishTest();
          if (testTimerRef.current) clearInterval(testTimerRef.current);
        }
      }, 100);
    }
    return () => {
      if (testTimerRef.current) clearInterval(testTimerRef.current);
    };
  }, [startTime, isFinished, testMode, timedDuration]);

  // Save test result to stats
  const saveTestResult = (finalWpm, finalAccuracy) => {
    const newScore = { wpm: finalWpm, accuracy: finalAccuracy, date: new Date().toLocaleDateString(), mode: testMode, difficulty };
    const newStats = {
      totalTests: stats.totalTests + 1,
      bestWpm: Math.max(stats.bestWpm, finalWpm),
      avgAccuracy: Math.round((stats.avgAccuracy * stats.totalTests + finalAccuracy) / (stats.totalTests + 1)),
      allScores: [newScore, ...stats.allScores].slice(0, 20)
    };
    setStats(newStats);
    localStorage.setItem('typingStats', JSON.stringify(newStats));
  };

  // Finish the test
  const finishTest = () => {
    setIsFinished(true);
    if (timerRef.current) clearInterval(timerRef.current);
    if (testTimerRef.current) clearInterval(testTimerRef.current);
    saveTestResult(wpm, accuracy);
  };

  const resetTest = () => {
    setInputVal('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    setElapsedSeconds(0);
    if (timerRef.current) clearInterval(timerRef.current);
    if (testTimerRef.current) clearInterval(testTimerRef.current);
    
    // Pick next quote
    const quotes = getCurrentQuotes();
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const startNewTest = () => {
    setShowSettings(false);
    resetTest();
    setInputVal('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInputChange = (e) => {
    if (isFinished) return;

    const val = e.target.value;
    if (!startTime && val.length > 0) {
      setStartTime(Date.now());
    }

    if (soundEnabled) {
      playClickSound();
    }

    setInputVal(val);

    // Compute accuracy
    let correctChars = 0;
    const minLen = Math.min(val.length, targetText.length);
    for (let i = 0; i < minLen; i++) {
      if (val[i] === targetText[i]) correctChars++;
    }
    const acc = val.length > 0 ? Math.round((correctChars / val.length) * 100) : 100;
    setAccuracy(acc);

    // Compute WPM
    const timeInMins = startTime ? (Date.now() - startTime) / 60000 : 0.01;
    const wordsTyped = correctChars / 5;
    const currentWpm = Math.max(0, Math.round(wordsTyped / (timeInMins || 0.01)));
    setWpm(currentWpm);

    // Check completion based on test mode
    let shouldFinish = false;
    
    if (testMode === 'quote' && val.length >= targetText.length && val === targetText) {
      shouldFinish = true;
    } else if (testMode === 'wordCount' && wordCount >= wordCountTarget) {
      shouldFinish = true;
    }
    
    if (shouldFinish) {
      finishTest();
    }
  };

  if (!isOpen) return null;

  const timeRemaining = testMode === 'timed' ? Math.max(0, timedDuration - elapsedSeconds) : null;
  const isTimeUp = testMode === 'timed' && timeRemaining === 0;
  const progressPercent = testMode === 'wordCount' ? (wordCount / wordCountTarget) * 100 : 
                          testMode === 'timed' ? ((timedDuration - timeRemaining) / timedDuration) * 100 : 
                          (inputVal.length / targetText.length) * 100;

  return (
    <div className="typing-modal-backdrop" onClick={onClose}>
      <div
        className="typing-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="typing-test-title"
      >
        <div className="typing-modal-header">
          <div className="typing-modal-title-box">
            <span className="typing-pill-badge">
              <Zap size={14} strokeWidth={2.5} />
              SPEED TEST
            </span>
            <h2 id="typing-test-title" className="typing-heading">Typing Test</h2>
          </div>
          <div className="typing-header-actions">
            <button
              type="button"
              className="typing-icon-btn"
              onClick={() => setShowStats(!showStats)}
              title="View stats"
            >
              <BarChart3 size={18} />
            </button>
            <button
              type="button"
              className="typing-icon-btn"
              onClick={() => setShowSettings(true)}
              title="Settings"
            >
              <Settings size={18} />
            </button>
            <button
              type="button"
              className="typing-close-btn"
              onClick={onClose}
              aria-label="Close typing test"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Stats View */}
        {showStats && (
          <div className="typing-stats-panel">
            <h3>📊 Your Statistics</h3>
            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-label">Total Tests</span>
                <span className="stat-value">{stats.totalTests}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Best WPM</span>
                <span className="stat-value">{stats.bestWpm}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Avg Accuracy</span>
                <span className="stat-value">{stats.avgAccuracy}%</span>
              </div>
            </div>
            {stats.allScores.length > 0 && (
              <div className="leaderboard">
                <h4>Recent Scores</h4>
                <div className="score-list">
                  {stats.allScores.map((score, idx) => (
                    <div key={idx} className="score-item">
                      <span className="score-rank">#{idx + 1}</span>
                      <span className="score-wpm">{score.wpm} WPM</span>
                      <span className="score-acc">{score.accuracy}%</span>
                      <span className="score-date">{score.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Settings Panel */}
        {showSettings && (
          <div className="typing-settings-panel">
            <h3>⚙️ Test Settings</h3>
            
            <div className="settings-section">
              <label>Test Mode</label>
              <div className="mode-buttons">
                {['quote', 'timed', 'wordCount'].map(mode => (
                  <button
                    key={mode}
                    className={`mode-btn ${testMode === mode ? 'active' : ''}`}
                    onClick={() => setTestMode(mode)}
                  >
                    {mode === 'quote' && '📝 Quote'}
                    {mode === 'timed' && '⏱️ Timed'}
                    {mode === 'wordCount' && '📖 Words'}
                  </button>
                ))}
              </div>
            </div>

            <div className="settings-section">
              <label>Difficulty</label>
              <div className="difficulty-buttons">
                {['easy', 'medium', 'hard'].map(diff => (
                  <button
                    key={diff}
                    className={`diff-btn ${difficulty === diff ? 'active' : ''}`}
                    onClick={() => {
                      setDifficulty(diff);
                      setQuoteIndex(0);
                    }}
                  >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {testMode === 'timed' && (
              <div className="settings-section">
                <label>Duration: {timedDuration}s</label>
                <input
                  type="range"
                  min="30"
                  max="300"
                  step="30"
                  value={timedDuration}
                  onChange={(e) => setTimedDuration(parseInt(e.target.value))}
                  className="slider"
                />
              </div>
            )}

            {testMode === 'wordCount' && (
              <div className="settings-section">
                <label>Target Words: {wordCountTarget}</label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={wordCountTarget}
                  onChange={(e) => setWordCountTarget(parseInt(e.target.value))}
                  className="slider"
                />
              </div>
            )}

            <button
              type="button"
              className="btn btn-primary start-test-btn"
              onClick={startNewTest}
            >
              Start Test
            </button>
          </div>
        )}

        {/* Live Metrics Row */}
        {!showSettings && !showStats && (
          <>
            <div className="typing-metrics-bar">
              <div className="typing-metric">
                <span className="typing-metric-lbl">
                  <Zap size={13} /> WPM
                </span>
                <span className="typing-metric-val">{wpm}</span>
              </div>
              <div className="typing-metric">
                <span className="typing-metric-lbl">
                  <Target size={13} /> ACCURACY
                </span>
                <span className="typing-metric-val">{accuracy}%</span>
              </div>
              <div className="typing-metric">
                <span className="typing-metric-lbl">
                  <Clock size={13} /> {testMode === 'timed' ? 'REMAINING' : 'TIME'}
                </span>
                <span className={`typing-metric-val ${isTimeUp ? 'time-up' : ''}`}>
                  {testMode === 'timed' ? timeRemaining : elapsedSeconds}s
                </span>
              </div>
              {testMode === 'wordCount' && (
                <div className="typing-metric">
                  <span className="typing-metric-lbl">
                    📖 WORDS
                  </span>
                  <span className="typing-metric-val">{wordCount}/{wordCountTarget}</span>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="typing-progress-bar">
              <div className="progress-fill" style={{ width: `${Math.min(progressPercent, 100)}%` }}></div>
            </div>

            {/* Typing Display Box */}
            <div
              className="typing-text-display"
              onClick={() => inputRef.current && inputRef.current.focus()}
            >
          {targetText.split('').map((char, index) => {
            let status = 'untyped';
            if (index < inputVal.length) {
              status = inputVal[index] === char ? 'correct' : 'incorrect';
            }
            const isCursor = index === inputVal.length;

            return (
              <span
                key={index}
                className={`typing-char ${status} ${isCursor ? 'cursor' : ''}`}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Hidden / Focused Input */}
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={handleInputChange}
              className="typing-hidden-input"
              autoFocus
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              disabled={isFinished}
              placeholder="Click here and start typing..."
            />

            {/* Completion Celebration Card */}
            {isFinished ? (
          <div className="typing-finished-card">
            <div className="typing-finished-header">
              <Trophy size={26} className="trophy-icon" />
              <div>
                  <h3>Test Completed! 🎉</h3>
                <p>
                  You scored <strong>{wpm} WPM</strong> with <strong>{accuracy}% accuracy</strong>!
                </p>
              </div>
            </div>
              <div className="typing-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={resetTest}
                  >
                    <RotateCcw size={15} />
                    Try Again
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowSettings(true);
                      setIsFinished(false);
                    }}
                  >
                    Change Settings
                  </button>
                </div>
          </div>
        ) : (
          <div className="typing-bottom-actions">
            <button
              type="button"
              className="typing-reset-btn"
              onClick={resetTest}
              title="Reset & Next Quote"
            >
              <RotateCcw size={14} />
              <span>Reset Quote</span>
            </button>
            <span className="typing-hint">Press Esc to exit | Ctrl+R to reset</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TypingTest;
