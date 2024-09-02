import React, { useState } from 'react';
import apiCall from './API/api';

function Host(){
    const [prefix, setPrefix] = useState('');
    const [gameName, setGameName] = useState('');
    const [playerName, setPlayerName] = useState('');

    const hostGame = async () => {
        const url = `/game?prefix=${prefix}&gameName=${gameName}&player=${playerName}`;
        const data = await apiCall(url, "POST");
        localStorage.removeItem('gameId');
        localStorage.removeItem('playerName');

        localStorage.setItem('gameId', JSON.stringify(data.game.gameId));
        localStorage.setItem('playerName', JSON.stringify(data.playerName));
    }

    return (
        <div id="host-div" className="card">
            <h2>Host a game</h2>
            <form action="#" className="host-form" onSubmit={(e) => { e.preventDefault(); hostGame(); }}>
                <label htmlFor="prefix">Prefix</label>
                <input type="text" id="prefix" value={prefix} onChange={(e) => setPrefix(e.target.value)}/>

                <label htmlFor="gameName">Game Name</label>
                <input type="text" id="gameName" value={gameName} onChange={(e) => setGameName(e.target.value)}/>

                <label htmlFor="playerName">Player Name</label>
                <input type="text" id="playerName" value={playerName} onChange={(e) => setPlayerName(e.target.value)}/>

                <button id="host-button" type="submit">Host</button>
            </form>
        </div>
    )
}

export default Host;