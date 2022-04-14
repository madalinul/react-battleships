import { ITileData } from './../model';

interface ITileProps {
    tileData: ITileData;
    onTileClick: () => void;
}

export default function Tile({ tileData, onTileClick }: ITileProps) {
    const getTileClass = () => {
        let tileClass = 'Tile';
        if (!tileData.isClicked) {
            return tileClass + ' TileClickable';
        }
        if (tileData.ship) {
            return tileClass + ' TileHit';
        } else {
            return tileClass + ' TileMiss';
        }
    };

    return (
        <div className={getTileClass()} onClick={onTileClick}>
            <span className='TileContent'>{tileData.ship ? 'X' : 'O'}</span>
        </div>
    );
}
