import { useState, useEffect, useCallback } from "react";

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborCount: number;
}

export const Minesweeper = () => {
  const GRID_SIZE = 9;
  const MINE_COUNT = 10;
  
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [flagCount, setFlagCount] = useState(MINE_COUNT);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const initializeGrid = useCallback(() => {
    const newGrid: Cell[][] = [];
    
    // Create empty grid
    for (let row = 0; row < GRID_SIZE; row++) {
      newGrid[row] = [];
      for (let col = 0; col < GRID_SIZE; col++) {
        newGrid[row][col] = {
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborCount: 0
        };
      }
    }

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < MINE_COUNT) {
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      
      if (!newGrid[row][col].isMine) {
        newGrid[row][col].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbor counts
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (!newGrid[row][col].isMine) {
          let count = 0;
          for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
              const newRow = row + r;
              const newCol = col + c;
              if (
                newRow >= 0 && newRow < GRID_SIZE &&
                newCol >= 0 && newCol < GRID_SIZE &&
                newGrid[newRow][newCol].isMine
              ) {
                count++;
              }
            }
          }
          newGrid[row][col].neighborCount = count;
        }
      }
    }

    setGrid(newGrid);
    setGameState('playing');
    setFlagCount(MINE_COUNT);
    setTime(0);
    setGameStarted(false);
  }, []);

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && gameState === 'playing') {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameState]);

  const revealCell = (row: number, col: number) => {
    if (!gameStarted) setGameStarted(true);
    if (gameState !== 'playing' || grid[row][col].isFlagged || grid[row][col].isRevealed) return;

    const newGrid = [...grid];
    
    if (newGrid[row][col].isMine) {
      // Game over - reveal all mines
      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          if (newGrid[r][c].isMine) {
            newGrid[r][c].isRevealed = true;
          }
        }
      }
      setGameState('lost');
    } else {
      // Reveal cell and potentially neighbors
      const revealRecursive = (r: number, c: number) => {
        if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) return;
        if (newGrid[r][c].isRevealed || newGrid[r][c].isFlagged || newGrid[r][c].isMine) return;
        
        newGrid[r][c].isRevealed = true;
        
        if (newGrid[r][c].neighborCount === 0) {
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              revealRecursive(r + dr, c + dc);
            }
          }
        }
      };
      
      revealRecursive(row, col);
      
      // Check for win condition
      let revealedCount = 0;
      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          if (newGrid[r][c].isRevealed && !newGrid[r][c].isMine) {
            revealedCount++;
          }
        }
      }
      
      if (revealedCount === GRID_SIZE * GRID_SIZE - MINE_COUNT) {
        setGameState('won');
      }
    }
    
    setGrid(newGrid);
  };

  const toggleFlag = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (!gameStarted) setGameStarted(true);
    if (gameState !== 'playing' || grid[row][col].isRevealed) return;

    const newGrid = [...grid];
    newGrid[row][col].isFlagged = !newGrid[row][col].isFlagged;
    setFlagCount(prev => newGrid[row][col].isFlagged ? prev - 1 : prev + 1);
    setGrid(newGrid);
  };

  const getCellContent = (cell: Cell) => {
    if (cell.isFlagged) return '🚩';
    if (!cell.isRevealed) return '';
    if (cell.isMine) return '💣';
    if (cell.neighborCount === 0) return '';
    return cell.neighborCount.toString();
  };

  const getCellStyle = (cell: Cell) => {
    let baseStyle = "w-6 h-6 text-xs flex items-center justify-center font-bold border ";
    
    if (!cell.isRevealed) {
      baseStyle += "win95-button cursor-pointer";
    } else {
      baseStyle += "bg-win95-light-gray border-win95-dark-gray";
      if (cell.isMine) {
        baseStyle += " bg-red-500";
      }
    }
    
    // Number colors (classic Minesweeper)
    if (cell.isRevealed && !cell.isMine && cell.neighborCount > 0) {
      const colors = ['', 'text-blue-600', 'text-green-600', 'text-red-600', 'text-purple-600', 'text-yellow-600', 'text-pink-600', 'text-black', 'text-gray-600'];
      baseStyle += ` ${colors[cell.neighborCount]}`;
    }
    
    return baseStyle;
  };

  return (
    <div className="p-4 bg-win95-gray">
      {/* Game Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="win95-button px-2 py-1 text-xs flex items-center gap-1">
          <span>💣</span>
          <span>{flagCount.toString().padStart(3, '0')}</span>
        </div>
        
        <button 
          className="win95-button text-lg" 
          onClick={initializeGrid}
          title="New Game"
        >
          {gameState === 'won' ? '😎' : gameState === 'lost' ? '😵' : '🙂'}
        </button>
        
        <div className="win95-button px-2 py-1 text-xs flex items-center gap-1">
          <span>⏱️</span>
          <span>{time.toString().padStart(3, '0')}</span>
        </div>
      </div>

      {/* Game Grid */}
      <div className="inline-block border-2 border-win95-dark-gray p-2 bg-win95-gray">
        <div className="grid grid-cols-9 gap-0">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={getCellStyle(cell)}
                onClick={() => revealCell(rowIndex, colIndex)}
                onContextMenu={(e) => toggleFlag(e, rowIndex, colIndex)}
              >
                {getCellContent(cell)}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Game Status */}
      {gameState !== 'playing' && (
        <div className="mt-4 text-center">
          <div className="win95-window inline-block">
            <div className="win95-title-bar text-center">
              <span>Game Over</span>
            </div>
            <div className="p-4 bg-win95-white">
              <div className="text-sm mb-2">
                {gameState === 'won' ? '🎉 Congratulations! You won!' : '💥 Game Over! Try again?'}
              </div>
              <button className="win95-button px-4 py-1" onClick={initializeGrid}>
                New Game
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};