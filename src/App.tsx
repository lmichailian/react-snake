import Board from "./components/Board";
import "./App.css";
import Snake from "./components/Snake";
import Food from "./components/Food";
import { useEffect, useState } from "react";
import useInterval from "./hooks/useInterval";
import useEventListener from "./hooks/useEventListener";
import { Direction, GameStatus } from "./types";

import title from './assets/title.png';

const MIN = 5
const MAX = 85
const INITIAL_Y = 40
const INITIAL_TIME = 350;

function App() {
  const initialState = [
    { x: MIN, y: INITIAL_Y },
    { x: MIN * 2, y: INITIAL_Y },
    { x: MIN * 3, y: INITIAL_Y },
  ]

  const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
  const [time, setTime] = useState(INITIAL_TIME);
  const [gameLoopStatus, setGameLoopStatus] = useState<GameStatus>(GameStatus.STOPPED);
  const [foodPosition, setFoodPosition] = useState({ x: 0, y: 0 });
  const [snakePosition, setSnakePosition] = useState(initialState);

  function handlePosition({ x, y }: { x: number, y: number }) {
    const newSnakePosition = [...snakePosition];
    setSnakePosition([...newSnakePosition, { x, y }]);
  }

  useEffect(() => {
    randomFood()
  }, [])

  useEffect(() => {
    if (gameLoopStatus === GameStatus.GAME_OVER) {
      setDirection(Direction.RIGHT);
      setSnakePosition(initialState);
      setTime(INITIAL_TIME)
      alert('Game Over');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameLoopStatus]);

  useInterval(() => {
    if (gameLoopStatus === GameStatus.STARTED) {
      const head = snakePosition[snakePosition.length - 1];
      const outOfBounds = head.x === 100 || head.x === -5 || head.y === -5 || head.y === 100;

      if (outOfBounds) {
        setGameLoopStatus(GameStatus.GAME_OVER);
      }
      const foodCollide = head.x === foodPosition.x && head.y === foodPosition.y
      
      if (foodCollide) {
        setTime(time - 20);
        randomFood()
      } else {
        snakePosition.shift();
      }

      if (direction === Direction.RIGHT) {
        handlePosition({ x: head.x + MIN, y: head.y });
      } else if (direction === Direction.DOWN) {
        handlePosition({ x: head.x, y: head.y + MIN });
      } else if (direction === Direction.UP) {
        handlePosition({ x: head.x, y: head.y - MIN });
      } else if (direction === Direction.LEFT) {
        handlePosition({ x: head.x - MIN, y: head.y });
      }
    }
  }, time);

  function handlePressKey(event: any) {
    const { keyCode } = event;

    switch (keyCode) {
      case 40: {
        if (direction !== Direction.UP) {
          setGameLoopStatus(GameStatus.STARTED);
          setDirection(Direction.DOWN);
        }
        break;
      }
      case 38: {
        if (direction !== Direction.DOWN) {
          setGameLoopStatus(GameStatus.STARTED);
          setDirection(Direction.UP);
        }
        break;
      }
      case 39: {
        if (direction !== Direction.LEFT) {
          setGameLoopStatus(GameStatus.STARTED);
          setDirection(Direction.RIGHT);
        }
        break;
      }
      case 37: {
        if (direction !== Direction.RIGHT) {

          setDirection(Direction.LEFT);
        }
        break;
      }
    }
  }

  function randomFood() {
    setFoodPosition({
      x: Math.ceil(Math.floor(Math.random() * MAX) / MIN) * MIN,
      y: Math.ceil(Math.floor(Math.random() * MAX) / MIN) * MIN
    });
  }

  useEventListener('keydown', handlePressKey);

  return (
    <div className="App">
      <img className="title" src={title} alt="logo" />
      <Board >
        <Snake snakePosition={snakePosition} />
        <Food position={foodPosition} />
      </Board>
    </div>
  );
}

export default App;
