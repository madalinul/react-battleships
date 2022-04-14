import './App.css';
import Board from './components/Board';
import { useState } from 'react';

function App() {
    const [gameLog, setGameLog] = useState('Click a tile to start the game');

    return (
        <div className='App'>
            <h2>{gameLog}</h2>
            <Board setGameLog={setGameLog} />
        </div>
    );
}

export default App;
