import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/admin/Header";

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
        <div className="row">
          <div className="col-4">
            <div className="mb-0" style={styles.score}><i className="fa fa-star text-color-primary"></i> Your Score: <span className="text-danger fw-bold">{score}</span></div>
            <div style={styles.score}><i className="fa fa-crown text-warning"></i> High Score: <span className="text-warning fw-bold">{highScore}</span></div>
            <div className="my-5">
              <h4 className="text-color-primary fw-bold mb-3 lh-1">Select Difficulty Level:</h4>
              <label className="mb-3 form-check-label fw-bold">
                <input
                  className="form-check-input me-1"
                  type="radio"
                  name="difficulty"
                  value="140"
                  checked={difficulty === '140'}
                  onChange={handleChange}
                />
                Very Easy
              </label>
              <br />
              <label className="mb-3 form-check-label fw-bold">
                <input
                  className="form-check-input me-1"
                  type="radio"
                  name="difficulty"
                  value="120"
                  checked={difficulty === '120'}
                  onChange={handleChange}
                />
                Easy
              </label>
              <br />
              <label className="mb-3 form-check-label fw-bold">
                <input
                  className="form-check-input me-1"
                  type="radio"
                  name="difficulty"
                  value="100"
                  checked={difficulty === '100'}
                  onChange={handleChange}
                />
                Medium
              </label>
              <br />
              <label className="mb-3 form-check-label fw-bold">
                <input
                  className="form-check-input me-1"
                  type="radio"
                  name="difficulty"
                  value="80"
                  checked={difficulty === '80'}
                  onChange={handleChange}
                />
                Hard
              </label>
              <br />
              <label className="mb-3 form-check-label fw-bold">
                <input
                  className="form-check-input me-1"
                  type="radio"
                  name="difficulty"
                  value="60"
                  checked={difficulty === '60'}
                  onChange={handleChange}
                />
                Extra Hard
              </label>
            </div>
            {!isPlaying && !gameOver && (
              <button style={styles.button} onClick={startGame}>
                <i className="fa fa-play"></i> Play
              </button>
            )}
            {gameOver && (
              <button style={styles.button} onClick={restartGame}>
                Restart
              </button>
            )}
          </div>
          <div className="col-8">
            <div style={styles.board}>
              {snake.map((segment, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.snake,
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
                🐸
              </div>
            </div>
            {gameOver && (
              <div style={styles.overlay}>
                <h2 className="text-danger fw-bold">Game Over</h2>
              </div>
            )}
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
    background: "#0f172a",
    color: "#e5e7eb",
    padding: "60px",
  },
  title: {
    marginBottom: 10,
  },
  score: {
    marginBottom: 15,
    fontSize: 34,
  },
  board: {
    position: "relative",
    width: 700,
    height: 700,
    background: "#020617",
    border: "3px solid #00D8FF",
    boxShadow: "0 0 20px rgb(0, 216, 255, 0.4)",
  },
  snake: {
    position: "absolute",
    width: `${100 / BOARD_SIZE}%`,
    height: `${100 / BOARD_SIZE}%`,
    background: "#00D8FF",
    borderRadius: 4,
  },
  food: {
    position: "absolute",
    width: `${100 / BOARD_SIZE}%`,
    height: `${100 / BOARD_SIZE}%`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
  },
  overlay: {
    position: "absolute",
    background: "rgb(0, 216, 255, 0.2)",
    padding: 110,
    borderRadius: 10,
    textAlign: "center",
    top: "39%",
    left: "53%",
  },
  button: {
    marginTop: 20,
    padding: "10px 24px",
    background: "#00D8FF",
    border: "none",
    borderRadius: 6,
    fontSize: 16,
    cursor: "pointer",
    fontWeight: "bold"
  },
};
