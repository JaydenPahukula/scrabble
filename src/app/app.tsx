import { useEffect, useState } from 'react';
import './app.css';

const N = 15;

export default function App() {
  const [grid, setGrid] = useState<string[][]>(Array(N).fill(Array(N).fill('')));

  useEffect(() => {
    console.log('grid', grid);
  }, [grid]);

  return (
    <div id="app">
      <div id="board">
        {grid.map((row, y) => (
          <div className="board-row">
            {row.map((cell, x) => (
              <div className="cell"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
