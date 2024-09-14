
import { useNavigate } from 'react-router-dom';
import apiCall from './API/api';

function StartGame(props) {
    const startable = props.startable;
    const navigate = useNavigate();

    const startGame = async () => {
        const gameId = JSON.parse(localStorage.getItem('gameId'));
        const url = `/game/${gameId}/start`;
        const body = {
            "playerName": JSON.parse(localStorage.getItem('playerName'))
        }
        try {
            await apiCall(url, "POST", body);
            navigate('/game');
        } catch (error) {
            console.error("Failed to start the game:", error);
        }
    };

    return (
        <button disabled={!startable} onClick={startGame}>Start game</button>
    );
}

export default StartGame;