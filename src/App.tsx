import Board from "./components/Board";
import "./App.css";
import Snake from "./components/Snake";
import Food from "./components/Food";
import { useState } from "react";

const LIMIT = 85;

function App() {
  const [snakePosition, setSnakePosition] = useState([
    { x: 0, y: 0 },
    { x: 5, y: 0 },
    { x: 10, y: 0 },
  ]);

  function randomFood() {
    return {
      x: Math.floor(Math.random() * LIMIT),
      y: Math.floor(Math.random() * LIMIT)
    };
  }


  return (
    <div className="App">
      <h1>Snake!!!</h1>
      <Board>
        <Snake snakePosition={snakePosition} />
        <Food position={randomFood()} />
      </Board>
    </div>
  );
}

export default App;
