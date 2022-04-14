import { IBoardData, IGameShips, SHIP_TYPE } from './model';

export const ROWS = 10;
export const COLS = 10;

const generateEmptyBoard = (): IBoardData => {
    return Array.from(
        {
            length: ROWS,
        },
        () =>
            Array.from(
                {
                    length: COLS,
                },
                () => ({
                    ship: null,
                    isClicked: false,
                })
            )
    );
};

function getRandom(max: number) {
    return Math.floor(Math.random() * max);
}

const placeShips = (gameShips: IGameShips, board: IBoardData) => {
    Object.keys(gameShips).forEach((value) => {
        const shipName = value as SHIP_TYPE;
        const size = gameShips[shipName].size;
        let shipedPlaced = false;
        while (!shipedPlaced) {
            const direction = getRandom(2);
            let shipTiles = [];
            if (direction === 0) {
                const startX = getRandom(COLS - size);
                const y = getRandom(ROWS);
                for (let i = startX; i < startX + size; i++) {
                    if (board[y][i].ship) {
                        shipTiles = [];
                        break;
                    }
                    shipTiles.push([y, i]);
                }
            } else {
                const x = getRandom(COLS);
                const startY = getRandom(ROWS - size);
                for (let i = startY; i < startY + size; i++) {
                    if (board[i][x].ship) {
                        shipTiles = [];
                        break;
                    }
                    shipTiles.push([i, x]);
                }
            }
            if (shipTiles.length === size) {
                shipTiles.forEach((tile) => {
                    const [i, j] = tile;
                    board[i][j] = {
                        ship: shipName,
                        isClicked: false,
                    };
                });
                shipedPlaced = true;
            }
        }
    });
};

export const generateGameBoard = (gameShips: IGameShips) => {
    const board = generateEmptyBoard();
    placeShips(gameShips, board);
    console.log(board);
    return board;
};
