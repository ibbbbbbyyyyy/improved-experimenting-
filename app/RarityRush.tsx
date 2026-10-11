"use client";

import { useEffect, useState } from "react";

const loot = [
  { rarity: "Common", icon: "◈", color: "common" },
  { rarity: "Uncommon", icon: "✦", color: "green" },
  { rarity: "Rare", icon: "☁", color: "blue" },
  { rarity: "Epic", icon: "⚡", color: "violet" },
  { rarity: "Legendary", icon: "☀", color: "gold" },
];

const roundSeconds = 15;

export default function RarityRush() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(roundSeconds);
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState(2);
  const [message, setMessage] = useState("Ready? Tap the rarity that matches the callout.");

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setSeconds((left) => Math.max(0, left - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (seconds === 0) {
      setRunning(false);
      setMessage((current) => current.startsWith("Time") ? current : "Time’s up! Take another run and beat your score.");
    }
  }, [seconds]);

  function startGame() {
    setScore(0);
    setSeconds(roundSeconds);
    setTarget(Math.floor(Math.random() * loot.length));
    setMessage("Go! Find the matching rarity.");
    setRunning(true);
  }

  function pickCard(index: number) {
    if (!running) return;
    if (index === target) {
      setScore((current) => current + 1);
      setMessage("Nice pick! Find the next one.");
    } else {
      setMessage("Not that one! Keep your eyes on the callout.");
    }
    setTarget((current) => (current + 1 + Math.floor(Math.random() * (loot.length - 1))) % loot.length);
  }

  return (
    <section className="game-section" id="game" aria-labelledby="game-title">
      <div className="game-wrap">
        <div className="game-intro">
          <p className="eyebrow">QUICK PLAY <span className="game-tag">/ MINI GAME</span></p>
          <h2 id="game-title">RARITY<br/><em>RUSH.</em></h2>
          <p>Spot the callout. Grab the matching loot. How many can you find before the timer hits zero?</p>
          <div className="game-stats" aria-live="polite">
            <div><span>TIME</span><strong>{seconds}<small>s</small></strong></div>
            <div><span>SCORE</span><strong>{score.toString().padStart(2, "0")}</strong></div>
          </div>
          <button className="button game-start" onClick={startGame}>{running ? "Restart round" : seconds === 0 ? "Play again" : "Start game"}<b aria-hidden="true">→</b></button>
        </div>
        <div className="game-board">
          <div className="game-callout"><span>FIND THIS RARITY</span><strong className={`callout-${loot[target].color}`}>{loot[target].rarity}<i aria-hidden="true">✦</i></strong></div>
          <div className="loot-options" aria-label="Choose a loot rarity">
            {loot.map((item, index) => <button key={item.rarity} className={`loot-card loot-${item.color}`} onClick={() => pickCard(index)} disabled={!running} aria-label={`${item.rarity} rarity`}>
              <span aria-hidden="true">{item.icon}</span><small>{item.rarity}</small>
            </button>)}
          </div>
          <p className="game-message" aria-live="polite">{message}</p>
          <div className="game-board-foot"><span>⏱ 15 SECOND ROUND</span><span>✦ QUICK EYES WIN</span></div>
        </div>
      </div>
    </section>
  );
}
