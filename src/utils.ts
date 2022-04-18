import { IBoardData, IGameShips, SHIP_TYPE } from './model';
import { GRID_SIZE } from './constants';

const generateEmptyBoard = (): IBoardData => {
    return Array.from(
        {
            length: GRID_SIZE,
        },
        () =>
            Array.from(
                {
                    length: GRID_SIZE,
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
                const startX = getRandom(GRID_SIZE - size);
                const y = getRandom(GRID_SIZE);
                for (let i = startX; i < startX + size; i++) {
                    if (board[y][i].ship) {
                        shipTiles = [];
                        break;
                    }
                    shipTiles.push([y, i]);
                }
            } else {
                const x = getRandom(GRID_SIZE);
                const startY = getRandom(GRID_SIZE - size);
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
