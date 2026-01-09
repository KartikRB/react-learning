import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/admin/Header";

const BOARD_SIZE = 30;
const INITIAL_SNAKE = [{ x: 15, y: 15 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };

export default function SnakeGame() {
  const navigate = useNavigate();
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(generateFood(INITIAL_SNAKE));
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState('100');

  const handleChange = (event) => {
    setDifficulty(event.target.value);
  };

  const directionRef = useRef(direction);
  directionRef.current = direction;

  // Game loop (only runs when playing)
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const interval = setInterval(moveSnake, difficulty);
    return () => clearInterval(interval);
  }, [snake, isPlaying, gameOver]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying) return;

      if (e.key === "ArrowUp" && directionRef.current.y !== 1)
        setDirection({ x: 0, y: -1 });
      if (e.key === "ArrowDown" && directionRef.current.y !== -1)
        setDirection({ x: 0, y: 1 });
      if (e.key === "ArrowLeft" && directionRef.current.x !== 1)
        setDirection({ x: -1, y: 0 });
      if (e.key === "ArrowRight" && directionRef.current.x !== -1)
        setDirection({ x: 1, y: 0 });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  function moveSnake() {
    const newHead = {
      x: snake[0].x + directionRef.current.x,
      y: snake[0].y + directionRef.current.y,
    };

    // Wall collision
    if (
      newHead.x < 0 ||
      newHead.y < 0 ||
      newHead.x >= BOARD_SIZE ||
      newHead.y >= BOARD_SIZE
    ) {
      setGameOver(true);
      setIsPlaying(false);
      return;
    }

    // Self collision
    for (let segment of snake) {
      if (segment.x === newHead.x && segment.y === newHead.y) {
        setGameOver(true);
        setIsPlaying(false);
        return;
      }
    }

    const newSnake = [newHead, ...snake];

    // Eat frog 🐸
    if (newHead.x === food.x && newHead.y === food.y) {
      setScore((s) => s + 10);
      if(score >= highScore){
        setHighScore(score + 10);
      }
      setFood(generateFood(newSnake));
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }

  function startGame() {
    setIsPlaying(true);
    setGameOver(false);
  }

  function restartGame() {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  }

  const actions = [
    { icon: "back", label: "Back", onClick: () => navigate("/admin/games"), variant: "btn-outline-primary btn-sm fw-bold" },
  ];

  return (
    <div>
      <Header title="🐍 Snake Game" actions={actions} />
      <div style={styles.container}>
        <div className="row g-5">
          <div style={styles.panel} className="col-4">
            <div className="mb-0" style={styles.score}><i className="fa fa-star text-warning"></i> Your Score: <span className="text-color-primary fw-bold">{score}</span></div>
            <div style={styles.score}><i className="fa fa-crown text-warning"></i> High Score: <span className="text-danger fw-bold">{highScore}</span></div>
            <div className="my-5">
              <h3 className="text-color-primary fw-bold mb-3 lh-1">Select Difficulty Level:</h3>
              <label className="mb-3 form-check-label fw-bold fs-4">
                <input
                  className="form-check-input me-4"
                  type="radio"
                  name="difficulty"
                  value="140"
                  checked={difficulty === '140'}
                  style={{ height: "24px", width: "24px"}}
                  onChange={handleChange}
                />
                Very Easy
              </label>
              <br />
              <label className="mb-3 form-check-label fw-bold fs-4">
                <input
                  className="form-check-input me-4"
                  type="radio"
                  name="difficulty"
                  value="120"
                  checked={difficulty === '120'}
                  style={{ height: "24px", width: "24px"}}
                  onChange={handleChange}
                />
                Easy
              </label>
              <br />
              <label className="mb-3 form-check-label fw-bold fs-4">
                <input
                  className="form-check-input me-4"
                  type="radio"
                  name="difficulty"
                  value="100"
                  checked={difficulty === '100'}
                  style={{ height: "24px", width: "24px"}}
                  onChange={handleChange}
                />
                Medium
              </label>
              <br />
              <label className="mb-3 form-check-label fw-bold fs-4">
                <input
                  className="form-check-input me-4"
                  type="radio"
                  name="difficulty"
                  value="80"
                  checked={difficulty === '80'}
                  style={{ height: "24px", width: "24px"}}
                  onChange={handleChange}
                />
                Hard
              </label>
              <br />
              <label className="mb-3 form-check-label fw-bold fs-4">
                <input
                  className="form-check-input me-4"
                  type="radio"
                  name="difficulty"
                  value="60"
                  checked={difficulty === '60'}
                  style={{ height: "24px", width: "24px"}}
                  onChange={handleChange}
                />
                Extra Hard
              </label>
            </div>
            
            
          </div>
          <div className="col-6">
            <div style={styles.board}>
            {snake.map((segment, index) => (
              <div
                key={index}
                style={{
                  ...styles.snake,
                  ...(index === 0 ? styles.snakeHead : {}),
                  left: `${(segment.x / BOARD_SIZE) * 100}%`,
                  top: `${(segment.y / BOARD_SIZE) * 100}%`,
                }}
              />
            ))}
              {/* Frog food */}
              <div
                style={{
                  ...styles.food,
                  left: `${(food.x / BOARD_SIZE) * 100}%`,
                  top: `${(food.y / BOARD_SIZE) * 100}%`,
                }}
              >
                <i className="fa fa-frog text-warning"></i>
              </div>
              {gameOver && (
                <div style={styles.overlay}>
                  <h1 className="text-danger fw-bold mb-3">💀 Game Over</h1>
                  <h4 className="mb-4">Final Score: {score}</h4>
                  <button style={styles.button} onClick={restartGame}>
                    <i className="fa fa-refresh"></i> Restart
                  </button>
                </div>
              )}
              {!isPlaying && !gameOver && (
                <div style={styles.overlay}>
                  <h1 className="text-warning fw-bold mb-3">🏁 Start Now</h1>
                  <button style={styles.button} onClick={startGame}>
                    <i className="fa fa-play"></i> Play
                  </button>
                </div>
              )}
            </div>
          </div>
          <div style={styles.panel} className="col-2">
            <h4 className="text-color-primary fw-bold mb-3">📊 Stats</h4>

            <div className="mb-3">
              <span className="fw-bold">Length:</span>
              <span className="float-end">{snake.length}</span>
            </div>

            <div className="mb-3">
              <span className="fw-bold">Speed:</span>
              <span
                className={`float-end badge ${
                  difficulty <= 80
                    ? "bg-danger"
                    : difficulty <= 120
                    ? "bg-warning text-dark"
                    : "bg-success"
                }`}
              >
                {difficulty <= 80
                  ? "Fast"
                  : difficulty <= 120
                  ? "Normal"
                  : "Slow"}
              </span>
            </div>

            <div className="mb-3">
              <span className="fw-bold">Status:</span>
              <span className={`float-end text-dark badge ${isPlaying ? "bg-color-primary" : "bg-light"}`}>
                <i className={`fa fa-${isPlaying ? 'play' : 'pause'}`}></i> {isPlaying ? "Playing" : "Paused"}
              </span>
            </div>

            <hr className="my-4" />

            <h4 className="text-color-primary fw-bold mb-3">🎮 Controls</h4>
            <ul className="list-unstyled fs-5">
              <li className="mt-2"><i className="fa fa-arrow-up bg-color-primary p-1 rounded text-dark"></i> Move Up</li>
              <li className="mt-2"><i className="fa fa-arrow-down bg-color-primary p-1 rounded text-dark"></i> Move Down</li>
              <li className="mt-2"><i className="fa fa-arrow-left bg-color-primary p-1 rounded text-dark"></i> Move Left</li>
              <li className="mt-2"><i className="fa fa-arrow-right bg-color-primary p-1 rounded text-dark"></i> Move Right</li>
            </ul>

            <hr className="my-4" />

            <h5 className="fw-bold text-warning">💡 Tips</h5>
            <ul className="small">
              <li>Don’t reverse direction.</li>
              <li>Plan turns early.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helpers
function generateFood(snake) {
  while (true) {
    const food = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };

    if (!snake.some((s) => s.x === food.x && s.y === food.y)) {
      return food;
    }
  }
}

// Styles
const styles = {
  container: {
    background: "radial-gradient(circle at top, #020617, #000)",
    color: "#e5e7eb",
    padding: "100px",
  },

  score: {
    marginBottom: 14,
    fontSize: 40,
    letterSpacing: 1,
  },

  panel: {
    background: "linear-gradient(180deg, #020617, #020617cc)",
    border: "1px solid #0ea5e9",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 0 25px rgba(14,165,233,.25)",
  },

  boardWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  board: {
    position: "relative",
    width: 650,
    height: 650,
    background:
      "linear-gradient(#020617 1px, transparent 1px), linear-gradient(90deg, #020617 1px, transparent 1px)",
    backgroundSize: "23px 23px",
    borderRadius: 18,
    border: "2px solid #22d3ee",
    boxShadow: "0 0 40px rgba(34,211,238,.45)",
    overflow: "hidden",
  },

  snake: {
    position: "absolute",
    width: `${100 / BOARD_SIZE}%`,
    height: `${100 / BOARD_SIZE}%`,
    background: "linear-gradient(135deg, #22d3ee, #0ea5e9)",
    borderRadius: 6,
    boxShadow: "0 0 10px rgba(34,211,238,.9)",
  },

  snakeHead: {
    background: "linear-gradient(135deg, #a5f3fc, #22d3ee)",
    boxShadow: "0 0 20px rgba(165,243,252,1)",
  },

  food: {
    position: "absolute",
    width: `${100 / BOARD_SIZE}%`,
    height: `${100 / BOARD_SIZE}%`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    filter: "drop-shadow(0 0 6px #ffc107)",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(2,6,23,.85)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backdropFilter: "blur(4px)",
  },

  button: {
    marginTop: 20,
    padding: "12px 28px",
    background: "linear-gradient(135deg, #22d3ee, #0ea5e9)",
    border: "none",
    borderRadius: 999,
    fontSize: 16,
    cursor: "pointer",
    fontWeight: "bold",
    color: "#020617",
    boxShadow: "0 0 15px rgba(34,211,238,.6)",
    transition: "all .2s ease",
  },
};
