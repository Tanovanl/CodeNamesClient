import React, { useState, useEffect } from 'react';
import apiCall from './API/api';

function TeamJoin(props) {

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
                <button className={props.team} onClick={(event) => handleButtonClick('Operative', event)}>Operative</button>
                <button className={props.team} onClick={(event) => handleButtonClick('SpyMaster', event)}>Spy Master</button>
            </form>
        </div>
    );
}

export default TeamJoin;