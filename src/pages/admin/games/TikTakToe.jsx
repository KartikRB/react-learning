import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/admin/Header";

export default function TikTakToe() {
  const navigate = useNavigate();

  const actions = [
    {
      icon: "back",
      label: "Back",
      onClick: () => navigate("/admin/games"),
      variant: "btn-outline-primary btn-sm fw-bold",
    },
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winnerData = calculateWinner(board);
  const winner = winnerData?.winner;
  const winningLine = winnerData?.line;

  function handleClick(index) {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  function renderStatus() {
    if (winner) return `🎉 Winner: ${winner}`;
    if (!board.includes(null)) return "🤝 Draw!";
    return `Next Player: ${isXNext ? "X" : "O"}`;
  }

  return (
    <div>
      <Header title="ⵌ Tic Tac Toe" actions={actions} />

      <div className="d-flex flex-column align-items-center mt-4 bg-dark p-5">
        <h4 className="mb-3 text-light">{renderStatus()}</h4>

        <div className="d-grid gap-2" style={{ gridTemplateColumns: "repeat(3, 80px)" }}>
          {board.map((cell, i) => (
            <button
              key={i}
              className={`btn btn-outline-primary fs-2 rounded-3 ${
                winningLine?.includes(i) ? "btn-success text-light border-success" : ""
              }`}
              style={{ width: "80px", height: "80px" }}
              onClick={() => handleClick(i)}
            >
              {cell}
            </button>
          ))}
        </div>

        <button className="btn btn-primary text-dark mt-3 fw-bold" onClick={resetGame}>
          <i className="fa fa-refresh"></i> Restart
        </button>
      </div>
    </div>
  );
}

// Helper function
function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return null;
}
