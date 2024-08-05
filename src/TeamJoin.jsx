import React, { useState, useEffect } from 'react';
import apiCall from './API/api';

function TeamJoin(props) {
    const [redOperativeExists, setRedOperativeExists] = useState(false);
    const [redSpyMasterExists, setRedSpyMasterExists] = useState(false);
    const [blueOperativeExists, setBlueOperativeExists] = useState(false);
    const [blueSpyMasterExists, setBlueSpyMasterExists] = useState(false);

    useEffect(() => {
        const fetchPlayers = async () => {
            const gameId = JSON.parse(localStorage.getItem('gameId'));
            let players = await apiCall(`/game/${gameId}`);
            players = players.players;
            setRedOperativeExists(players.some(player => player.team === 'RED' && player.role === 'OPERATIVE'));
            setRedSpyMasterExists(players.some(player => player.team === 'RED' && player.role === 'SPYMASTER'));
            setBlueOperativeExists(players.some(player => player.team === 'BLUE' && player.role === 'OPERATIVE'));
            setBlueSpyMasterExists(players.some(player => player.team === 'BLUE' && player.role === 'SPYMASTER'));
        };
        fetchPlayers();
    }, []);

    const handleButtonClick = async (role, event) => {
        event.preventDefault(); // Prevent form from submitting
        const gameId = JSON.parse(localStorage.getItem('gameId'));
        const playerName = JSON.parse(localStorage.getItem('playerName'));
        const team = await apiCall(`/game/${gameId}/player/${playerName}/team/${props.team.toUpperCase()}`, 'POST');
        await apiCall(`/game/${gameId}/player/${playerName}/role/${role.toUpperCase()}`, 'POST');
        console.log(team);
    };

    return (
        <div className="team-card" style={{backgroundColor: props.team}}>
            <h2 className={props.team}>{props.team} Team</h2>
            <form>
                {props.team === 'RED' && !redOperativeExists && <button className={props.team} onClick={(event) => handleButtonClick('Operative', event)}>Operative</button>}
                {props.team === 'RED' && !redSpyMasterExists && <button className={props.team} onClick={(event) => handleButtonClick('SpyMaster', event)}>Spy Master</button>}
                {props.team === 'BLUE' && !blueOperativeExists && <button className={props.team} onClick={(event) => handleButtonClick('Operative', event)}>Operative</button>}
                {props.team === 'BLUE' && !blueSpyMasterExists && <button className={props.team} onClick={(event) => handleButtonClick('SpyMaster', event)}>Spy Master</button>}
            </form>
        </div>
    );
}

export default TeamJoin;