import Board from "./components/Board";
import "./App.css";
import Snake from "./components/Snake";
import Food from "./components/Food";
import { useEffect, useState } from "react";
import useInterval from "./hooks/useInterval";
import useEventListener from "./hooks/useEventListener";



function App() {
  const initialState = [
    { x: 5, y: 40 },
    { x: 10, y: 40 },
    { x: 15, y: 40 },
  ]

  const [direction, setDirection] = useState('RIGHT');
  const [time, setTime] = useState(350);
  const [gameLoopStatus, setGameLoopStatus] = useState('STOPPED');
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
    if (gameLoopStatus === 'GAME_OVER') {
      setDirection('RIGHT');
      setSnakePosition(initialState);
      alert('Game Over');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameLoopStatus]);

  useInterval(() => {
    if (gameLoopStatus === 'PLAYING') {
      const last = snakePosition[snakePosition.length - 1];

      if (last.x === 100 || last.x === -5 || last.y === -5 || last.y === 100) {
        setGameLoopStatus('GAME_OVER');
      }

      if (last.x === foodPosition.x && last.y === foodPosition.y) { 
        setTime(time - 20);
        randomFood()
      } else {
        snakePosition.shift();
      }      

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

    switch (keyCode) {
      case 40: {
        if (direction !== 'UP') {
          setGameLoopStatus('PLAYING');
          setDirection('DOWN');
        }
        break;
      }
      case 38: {
        if (direction !== 'DOWN') {
          setGameLoopStatus('PLAYING');
          setDirection('UP');
        }
        break;
      }
      case 39: {
        if (direction !== 'LEFT') {
          setGameLoopStatus('PLAYING');
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

  function randomFood() {
    setFoodPosition({
      x: Math.ceil(Math.floor(Math.random() * 85) / 5) * 5,
      y: Math.ceil(Math.floor(Math.random() * 85) / 5) * 5
    });
  }

  useEventListener('keydown', handlePressKey);

  return (
    <div className="App">
      <h1>Snake!!!</h1>
      <Board >
        <Snake snakePosition={snakePosition} />
        <Food position={foodPosition} />
      </Board>
    </div>
  );
}

export default App;
