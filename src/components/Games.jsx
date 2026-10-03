import { useState, useEffect, useRef, useCallback } from "react";
import {
  RotateCcw, Play, Pause, Trophy, Zap, Grid,
  Maximize2, Minimize2, Info, X,
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
} from "lucide-react";

/* -------------------------------------------------------
   Fullscreen hook
   ------------------------------------------------------- */
function useFullscreen(ref) {
  const [isFull, setIsFull] = useState(false);
  useEffect(() => {
    const cb = () => setIsFull(document.fullscreenElement === ref.current);
    document.addEventListener("fullscreenchange", cb);
    return () => document.removeEventListener("fullscreenchange", cb);
  }, [ref]);
  const toggle = useCallback(() => {
    if (!ref.current) return;
    if (!document.fullscreenElement) ref.current.requestFullscreen().catch(() => {});
    else document.exitFullscreen().catch(() => {});
  }, [ref]);
  return { isFull, toggle };
}

/* =======================================================
   GAME 1 — SNAKE
   ======================================================= */
const COLS = 20;
const ROWS = 18;
const CELL = 22;
const SPEEDS = { slow: 260, medium: 170, fast: 100 };

function useSnake(speed) {
  // Use refs for mutable game state to avoid stale closures in the interval
  const stateRef = useRef({
    snake: [{ x: 10, y: 9 }, { x: 9, y: 9 }],
    dir: { x: 1, y: 0 },
    food: { x: 15, y: 9 },
    score: 0,
    best: Number(localStorage.getItem("xim_snake_best")) || 0,
    status: "idle", // idle | playing | paused | over
  });
  const [tick, setTick] = useState(0); // force re-render

  const rndFood = (snake) => {
    let p;
    do { p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }; }
    while (snake.some((s) => s.x === p.x && s.y === p.y));
    return p;
  };

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  const start = useCallback(() => {
    const g = stateRef.current;
    stateRef.current = {
      snake: [{ x: 10, y: 9 }, { x: 9, y: 9 }],
      dir: { x: 1, y: 0 },
      food: { x: 15, y: 9 },
      score: 0,
      best: g.best,
      status: "playing",
    };
    dirRef.current = { x: 1, y: 0 };
    refresh();
  }, [refresh]);

  const togglePause = useCallback(() => {
    const g = stateRef.current;
    if (g.status === "playing") g.status = "paused";
    else if (g.status === "paused") g.status = "playing";
    refresh();
  }, [refresh]);

  // Queue direction — only allow 90° turns
  const dirRef = useRef({ x: 1, y: 0 });
  const queueDir = useCallback((d) => {
    const cur = dirRef.current;
    if (cur.x !== 0 && d.x !== 0) return; // same axis
    if (cur.y !== 0 && d.y !== 0) return;
    dirRef.current = d;
  }, []);

  // Game loop
  useEffect(() => {
    const id = setInterval(() => {
      const g = stateRef.current;
      if (g.status !== "playing") return;

      const d = dirRef.current;
      g.dir = d;

      const head = { x: g.snake[0].x + d.x, y: g.snake[0].y + d.y };

      // Wall hit
      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
        g.status = "over";
        g.best = Math.max(g.best, g.score);
        localStorage.setItem("xim_snake_best", String(g.best));
        refresh();
        return;
      }
      // Self hit
      // The tail moves away on a normal turn, so it is safe to enter its
      // current square unless the snake has just eaten.
      const ate = head.x === g.food.x && head.y === g.food.y;
      const bodyToCheck = ate ? g.snake : g.snake.slice(0, -1);
      if (bodyToCheck.some((s) => s.x === head.x && s.y === head.y)) {
        g.status = "over";
        g.best = Math.max(g.best, g.score);
        localStorage.setItem("xim_snake_best", String(g.best));
        refresh();
        return;
      }

      g.snake = [head, ...g.snake];
      if (!ate) g.snake.pop();
      if (ate) {
        g.score += 10;
        g.food = rndFood(g.snake);
      }
      refresh();
    }, speed);
    return () => clearInterval(id);
  }, [speed, refresh]);

  return { g: stateRef.current, start, togglePause, queueDir };
}

function SnakeGame() {
  const [speed, setSpeed] = useState("medium");
  const cardRef = useRef(null);
  const cvs = useRef(null);
  const { g, start, togglePause, queueDir } = useSnake(SPEEDS[speed]);
  const { isFull, toggle: toggleFull } = useFullscreen(cardRef);

  // Keyboard — attached to the CARD element, not window, so it won't conflict
  const handleKey = useCallback((e) => {
    const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    e.stopPropagation();
    if (e.key === " ") { togglePause(); return; }
    const map = {
      ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 },
    };
    queueDir(map[e.key]);
  }, [queueDir, togglePause]);

  // Draw canvas
  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = dark ? "#27272a" : "#e4e4e7";
    ctx.lineWidth = 0.5;
    for (let c = 0; c <= COLS; c++) {
      ctx.beginPath(); ctx.moveTo(c * CELL, 0); ctx.lineTo(c * CELL, ROWS * CELL); ctx.stroke();
    }
    for (let r = 0; r <= ROWS; r++) {
      ctx.beginPath(); ctx.moveTo(0, r * CELL); ctx.lineTo(COLS * CELL, r * CELL); ctx.stroke();
    }
    // Food
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(g.food.x * CELL + CELL / 2, g.food.y * CELL + CELL / 2, CELL / 2 - 3, 0, Math.PI * 2);
    ctx.fill();
    // Snake body
    g.snake.forEach((seg, i) => {
      const alpha = i === 0 ? 1 : Math.max(0.3, 0.85 - (i / g.snake.length) * 0.5);
      ctx.fillStyle = i === 0
        ? (dark ? "#f4f4f5" : "#09090b")
        : (dark ? `rgba(244,244,245,${alpha})` : `rgba(9,9,11,${alpha})`);
      ctx.beginPath();
      ctx.roundRect(seg.x * CELL + 2, seg.y * CELL + 2, CELL - 4, CELL - 4, i === 0 ? 6 : 4);
      ctx.fill();
    });
  });

  const W = COLS * CELL;
  const H = ROWS * CELL;

  const press = (dir) => {
    if (g.status === "idle" || g.status === "over") { start(); return; }
    queueDir(dir);
  };

  return (
    <div
      className="game-card"
      ref={cardRef}
      tabIndex={0}
      onKeyDown={handleKey}
    >
      {/* Header */}
      <div className="game-card-header">
        <div>
          <h3 className="game-title">🐍 Snake</h3>
          <p className="game-subtitle">Use the buttons below or arrow keys after clicking the game.</p>
        </div>
        <div className="game-scores">
          <span className="game-score-item"><Zap size={13} /> Score: <strong>{g.score}</strong></span>
          <span className="game-score-item"><Trophy size={13} /> Best: <strong>{g.best}</strong></span>
        </div>
      </div>

      {/* Speed picker */}
      <div className="game-speed-row">
        <span className="game-speed-label">Speed:</span>
        {Object.keys(SPEEDS).map((k) => (
          <button key={k} className={`game-speed-btn${speed === k ? " active" : ""}`}
            onClick={() => setSpeed(k)}>
            {k}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div className="game-canvas-wrap" style={{ width: isFull ? "100%" : `min(100%, ${W}px)` }}>
        <canvas ref={cvs} width={W} height={H} className="game-canvas"
          style={{ width: "100%", height: "auto" }} />

        {/* Overlay for idle / paused / over */}
        {g.status !== "playing" && (
          <div className="game-overlay">
            {g.status === "idle" && (
              <div className="game-how-to">
                <p className="game-how-title">How to Play 🐍</p>
                <ul className="game-how-list">
                  <li>🕹️ Tap the <strong>arrow buttons</strong> below the game</li>
                  <li>🔴 Eat the red dot to grow and score +10</li>
                  <li>💥 Don't hit the walls or yourself!</li>
                  <li>⌨️ Keyboard also works after clicking the game first</li>
                </ul>
              </div>
            )}
            {g.status === "over" && <p className="game-overlay-msg">💀 Game Over — {g.score} pts</p>}
            {g.status === "paused" && <p className="game-overlay-msg">⏸ Paused</p>}
            <button className="btn btn-primary" onClick={g.status === "paused" ? togglePause : start}>
              <Play size={14} />
              {g.status === "idle" ? "Start Game" : g.status === "paused" ? "Resume" : "Play Again"}
            </button>
          </div>
        )}
      </div>

      {/* ===== D-PAD — always visible, primary control ===== */}
      <div className="snake-dpad-wrap">
        <div className="snake-dpad">
          <div className="dpad-row">
            <button className="dpad-btn" onPointerDown={(e) => { e.preventDefault(); press({ x: 0, y: -1 }); }}>
              <ChevronUp size={22} />
            </button>
          </div>
          <div className="dpad-row">
            <button className="dpad-btn" onPointerDown={(e) => { e.preventDefault(); press({ x: -1, y: 0 }); }}>
              <ChevronLeft size={22} />
            </button>
            <div className="dpad-center" />
            <button className="dpad-btn" onPointerDown={(e) => { e.preventDefault(); press({ x: 1, y: 0 }); }}>
              <ChevronRight size={22} />
            </button>
          </div>
          <div className="dpad-row">
            <button className="dpad-btn" onPointerDown={(e) => { e.preventDefault(); press({ x: 0, y: 1 }); }}>
              <ChevronDown size={22} />
            </button>
          </div>
        </div>
        <div className="dpad-side-btns">
          <button className="btn btn-secondary dpad-action-btn" onClick={g.status === "paused" ? togglePause : togglePause}>
            {g.status === "playing" ? <><Pause size={13} /> Pause</> : <><Play size={13} /> Resume</>}
          </button>
          <button className="btn btn-secondary dpad-action-btn" onClick={start}>
            <RotateCcw size={13} /> Restart
          </button>
          <button className="game-icon-btn" onClick={toggleFull} title={isFull ? "Exit Fullscreen" : "Fullscreen"}>
            {isFull ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      <div className="game-controls-hint">
        <span>Tap arrows above · or use keyboard after clicking here</span>
      </div>
    </div>
  );
}

/* =======================================================
   GAME 2 — 2048
   ======================================================= */
function newBoard() {
  const b = Array.from({ length: 4 }, () => Array(4).fill(0));
  return addTile(addTile(b));
}
function addTile(b) {
  const e = [];
  b.forEach((row, ri) => row.forEach((v, ci) => { if (!v) e.push([ri, ci]); }));
  if (!e.length) return b;
  const [r, c] = e[Math.floor(Math.random() * e.length)];
  const n = b.map((row) => [...row]);
  n[r][c] = Math.random() < 0.9 ? 2 : 4;
  return n;
}
function slideRow(row) {
  const f = row.filter(Boolean);
  const out = []; let gain = 0; let i = 0;
  while (i < f.length) {
    if (i + 1 < f.length && f[i] === f[i + 1]) { out.push(f[i] * 2); gain += f[i] * 2; i += 2; }
    else { out.push(f[i]); i++; }
  }
  while (out.length < 4) out.push(0);
  return { row: out, gain };
}
function shiftBoard(b, dir) {
  let gain = 0; let moved = false;
  let n = b.map((r) => [...r]);
  const slide = (row) => {
    const { row: nr, gain: g } = slideRow(row);
    gain += g;
    if (nr.some((v, i) => v !== row[i])) moved = true;
    return nr;
  };
  if (dir === "left") n = n.map((r) => slide(r));
  else if (dir === "right") n = n.map((r) => slide([...r].reverse()).reverse());
  else if (dir === "up") {
    for (let c = 0; c < 4; c++) {
      const col = [0,1,2,3].map((r) => n[r][c]);
      slide(col).forEach((v, r) => { n[r][c] = v; });
    }
  } else {
    for (let c = 0; c < 4; c++) {
      const col = [3,2,1,0].map((r) => n[r][c]);
      slide(col).forEach((v, i) => { n[3-i][c] = v; });
    }
  }
  return { b: n, gain, moved };
}
function canMove(b) {
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
    if (!b[r][c]) return true;
    if (c < 3 && b[r][c] === b[r][c+1]) return true;
    if (r < 3 && b[r][c] === b[r+1][c]) return true;
  }
  return false;
}

const TILE_STYLE = {
  0:    { bg: "var(--bg-subtle)", fg: "transparent" },
  2:    { bg: "#e4e4e7",  fg: "#09090b" },
  4:    { bg: "#d4d4d8",  fg: "#09090b" },
  8:    { bg: "#f97316",  fg: "#fff" },
  16:   { bg: "#f59e0b",  fg: "#fff" },
  32:   { bg: "#eab308",  fg: "#fff" },
  64:   { bg: "#22c55e",  fg: "#fff" },
  128:  { bg: "#14b8a6",  fg: "#fff" },
  256:  { bg: "#3b82f6",  fg: "#fff" },
  512:  { bg: "#8b5cf6",  fg: "#fff" },
  1024: { bg: "#ec4899",  fg: "#fff" },
  2048: { bg: "#ef4444",  fg: "#fff" },
};

function Game2048() {
  const [board, setBoard] = useState(newBoard);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem("xim_2048_best")) || 0);
  const [over, setOver] = useState(false);
  const [won, setWon] = useState(false);
  const [showHow, setShowHow] = useState(true);
  const cardRef = useRef(null);
  const { isFull, toggle: toggleFull } = useFullscreen(cardRef);

  const reset = useCallback(() => {
    setBoard(newBoard()); setScore(0); setOver(false); setWon(false); setShowHow(false);
  }, []);

  const move = useCallback((dir) => {
    if (over || won || showHow) return;
    setBoard((prev) => {
      const { b, gain, moved } = shiftBoard(prev, dir);
      if (!moved) return prev;
      const wt = addTile(b);
      setScore((s) => {
        const ns = s + gain;
        setBest((bv) => {
          const nextBest = Math.max(bv, ns);
          localStorage.setItem("xim_2048_best", String(nextBest));
          return nextBest;
        });
        return ns;
      });
      if (wt.some((row) => row.some((v) => v === 2048))) setWon(true);
      if (!canMove(wt)) setOver(true);
      return wt;
    });
  }, [over, showHow]);

  // Keyboard — on the card only, so it doesn't conflict with snake
  const handleKey = useCallback((e) => {
    const m = { ArrowLeft:"left", ArrowRight:"right", ArrowUp:"up", ArrowDown:"down" };
    if (!m[e.key]) return;
    e.preventDefault();
    e.stopPropagation();
    move(m[e.key]);
  }, [move]);

  // Touch swipe
  const ts = useRef(null);
  const onTS = (e) => { ts.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
  const onTE = (e) => {
    if (!ts.current) return;
    const dx = e.changedTouches[0].clientX - ts.current.x;
    const dy = e.changedTouches[0].clientY - ts.current.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) { ts.current = null; return; }
    if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? "right" : "left");
    else move(dy > 0 ? "down" : "up");
    ts.current = null;
  };

  return (
    <div className="game-card" ref={cardRef} tabIndex={0} onKeyDown={handleKey}>
      <div className="game-card-header">
        <div>
          <h3 className="game-title">🔢Puzzle</h3>
          <p className="game-subtitle">Merge same tiles to reach 2048!</p>
        </div>
        <div className="game-scores">
          <span className="game-score-item"><Zap size={13} /> Score: <strong>{score}</strong></span>
          <span className="game-score-item"><Trophy size={13} /> Best: <strong>{best}</strong></span>
        </div>
      </div>

      {showHow ? (
        <div className="game-howto-panel">
          <div className="game-howto-header">
            <span className="game-howto-title"><Info size={14} /> How to Play</span>
            <button className="game-icon-btn" onClick={() => setShowHow(false)} title="Close"><X size={13} /></button>
          </div>
          <div className="game-howto-body">
            <div className="howto-step"><span className="howto-num">1</span>
              <span>Press the <strong>arrow buttons</strong> (or swipe on mobile) to slide all tiles</span>
            </div>
            <div className="howto-step"><span className="howto-num">2</span>
              <span>Two tiles with the <strong>same number</strong> merge into one when they collide</span>
            </div>
            <div className="howto-step"><span className="howto-num">3</span>
              <span>Build up to the <strong style={{color:"#ef4444"}}>2048</strong> tile to win 🎉</span>
            </div>
            <div className="howto-tip">💡 Tip: Keep your biggest tile in one corner!</div>
          </div>
          <button className="btn btn-primary howto-start-btn" onClick={() => setShowHow(false)}>
            <Play size={14} /> Got it, Play!
          </button>
        </div>
      ) : (
        <>
          <div className="game-2048-grid" onTouchStart={onTS} onTouchEnd={onTE}>
            {board.map((row, r) => row.map((val, c) => {
              const k = Math.min(val, 2048);
              const st = TILE_STYLE[k] || TILE_STYLE[2048];
              return (
                <div key={`${r}-${c}`} className={`game-2048-tile${val?" filled":""}`}
                  style={{ background: st.bg, color: st.fg }}>
                  {val > 0 && <span>{val}</span>}
                </div>
              );
            }))}
            {(over || won) && (
              <div className="game-overlay game-overlay-2048">
                <p className="game-overlay-msg">{won ? "🎉 You reached 2048!" : "😢 No more moves!"}</p>
                <p style={{ color:"#fff", fontSize:"0.8rem", marginTop:"-0.25rem" }}>Score: <strong>{score}</strong></p>
                <button className="btn btn-primary" onClick={reset}><RotateCcw size={14} /> Play Again</button>
              </div>
            )}
          </div>

          {/* Always-visible direction buttons */}
          <div className="g2048-dpad">
            <div className="g2048-dpad-row">
              <button className="g2048-btn" onClick={() => move("up")}><ChevronUp size={20} /></button>
            </div>
            <div className="g2048-dpad-row">
              <button className="g2048-btn" onClick={() => move("left")}><ChevronLeft size={20} /></button>
              <div style={{ width: 40 }} />
              <button className="g2048-btn" onClick={() => move("right")}><ChevronRight size={20} /></button>
            </div>
            <div className="g2048-dpad-row">
              <button className="g2048-btn" onClick={() => move("down")}><ChevronDown size={20} /></button>
            </div>
          </div>
        </>
      )}

      <div className="game-controls-hint">
        <span>{showHow ? "Read the guide above" : "Buttons · Swipe · Arrow keys (click game first)"}</span>
        <div className="game-hint-btns">
          <button className="game-icon-btn" onClick={() => setShowHow(true)} title="How to play"><Info size={14} /></button>
          <button className="game-icon-btn" onClick={reset} title="Restart"><RotateCcw size={14} /></button>
          <button className="game-icon-btn" onClick={toggleFull} title={isFull?"Exit Fullscreen":"Fullscreen"}>
            {isFull ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =======================================================
   GAME 3 — REACTION TIMER
   ======================================================= */
const ROUNDS_TOTAL = 5;

function ReactionTimer() {
  const [phase, setPhase] = useState("guide");
  const [ms, setMs] = useState(null);
  const [round, setRound] = useState(0);
  const [results, setResults] = useState([]);
  const [early, setEarly] = useState(false);
  const tid = useRef(null);
  const t0 = useRef(null);
  const cardRef = useRef(null);
  const { isFull, toggle: toggleFull } = useFullscreen(cardRef);

  const reset = () => {
    clearTimeout(tid.current);
    setPhase("guide"); setMs(null); setRound(0); setResults([]); setEarly(false);
  };

  const go = useCallback((roundNum) => {
    setEarly(false); setMs(null); setPhase("waiting");
    tid.current = setTimeout(() => {
      t0.current = performance.now(); setPhase("ready");
    }, 1500 + Math.random() * 3000);
    if (roundNum !== undefined) setRound(roundNum);
  }, []);

  const startGame = () => go(1);

  const click = () => {
    if (phase === "guide") return;
    if (phase === "idle") { go(round); return; }
    if (phase === "waiting") { clearTimeout(tid.current); setEarly(true); setPhase("result"); return; }
    if (phase === "ready") {
      const t = Math.round(performance.now() - t0.current);
      setMs(t); setResults((p) => [...p, t]); setPhase("result"); return;
    }
    if (phase === "result") {
      if (early) { go(round); return; }
      const next = round + 1;
      if (next > ROUNDS_TOTAL) { setPhase("done"); return; }
      go(next);
    }
  };

  useEffect(() => () => clearTimeout(tid.current), []);

  const avg = results.length ? Math.round(results.reduce((a, b) => a + b, 0) / results.length) : null;
  const best = results.length ? Math.min(...results) : null;

  const rate = (t) => {
    if (t < 150) return { l: "Superhuman ⚡", c: "#f97316", bar: 100 };
    if (t < 200) return { l: "Excellent 🎯", c: "#22c55e", bar: 85 };
    if (t < 250) return { l: "Great 👍", c: "#3b82f6", bar: 70 };
    if (t < 350) return { l: "Average", c: "#a1a1aa", bar: 50 };
    if (t < 500) return { l: "Slow", c: "#71717a", bar: 30 };
    return { l: "Keep practicing", c: "#52525b", bar: 15 };
  };

  const zoneBg = { guide:"var(--bg-subtle)", idle:"var(--bg-subtle)", waiting:"#ef4444", ready:"#22c55e", result: early?"#ef4444":"var(--bg-subtle)", done:"var(--bg-subtle)" }[phase];

  return (
    <div className="game-card" ref={cardRef}>
      <div className="game-card-header">
        <div>
          <h3 className="game-title">⚡ Reaction Timer</h3>
          <p className="game-subtitle">
            {phase === "done" ? `${ROUNDS_TOTAL} rounds done!` : `Round ${Math.min(round, ROUNDS_TOTAL)} of ${ROUNDS_TOTAL} — how fast are you?`}
          </p>
        </div>
        {avg !== null && (
          <div className="game-scores">
            <span className="game-score-item"><Zap size={13} /> Avg: <strong>{avg}ms</strong></span>
            <span className="game-score-item"><Trophy size={13} /> Best: <strong>{best}ms</strong></span>
          </div>
        )}
      </div>

      {phase === "guide" && (
        <div className="game-howto-panel">
          <div className="game-howto-header">
            <span className="game-howto-title"><Info size={14} /> How to Play</span>
          </div>
          <div className="game-howto-body">
            <div className="howto-step"><span className="howto-num">1</span>
              <span>Click <strong>Start</strong> — the big box turns <span style={{color:"#ef4444",fontWeight:600}}>red</span></span>
            </div>
            <div className="howto-step"><span className="howto-num">2</span>
              <span>Wait… after a random delay it turns <span style={{color:"#22c55e",fontWeight:600}}>green</span></span>
            </div>
            <div className="howto-step"><span className="howto-num">3</span>
              <span><strong>Click the box as fast as you can</strong> when it turns green!</span>
            </div>
            <div className="howto-step"><span className="howto-num">4</span>
              <span>Do this <strong>{ROUNDS_TOTAL} times</strong> for your final score</span>
            </div>
            <div className="howto-tip">⚠️ Clicking on red = false start! Wait for green.</div>
          </div>
          <button className="btn btn-primary howto-start-btn" onClick={startGame}>
            <Play size={14} /> Start {ROUNDS_TOTAL} Rounds
          </button>
        </div>
      )}

      {phase !== "guide" && (
        <>
          <div className="reaction-rounds-bar">
            {Array.from({ length: ROUNDS_TOTAL }, (_, i) => (
              <div key={i} className={`reaction-round-pip${i < results.length?" done":i===round-1&&phase!=="done"?" active":""}`} />
            ))}
          </div>
          <div className="reaction-zone" style={{ background: zoneBg }} onClick={click}
            role="button" tabIndex={0} onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") { e.preventDefault(); click(); }
            }}>
            {phase === "idle" && <div className="reaction-text"><p className="reaction-main">Click to Start Round {round}</p></div>}
            {phase === "waiting" && (
              <div className="reaction-text">
                <p className="reaction-main" style={{color:"#fff",fontSize:"1.8rem"}}>🔴 Wait…</p>
                <p className="reaction-sub" style={{color:"rgba(255,255,255,0.85)"}}>Stay ready — don&apos;t click yet!</p>
              </div>
            )}
            {phase === "ready" && (
              <div className="reaction-text">
                <p className="reaction-main" style={{color:"#fff",fontSize:"2.4rem",fontWeight:800}}>🟢 CLICK!</p>
              </div>
            )}
            {phase === "result" && (
              <div className="reaction-text">
                {early ? (
                  <>
                    <p className="reaction-main" style={{color:"#fff"}}>😬 Too Early!</p>
                    <p className="reaction-sub" style={{color:"rgba(255,255,255,0.85)"}}>False start — click to retry round {round}</p>
                  </>
                ) : (
                  <>
                    <p className="reaction-time">{ms}<span>ms</span></p>
                    <p className="reaction-rating" style={{color:rate(ms).c}}>{rate(ms).l}</p>
                    <div className="reaction-bar-wrap"><div className="reaction-bar" style={{width:`${rate(ms).bar}%`,background:rate(ms).c}}/></div>
                    <p className="reaction-sub" style={{marginTop:"0.5rem"}}>{round < ROUNDS_TOTAL ? `Click for round ${round+1}` : "Click to see final results!"}</p>
                  </>
                )}
              </div>
            )}
            {phase === "done" && (
              <div className="reaction-text">
                <p className="reaction-done-title">🏁 All Done!</p>
                <div className="reaction-final-stats">
                  <div className="reaction-stat-box">
                    <span className="reaction-stat-val">{avg}<small>ms</small></span>
                    <span className="reaction-stat-lbl">Average</span>
                  </div>
                  <div className="reaction-stat-box">
                    <span className="reaction-stat-val">{best}<small>ms</small></span>
                    <span className="reaction-stat-lbl">Best</span>
                  </div>
                </div>
                <p className="reaction-rating" style={{color:rate(avg).c,marginTop:"0.5rem"}}>{rate(avg).l}</p>
                <button className="btn btn-primary" style={{marginTop:"1rem"}} onClick={reset}><RotateCcw size={14}/> Play Again</button>
              </div>
            )}
          </div>
          {results.length > 0 && phase !== "done" && (
            <div className="reaction-history">
              <span className="reaction-history-label">Rounds:</span>
              {results.map((t, i) => (
                <span key={i} className="reaction-history-item" style={{color:rate(t).c}}>R{i+1}: {t}ms</span>
              ))}
            </div>
          )}
        </>
      )}

      <div className="game-controls-hint">
        <span>{phase === "guide" ? "Read the guide above to begin" : "Click the big box · or press Space"}</span>
        <div className="game-hint-btns">
          <button className="game-icon-btn" onClick={reset} title="Reset"><RotateCcw size={14}/></button>
          <button className="game-icon-btn" onClick={toggleFull} title={isFull?"Exit Fullscreen":"Fullscreen"}>
            {isFull ? <Minimize2 size={14}/> : <Maximize2 size={14}/>}
          </button>
        </div>
      </div>
    </div>
  );
}

function TicTacToeGame() {
  const [difficulty, setDifficulty] = useState("simple");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("P1");
  const [scores, setScores] = useState({ P1: 0, P2: 0 });
  const [winner, setWinner] = useState(null);
  const [line, setLine] = useState([]);

  const size = difficulty === "hard" ? 4 : 3;
  const totalCells = size * size;

  const resetRound = useCallback(() => {
    setBoard(Array(totalCells).fill(null));
    setTurn("P1");
    setWinner(null);
    setLine([]);
  }, [totalCells]);

  useEffect(() => {
    resetRound();
  }, [difficulty, resetRound]);

  const checkWinner = (nextBoard) => {
    const winPatterns = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const current = i * size + j;
        if (j <= size - 3) {
          winPatterns.push([current, current + 1, current + 2, current + 3]);
        }
        if (i <= size - 3) {
          winPatterns.push([current, current + size, current + size * 2, current + size * 3]);
        }
        if (i <= size - 3 && j <= size - 3) {
          winPatterns.push([current, current + size + 1, current + size * 2 + 2, current + size * 3 + 3]);
        }
        if (i <= size - 3 && j >= 3) {
          winPatterns.push([current, current + size - 1, current + size * 2 - 2, current + size * 3 - 3]);
        }
      }
    }

    for (const pattern of winPatterns) {
      const [a, b, c, d] = pattern;
      if (nextBoard[a] && nextBoard[a] === nextBoard[b] && nextBoard[a] === nextBoard[c] && nextBoard[a] === nextBoard[d]) {
        return { winner: nextBoard[a], line: pattern };
      }
    }

    if (nextBoard.every(Boolean)) return { winner: "draw", line: [] };
    return null;
  };

  const onCellClick = (idx) => {
    if (board[idx] || winner) return;
    const nextBoard = [...board];
    nextBoard[idx] = turn === "P1" ? "X" : "O";
    const outcome = checkWinner(nextBoard);
    setBoard(nextBoard);

    if (outcome) {
      setWinner(outcome.winner);
      setLine(outcome.line);
      if (outcome.winner !== "draw") {
        setScores((prev) => ({ ...prev, [outcome.winner === "X" ? "P1" : "P2"]: prev[outcome.winner === "X" ? "P1" : "P2"] + 1 }));
      }
      return;
    }

    setTurn((prev) => (prev === "P1" ? "P2" : "P1"));
  };

  const status = winner === "draw"
    ? "Draw!"
    : winner
      ? `${winner === "X" ? "Player 1" : "Player 2"} wins!`
      : `Player ${turn === "P1" ? "1" : "2"}'s turn`;

  return (
    <div className="game-card">
      <div className="game-card-header">
        <div>
          <h3 className="game-title">✖️ Tic-Tac-4</h3>
          <p className="game-subtitle">2-player battle with simple or hard board size.</p>
        </div>
        <div className="game-scores">
          <span className="game-score-item"><Trophy size={13} /> P1: <strong>{scores.P1}</strong></span>
          <span className="game-score-item"><Trophy size={13} /> P2: <strong>{scores.P2}</strong></span>
        </div>
      </div>

      <div className="mini-game-controls">
        <button className={`mini-game-toggle${difficulty === "simple" ? " active" : ""}`} onClick={() => setDifficulty("simple")}>Simple</button>
        <button className={`mini-game-toggle${difficulty === "hard" ? " active" : ""}`} onClick={() => setDifficulty("hard")}>Hard</button>
        <button className="mini-game-toggle" onClick={resetRound}>Reset</button>
      </div>

      <div className="mini-scoreboard">
        <span>{status}</span>
      </div>

      <div className="mini-game-grid" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
        {board.map((cell, idx) => (
          <button
            key={idx}
            className={`mini-board-btn${line.includes(idx) ? " win" : ""}`}
            onClick={() => onCellClick(idx)}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="game-controls-hint">
        <span>{difficulty === "hard" ? "4-in-a-row win" : "3-in-a-row win"}</span>
      </div>
    </div>
  );
}

function MemoryMatchGame() {
  const [difficulty, setDifficulty] = useState("simple");
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [turn, setTurn] = useState("P1");
  const [scores, setScores] = useState({ P1: 0, P2: 0 });
  const [locked, setLocked] = useState(false);

  const prepareDeck = useCallback((level) => {
    const icons = ["🍉", "🍋", "🍇", "🍒", "🍊", "🍏", "🍎", "🍓", "🥝", "🍍", "🍑", "🍉"];
    const pairCount = level === "hard" ? 6 : 4;
    const deck = Array.from({ length: pairCount }, (_, i) => ({ id: `${icons[i]}-${i}-a`, value: icons[i] }))
      .flatMap((card, i) => [
        { ...card, id: `${card.id}-1` },
        { ...card, id: `${card.id}-2`, value: card.value },
      ])
      .sort(() => Math.random() - 0.5);
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setTurn("P1");
    setLocked(false);
  }, []);

  useEffect(() => {
    prepareDeck(difficulty);
  }, [difficulty, prepareDeck]);

  useEffect(() => {
    if (flipped.length !== 2) return;
    const [first, second] = flipped;
    const firstCard = cards.find((c) => c.id === first);
    const secondCard = cards.find((c) => c.id === second);

    if (!firstCard || !secondCard) return;

    if (firstCard.value === secondCard.value) {
      setMatched((prev) => [...prev, first, second]);
      setScores((prev) => ({ ...prev, [turn]: prev[turn] + 1 }));
      setFlipped([]);
      return;
    }

    setLocked(true);
    const timer = setTimeout(() => {
      setFlipped([]);
      setTurn((prev) => (prev === "P1" ? "P2" : "P1"));
      setLocked(false);
    }, 650);

    return () => clearTimeout(timer);
  }, [cards, flipped, turn]);

  const revealCard = (id) => {
    if (locked || flipped.includes(id) || matched.includes(id)) return;
    setFlipped((prev) => [...prev, id]);
  };

  const allMatched = matched.length === cards.length;

  return (
    <div className="game-card">
      <div className="game-card-header">
        <div>
          <h3 className="game-title">🧠 Memory Match</h3>
          <p className="game-subtitle">Match pairs — two players take turns.</p>
        </div>
        <div className="game-scores">
          <span className="game-score-item"><Trophy size={13} /> P1: <strong>{scores.P1}</strong></span>
          <span className="game-score-item"><Trophy size={13} /> P2: <strong>{scores.P2}</strong></span>
        </div>
      </div>

      <div className="mini-game-controls">
        <button className={`mini-game-toggle${difficulty === "simple" ? " active" : ""}`} onClick={() => setDifficulty("simple")}>Simple</button>
        <button className={`mini-game-toggle${difficulty === "hard" ? " active" : ""}`} onClick={() => setDifficulty("hard")}>Hard</button>
        <button className="mini-game-toggle" onClick={() => prepareDeck(difficulty)}>Shuffle</button>
      </div>

      <div className="mini-scoreboard">
        <span>{allMatched ? "Game over!" : `Turn: ${turn}`}</span>
      </div>

      <div className="memory-grid" style={{ gridTemplateColumns: `repeat(${difficulty === "hard" ? 6 : 4}, minmax(0, 1fr))` }}>
        {cards.map((card) => {
          const isVisible = flipped.includes(card.id) || matched.includes(card.id);
          return (
            <button key={card.id} className={`memory-card${isVisible ? " open" : ""}`} onClick={() => revealCard(card.id)}>
              {isVisible ? card.value : "?"}
            </button>
          );
        })}
      </div>

      <div className="game-controls-hint">
        <span>{difficulty === "hard" ? "12 cards — harder memory run" : "8 cards — quick memory duel"}</span>
      </div>
    </div>
  );
}

function RpsGame() {
  const [difficulty, setDifficulty] = useState("simple");
  const [p1Move, setP1Move] = useState(null);
  const [p2Move, setP2Move] = useState(null);
  const [status, setStatus] = useState("Player 1 choose a move");
  const [scores, setScores] = useState({ P1: 0, P2: 0 });

  const moves = difficulty === "hard"
    ? ["Rock", "Paper", "Scissors", "Lizard", "Spock"]
    : ["Rock", "Paper", "Scissors"];

  const determineWinner = (a, b) => {
    if (a === b) return "draw";
    const rules = {
      Rock: ["Scissors", "Lizard"],
      Paper: ["Rock", "Spock"],
      Scissors: ["Paper", "Lizard"],
      Lizard: ["Paper", "Spock"],
      Spock: ["Scissors", "Rock"],
    };
    return rules[a].includes(b) ? "P1" : "P2";
  };

  const pickMove = (player, move) => {
    if (player === "P1") setP1Move(move);
    if (player === "P2") setP2Move(move);

    if (player === "P1") {
      setStatus("Player 2 choose a move");
      return;
    }

    const outcome = determineWinner(p1Move, move);
    if (outcome === "draw") {
      setStatus("Draw round! Try again");
    } else {
      const winner = outcome === "P1" ? "Player 1" : "Player 2";
      setStatus(`${winner} wins!`);
      setScores((prev) => ({ ...prev, [winner === "Player 1" ? "P1" : "P2"]: prev[winner === "Player 1" ? "P1" : "P2"] + 1 }));
    }
    setP1Move(null);
    setP2Move(null);
  };

  return (
    <div className="game-card">
      <div className="game-card-header">
        <div>
          <h3 className="game-title">✊ Rock Paper</h3>
          <p className="game-subtitle">Classic duel with difficulty variations.</p>
        </div>
        <div className="game-scores">
          <span className="game-score-item"><Trophy size={13} /> P1: <strong>{scores.P1}</strong></span>
          <span className="game-score-item"><Trophy size={13} /> P2: <strong>{scores.P2}</strong></span>
        </div>
      </div>

      <div className="mini-game-controls">
        <button className={`mini-game-toggle${difficulty === "simple" ? " active" : ""}`} onClick={() => { setDifficulty("simple"); setStatus("Player 1 choose a move"); setP1Move(null); setP2Move(null); }}>Simple</button>
        <button className={`mini-game-toggle${difficulty === "hard" ? " active" : ""}`} onClick={() => { setDifficulty("hard"); setStatus("Player 1 choose a move"); setP1Move(null); setP2Move(null); }}>Hard</button>
      </div>

      <div className="mini-scoreboard">
        <span>{status}</span>
      </div>

      <div className="rps-grid">
        <div className="rps-panel">
          <p>P1</p>
          {moves.map((move) => (
            <button key={`p1-${move}`} className={`mini-game-btn${p1Move === move ? " selected" : ""}`} onClick={() => pickMove("P1", move)}>{move}</button>
          ))}
        </div>
        <div className="rps-panel">
          <p>P2</p>
          {moves.map((move) => (
            <button key={`p2-${move}`} className={`mini-game-btn${p2Move === move ? " selected" : ""}`} onClick={() => pickMove("P2", move)}>{move}</button>
          ))}
        </div>
      </div>

      <div className="game-controls-hint">
        <span>{difficulty === "hard" ? "Lizard & Spock rules" : "Classic 3-move duel"}</span>
      </div>
    </div>
  );
}

function NumberGuessGame() {
  const [difficulty, setDifficulty] = useState("simple");
  const [target, setTarget] = useState(10);
  const [p1Guess, setP1Guess] = useState("");
  const [p2Guess, setP2Guess] = useState("");
  const [status, setStatus] = useState("Player 1 guess a number");
  const [scores, setScores] = useState({ P1: 0, P2: 0 });

  const max = difficulty === "hard" ? 50 : 20;

  const startRound = useCallback(() => {
    setTarget(Math.floor(Math.random() * max) + 1);
    setP1Guess("");
    setP2Guess("");
    setStatus("Player 1 guess a number");
  }, [max]);

  useEffect(() => {
    startRound();
  }, [difficulty, startRound]);

  const submitGuess = (player, value) => {
    const guess = Number(value);
    if (!guess || guess < 1 || guess > max) return;

    if (player === "P1") {
      setP1Guess(guess);
      setStatus("Player 2 guess a number");
      return;
    }

    setP2Guess(guess);
    const diff1 = Math.abs(guess - target);
    const diff2 = Math.abs(p1Guess - target);

    if (diff1 === diff2) {
      setStatus("Draw! Both players were equally close");
    } else if (diff1 < diff2) {
      setStatus("Player 2 wins the round");
      setScores((prev) => ({ ...prev, P2: prev.P2 + 1 }));
    } else {
      setStatus("Player 1 wins the round");
      setScores((prev) => ({ ...prev, P1: prev.P1 + 1 }));
    }
  };

  return (
    <div className="game-card">
      <div className="game-card-header">
        <div>
          <h3 className="game-title">🎯 Number Duel</h3>
          <p className="game-subtitle">Guess the hidden number - closest wins.</p>
        </div>
        <div className="game-scores">
          <span className="game-score-item"><Trophy size={13} /> P1: <strong>{scores.P1}</strong></span>
          <span className="game-score-item"><Trophy size={13} /> P2: <strong>{scores.P2}</strong></span>
        </div>
      </div>

      <div className="mini-game-controls">
        <button className={`mini-game-toggle${difficulty === "simple" ? " active" : ""}`} onClick={() => setDifficulty("simple")}>Simple</button>
        <button className={`mini-game-toggle${difficulty === "hard" ? " active" : ""}`} onClick={() => setDifficulty("hard")}>Hard</button>
        <button className="mini-game-toggle" onClick={startRound}>New Round</button>
      </div>

      <div className="mini-scoreboard">
        <span>{status}</span>
      </div>

      <div className="guess-grid">
        <div className="guess-box">
          <label>P1 guess</label>
          <input type="number" min="1" max={max} value={p1Guess} onChange={(e) => setP1Guess(Number(e.target.value))} />
          <button className="mini-game-btn" onClick={() => submitGuess("P1", p1Guess)}>Lock</button>
        </div>
        <div className="guess-box">
          <label>P2 guess</label>
          <input type="number" min="1" max={max} value={p2Guess} onChange={(e) => setP2Guess(Number(e.target.value))} />
          <button className="mini-game-btn" onClick={() => submitGuess("P2", p2Guess)}>Lock</button>
        </div>
      </div>

      <div className="game-controls-hint">
        <span>{difficulty === "hard" ? `Target range: 1 - ${max}` : `Target range: 1 - ${max}`}</span>
      </div>
    </div>
  );
}

function DiceBattleGame() {
  const [difficulty, setDifficulty] = useState("simple");
  const [p1Roll, setP1Roll] = useState(null);
  const [p2Roll, setP2Roll] = useState(null);
  const [scores, setScores] = useState({ P1: 0, P2: 0 });
  const [status, setStatus] = useState("Roll for both players");

  const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

  const rollForPlayer = (player) => {
    const diceCount = difficulty === "hard" ? 2 : 1;
    const values = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6));
    const total = values.reduce((sum, n) => sum + n + 1, 0);

    if (player === "P1") {
      setP1Roll({ values, total });
      setStatus("Player 2 roll");
      return;
    }

    setP2Roll({ values, total });
    if (p1Roll) {
      if (total > p1Roll.total) {
        setStatus("Player 2 wins round");
        setScores((prev) => ({ ...prev, P2: prev.P2 + 1 }));
      } else if (total < p1Roll.total) {
        setStatus("Player 1 wins round");
        setScores((prev) => ({ ...prev, P1: prev.P1 + 1 }));
      } else {
        setStatus("Draw round");
      }
    }
  };

  const resetRound = () => {
    setP1Roll(null);
    setP2Roll(null);
    setStatus("Roll for both players");
  };

  return (
    <div className="game-card">
      <div className="game-card-header">
        <div>
          <h3 className="game-title">🎲 Dice Duel</h3>
          <p className="game-subtitle">Who rolls higher? Simple or double-dice hard mode.</p>
        </div>
        <div className="game-scores">
          <span className="game-score-item"><Trophy size={13} /> P1: <strong>{scores.P1}</strong></span>
          <span className="game-score-item"><Trophy size={13} /> P2: <strong>{scores.P2}</strong></span>
        </div>
      </div>

      <div className="mini-game-controls">
        <button className={`mini-game-toggle${difficulty === "simple" ? " active" : ""}`} onClick={() => setDifficulty("simple")}>Simple</button>
        <button className={`mini-game-toggle${difficulty === "hard" ? " active" : ""}`} onClick={() => setDifficulty("hard")}>Hard</button>
        <button className="mini-game-toggle" onClick={resetRound}>Reset</button>
      </div>

      <div className="mini-scoreboard">
        <span>{status}</span>
      </div>

      <div className="dice-grid">
        <div className="dice-box">
          <span className="dice-label">P1</span>
          <div className="dice-face">{p1Roll ? p1Roll.values.map((v) => diceFaces[v]).join(" ") : "🎲"}</div>
          <button className="mini-game-btn" onClick={() => rollForPlayer("P1")}>Roll</button>
        </div>
        <div className="dice-box">
          <span className="dice-label">P2</span>
          <div className="dice-face">{p2Roll ? p2Roll.values.map((v) => diceFaces[v]).join(" ") : "🎲"}</div>
          <button className="mini-game-btn" onClick={() => rollForPlayer("P2")}>Roll</button>
        </div>
      </div>

      <div className="game-controls-hint">
        <span>{difficulty === "hard" ? "2 dice per player" : "1 die per player"}</span>
      </div>
    </div>
  );
}

function Games({ isActive = true }) {
  return (
    <section id="games" className={`page-section ${isActive ? "active" : ""}`}>
      <div className="games-header">
        <div className="games-header-top">
          <Grid size={18} strokeWidth={1.75} className="games-header-icon" />
          <h2 className="games-page-title">Mini Games</h2>
        </div>
        <p className="games-subtitle">
          Take a break — eight games with built-in guides. Use the on-screen buttons or keyboard.
        </p>
      </div>
      <div className="games-grid">
        <SnakeGame />
        <Game2048 />
        <ReactionTimer />
        <TicTacToeGame />
        <MemoryMatchGame />
        <RpsGame />
        <NumberGuessGame />
        <DiceBattleGame />
      </div>
    </section>
  );
}

export default Games;
