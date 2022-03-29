import Board from "./components/Board";
import "./App.css";
import Snake from "./components/Snake";
import Food from "./components/Food";
import { useState } from "react";
import useInterval from "./hooks/useInterval";
import useEventListener from "./hooks/useEventListener";



function App() {

  const initialState = [
    { x: 0, y: 0 },
    { x: 5, y: 0 },
    { x: 10, y: 0 },
  ]

  const [direction, setDirection] = useState('RIGHT');
  const [time, setTime] = useState(350);
  const [gameLoopStatus, setGameLoopStatus] = useState('PLAYING');
  const [snakePosition, setSnakePosition] = useState(initialState);

  function handlePosition({ x, y }: { x: number, y: number }) {
    const newSnakePosition = [...snakePosition];
    setSnakePosition([...newSnakePosition, { x, y }]);
  }

  useInterval(() => {
    if (gameLoopStatus === 'PLAYING') {
      const last = snakePosition[snakePosition.length - 1];

      if (last.x === 100) {
        setGameLoopStatus('GAME_OVER');
        setSnakePosition([...initialState]);
        return alert('You Lose!');
      }

      snakePosition.shift();

      if (direction === 'RIGHT') {
        handlePosition({ x: last.x + 5, y: last.y });
      } else if (direction === 'DOWN') {
        handlePosition({ x: last.x, y: last.y + 5 });
      } else if (direction === 'UP') {
        handlePosition({ x: last.x, y: last.y - 5 });
      } else if (direction === 'LEFT') {
        handlePosition({ x: last.x - 5, y: last.y });
      }
    }
  }, time);

  function handlePressKey(event: any) {
    const { keyCode } = event;

    setGameLoopStatus('PLAYING');

    switch (keyCode) {
      case 40: {
        if (direction !== 'UP') {
          setDirection('DOWN');
        }
        break;
      }
      case 38: {
        if (direction !== 'DOWN') {
          setDirection('UP');
        }
        break;
      }
      case 39: {
        if (direction !== 'LEFT') {
          setDirection('RIGHT');
        }
        break;
      }
      case 37: {
        if (direction !== 'RIGHT') {
          setDirection('LEFT');
        }
        break;
      }
    }
  }

  useEventListener('keydown', handlePressKey);

  return (
    <div className="App">
      <h1>Snake!!!</h1>
      <Board >
        <Snake snakePosition={snakePosition} />
        <Food />
      </Board>
    </div>
  );
}

export default App;
