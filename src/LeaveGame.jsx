import React from 'react';
import {useNavigate} from 'react-router-dom';
import apiCall from './API/api.js';

function LeaveGame() {
    const navigate = useNavigate();

    const leaveGame = async () => {
        const gameId = JSON.parse(localStorage.getItem('gameId'));
        const playerName = JSON.parse(localStorage.getItem('playerName'));
        const url = `/game/{gameId}/player/leave`;
        const body = {
            "player": playerName
        }

        try {
            await apiCall(url, 'DELETE', body);
        } catch (error) {
            console.error('Failed to leave game:', error);
        }

        localStorage.removeItem('gameId');
        localStorage.removeItem('playerName');
        navigate('/');
    };

    return (
        <button onClick={leaveGame}>Leave Game</button>
    );
}

export default LeaveGame;