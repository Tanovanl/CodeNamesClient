import React, { useState, useEffect } from 'react';
import apiCall from './API/api';
import { useContext } from 'react';
import { CardContext } from './CardProvider';

function Guess() {
    const { cardName } = useContext(CardContext);
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

    const sendGuess = async () => {
        const url = `/game/${gameId}`;
        const body = {
            playerName: playerName,
            cardName: cardName
        };
        try {
            await apiCall(url, 'POST', body);
        } catch (error) {
            console.error('Error sending hint:', error);
        }
    };

    const isButtonDisabled = hintWord === null || turn !== team;

    return (
        <div className="hint-container">
            <button
                onClick={sendGuess}
                disabled={isButtonDisabled}
                className={isButtonDisabled ? 'disabled-button' : 'active-button'}
            >
                {isButtonDisabled ? 'Not your turn to guess' : 'Guess current selected card'}
            </button>
        </div>
    );
}

export default Guess;