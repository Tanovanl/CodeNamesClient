import apiCall from './API/api';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function JoinGame(){
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');
    const [playerName, setPlayerName] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiCall('/games', "GET");
                setGames(result.games);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const joinGame = async (gameId2) => {
        const url = `/game/${gameId2}/player/${playerName}`;
        console.log(url);
        const data = await apiCall(url, "POST");
        localStorage.setItem('gameId', JSON.stringify(data.game.gameId));
        localStorage.setItem('playerName', JSON.stringify(data.playerName));

        const gameId = JSON.parse(localStorage.getItem('gameId'));
        if (gameId) {
            try {
                await apiCall(`/game/${gameId}`, "GET");
                navigate('/teamjoin'); // navigate to team join screen
            } catch (error) {
                console.error(error);
            }
        }
    }

    if (loading) return <div id="join-div" className="card"> <div>Loading...</div> </div>
    if (error) return <div id="join-div" className="card">  <div>Error: {error}</div> </div>;

    return (
        <div id="join-div" className="card">
            <h2>Join a game</h2>
            <input type="text" placeholder="Player name" onChange={(e) => setPlayerName(e.target.value)}/>
            <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter by game name" />
            <div className="all-games">
                {games.filter(game => game.gameId.includes(filter)).map((game, index) => (
                    <div className="game" key={index}>
                        <h3>{game.gameId}</h3>
                        <p>Players: {game.players.length}</p>
                        <button onClick={() => joinGame(game.gameId)}>Join</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default JoinGame;