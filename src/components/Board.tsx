import { useEffect, useState } from 'react';
import { generateGameBoard } from './../utils';
import Tile from './Tile';
import { ITileData } from './../model';
import { GRID_SIZE, CELL_GAP, CELL_SIZE } from '../constants';

const ships: any = {
    carrier: { size: 5, count: 1 },
    battleship: { size: 4, count: 1 },
    cruiser: { size: 3, count: 1 },
    submarine: { size: 3, count: 1 },
    destroyer: { size: 2, count: 1 },
};

const boardVariablesStyle = {
    '--grid-size': GRID_SIZE,
    '--cell-size': CELL_SIZE + 'vmin',
    '--cell-gap': CELL_GAP + 'vmin',
} as React.CSSProperties;

interface IBoardProps {
    setGameLog: (gameLog: string) => void;
}

export default function Board({ setGameLog }: IBoardProps) {
    const [gameBoard, setGameBoard] = useState(() => generateGameBoard(ships));
    const [gameShips, setGameShips] = useState(() => ({ ...ships }));
    const [cheater, setCheater] = useState(false);

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'KeyC') {
                setCheater(true);
            }
        });
        document.addEventListener('keyup', (event) => {
            if (event.code === 'KeyC') {
                setCheater(false);
            }
        });
    }, []);

    const startNewGame = () => {
        setGameBoard(() => generateGameBoard(ships));
        setGameShips(() => ({ ...ships }));
        setGameLog('Click a tile to start the game');
    };

    const onTileClick = (row: number, column: number, tileData: ITileData) => {
        setGameBoard((prevBoard) => {
            const board = [...prevBoard];
            board[row] = [...board[row]];
            const newTileData = { ...tileData, isClicked: true };
            board[row][column] = newTileData;
            if (tileData.ship) {
                const gameShip = { ...gameShips[tileData.ship] };
                gameShip.size = gameShip.size - 1;
                setGameShips({
                    ...gameShips,
                    [tileData.ship]: gameShip,
                });
                if (gameShip.size === 0) {
                    setGameLog(`You sunk a ${tileData.ship} 🥳🥳🥳`);
                } else {
                    setGameLog(`You hit! 😄`);
                }
            } else {
                setGameLog('You missed! 😱');
            }
            return board;
        });
    };

    const gameOver = Object.keys(gameShips).every((key) => gameShips[key as string].size === 0);

    if (gameOver) {
        return (
            <>
                <h1>GAME OVER!!!</h1>
                <button onClick={startNewGame}>Click to play again</button>
            </>
        );
    }

    return (
        <div className={`Board ${cheater ? 'Cheater' : ''}`} style={boardVariablesStyle}>
            {gameBoard.map((row, rowIndex) => {
                return row.map((tileData, columnIndex) => {
                    return (
                        <Tile
                            key={`row_${rowIndex}-column_${columnIndex}`}
                            tileData={tileData}
                            onTileClick={() => onTileClick(rowIndex, columnIndex, tileData)}
                        />
                    );
                });
            })}
        </div>
    );
}
