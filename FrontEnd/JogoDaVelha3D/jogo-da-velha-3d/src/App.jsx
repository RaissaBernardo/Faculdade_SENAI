import React, { useState, useMemo } from "react";
import "./index.css";

function idx(x, y, z) {
  return z * 9 + y * 3 + x;
}

function generateWinningLines() {
  const lines = new Set();
  const dirs = [];
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dz = -1; dz <= 1; dz++) {
        if (dx === 0 && dy === 0 && dz === 0) continue;
        dirs.push([dx, dy, dz]);
      }
    }
  }

  for (let z = 0; z < 3; z++) {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        for (const [dx, dy, dz] of dirs) {
          const p1 = [x, y, z];
          const p2 = [x + dx, y + dy, z + dz];
          const p3 = [x + 2 * dx, y + 2 * dy, z + 2 * dz];

          const inBounds = (p) =>
            p[0] >= 0 &&
            p[0] < 3 &&
            p[1] >= 0 &&
            p[1] < 3 &&
            p[2] >= 0 &&
            p[2] < 3;

          if (inBounds(p1) && inBounds(p2) && inBounds(p3)) {
            const indices = [p1, p2, p3].map(([xx, yy, zz]) => idx(xx, yy, zz));
            const sortedKey = [...indices].sort((a, b) => a - b).join(",");
            lines.add(sortedKey);
          }
        }
      }
    }
  }

  const result = [];
  for (const key of lines) {
    const arr = key.split(",").map((s) => Number(s));
    result.push(arr);
  }
  return result;
}

const WIN_LINES = generateWinningLines(); // computed once

function Square({ value, onClick, highlight }) {
  return (
    <button
      className={`square ${highlight ? "highlight" : ""}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default function App() {
  const emptyBoard = Array(27).fill(null);

  const [history, setHistory] = useState([emptyBoard]);
  const [step, setStep] = useState(0);
  const board = history[step];
  const xIsNext = step % 2 === 0;
  const nextPlayer = xIsNext ? "X" : "O";

  const { winner, winningLine } = useMemo(() => {
    for (const line of WIN_LINES) {
      const [a, b, c] = line;
      const v = board[a];
      if (v && board[b] === v && board[c] === v) {
        return { winner: v, winningLine: line };
      }
    }
    const draw = board.every((cell) => cell !== null);
    return { winner: draw ? "Draw" : null, winningLine: null };
  }, [board]);

  function handleClick(index) {
    if (winner) return;
    if (board[index]) return;
    const newBoard = board.slice();
    newBoard[index] = nextPlayer;
    const newHistory = history.slice(0, step + 1);
    newHistory.push(newBoard);
    setHistory(newHistory);
    setStep(newHistory.length - 1);
  }

  function undo() {
    if (step === 0) return;
    setStep(step - 1);
  }

  function redo() {
    if (step >= history.length - 1) return;
    setStep(step + 1);
  }

  function restart() {
    setHistory([emptyBoard]);
    setStep(0);
  }

  function renderLevel(z) {
    const cells = [];
    for (let y = 0; y < 3; y++) {
      const row = [];
      for (let x = 0; x < 3; x++) {
        const i = idx(x, y, z);
        const highlight = winningLine && winningLine.indexOf(i) !== -1;
        row.push(
          <Square
            key={i}
            value={board[i]}
            onClick={() => handleClick(i)}
            highlight={highlight}
          />
        );
      }
      cells.push(
        <div key={y} className="board-row">
          {row}
        </div>
      );
    }
    return (
      <div className="level" key={z}>
        <div className="level-title">Nível {z + 1}</div>
        <div className="board">{cells}</div>
      </div>
    );
  }

  let status;
  if (winner === "Draw") status = "Empate!";
  else if (winner) status = `Vencedor: ${winner}`;
  else status = `Próximo: ${nextPlayer}`;

  return (
    <div className="app">
      <h1>Jogo-da-velha 3D</h1>
      <p className="instructions">Faça 3 em linha em qualquer direção 3D.</p>

      <div className="controls">
        <button onClick={undo} disabled={step === 0}>
          Desfazer
        </button>
        <button onClick={redo} disabled={step >= history.length - 1}>
          Refazer
        </button>
        <button onClick={restart}>Reiniciar</button>
        <div className="status">{status}</div>
      </div>

      <div className="levels-container">
        {/* desenha os três níveis verticalmente para dar sensação de pilha */}
        {[0, 1, 2].map((z) => renderLevel(z))}
      </div>

      <div className="linha"></div>

      <div className="history">
        <h3>Histórico</h3>
        <ol>
          {history.map((_, move) => {
            const desc = move === 0 ? "Início" : `Movimento #${move}`;
            return (
              <li key={move}>
                <button
                  onClick={() => setStep(move)}
                  className={move === step ? "current-step" : ""}
                >
                  {desc}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
