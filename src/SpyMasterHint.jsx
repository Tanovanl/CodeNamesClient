import React, { useState, useEffect } from 'react';
import apiCall from './API/api';

function SpyMasterHint() {
    const [hint, setHint] = useState('');
    const [turn, setTurn] = useState('');
    const [hintWord, setHintWord] = useState(null);
    const [team, setTeam] = useState('');
    const gameId = JSON.parse(localStorage.getItem('gameId'));
    const playerName = JSON.parse(localStorage.getItem('playerName'));

    useEffect(() => {
        const fetchGameState = async () => {
            try {
                const response = await apiCall(`/game/${gameId}`, 'GET');
                setTurn(response.turn);
                setHintWord(response.hintWord);
            } catch (error) {
                console.error('Error fetching game state:', error);
            }
        };

        const fetchRole = async () => {
            try {
                const response = await apiCall(`/game/${gameId}/player/${playerName}`, 'GET');
                setTeam(response.team);
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };

        fetchRole();
        const intervalId = setInterval(fetchGameState, 1000);

        return () => clearInterval(intervalId);
    }, [gameId, playerName]);

    const handleInputChange = (event) => {
        setHint(event.target.value);
    };

    const sendHint = async () => {
        if (hint.trim().includes(' ')) {
            alert('Hint can only be one word.');
            return;
        }

        const url = `/game/${gameId}/hint`;
        const body = { hint };

        try {
            await apiCall(url, 'POST', body);
            setHint('');
        } catch (error) {
            console.error('Error sending hint:', error);
        }
    };


    const isButtonDisabled = hintWord !== null || turn !== team;


    return (
        <div className="hint-container">
            <input
                type="text"
                value={hint}
                onChange={handleInputChange}
                placeholder="Enter your hint"
                disabled={isButtonDisabled}
            />
            <button
                onClick={sendHint}
                disabled={isButtonDisabled}
                className={isButtonDisabled ? 'disabled-button' : 'active-button'}
            >
                {isButtonDisabled ? 'Not your turn to give a hint' : 'Send Hint'}
            </button>
        </div>
    );
}

export default SpyMasterHint;