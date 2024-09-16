import { useEffect, useState } from "react";
import apiCall from "./API/api.js";

function ScoreCard(props) {
    const gameId = JSON.parse(localStorage.getItem('gameId'));
    const playerName = JSON.parse(localStorage.getItem('playerName'));
    const [score, setScore] = useState(0);
    const [myTeam, setMyTeam] = useState('');

    useEffect(() => {
        const fetchGameState = async () => {
            try {
                const response = await apiCall(`/game/${gameId}`, 'GET');
                const team = props.team;
                setScore(response.score[team]);
            } catch (error) {
                console.error('Error fetching game state:', error);
            }
        };

        const fetchTeam = async () => {
            try {
                const response = await apiCall(`/game/${gameId}/player/${playerName}`, 'GET');
                setMyTeam(response.team);
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };

        fetchTeam();
        const intervalId = setInterval(fetchGameState, 1000);

        return () => clearInterval(intervalId);
    }, [gameId, props.team, playerName]);

    return (
        <div className={`score-card ${props.team}`}>
            {props.team === myTeam && <h3>Your team</h3>}
            <h2>{score} / 8</h2>
        </div>
    );
}

export default ScoreCard;