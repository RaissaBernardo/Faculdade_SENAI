//criação do elemento Square que irá compor o jogo da velha
import { useState } from 'react';
import './App.css';

//componente Square
function Square({ valor, onSquareClick }) {
  return (
    <button classname="square" onClick={onSquareClick}>
      {valor}
    </button>
  );
}

function Tabuleiro({ xIsNext, squares, onPlay }) {


  function handleClick(i) {
    const nextSquares = squares.slice();
    if (squares[i] || calculaVencedor(squares)) {
      return;
    }
    if (xIsNext) {
      nextSquares[i] = 'X';
      // setXIsNext(false);
    } else {
      nextSquares[i] = 'O';
      // setXIsNext(true);
    }
    onPlay(nextSquares);

  }

  const vencedor = calculaVencedor(squares);
  let status;
  if (vencedor) {
    status = "Vencedor: " + vencedor;
  } else {
    status = "Próximo jogador: " + (xIsNext ? "x" : "O");

  }

  return (
    <div>
      <div classname="status">{status}</div>
      <div>
        <Square valor={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square valor={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square valor={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div>
        <Square valor={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square valor={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square valor={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div>
        <Square valor={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square valor={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square valor={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}


export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];


  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Vai para o movimento #:' + move;
    } else {
      description = 'Vai para o inicio do jogo';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game_board">
        <Tabuleiro xIsNext={xIsNext} squares={currentSquares}
          onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>

      </div>
    </div>
  );
}

function calculaVencedor(squares) {
  const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
  [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null;
}