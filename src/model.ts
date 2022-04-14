export type SHIP_TYPE = 'carrier' | 'battleship' | 'cruiser' | 'submarine' | 'destroyer';

export interface IBoardData extends Array<Array<ITileData>> {}

export interface IGameShip {
    size: number;
    count: number;
}

export type IGameShips = {
    [key in SHIP_TYPE as string]: IGameShip;
};

export interface ITileData {
    ship: null | SHIP_TYPE;
    isClicked: boolean;
}
