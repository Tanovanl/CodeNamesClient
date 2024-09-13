import React, { useState } from 'react';
import apiCall from './API/api';
import { useNavigate } from 'react-router-dom';


function Host(){
    const navigate = useNavigate();
    const [prefix, setPrefix] = useState('');
    const [gameName, setGameName] = useState('');
    const [playerName, setPlayerName] = useState('');

    const hostGame = async () => {
        const url = `/game`;
        const body = {
            "prefix": prefix,
            "gameName": gameName,
            "player": playerName
        };

        const data = await apiCall(url, "POST", body);
        localStorage.removeItem('gameId');
        localStorage.removeItem('playerName');

        localStorage.setItem('gameId', JSON.stringify(data.game.gameId));
        localStorage.setItem('playerName', JSON.stringify(data.playerName));

        const gameId = JSON.parse(localStorage.getItem('gameId'));
        if (gameId) {
            try {
                await apiCall(`/game/${gameId}`, "GET");
                navigate('/teamjoin');
            } catch (error) {
                console.error(error);
            }
        }
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