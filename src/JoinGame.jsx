import apiCall from './API/api';
import React, { useState, useEffect } from 'react';

function JoinGame(){

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiCall('/games', "GET");
                console.log(result);
                setGames(result.games);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div id="join-div" className="card"> <div>Loading...</div> </div>
    if (error) return <div id="join-div" className="card">  <div>Error: {error}</div> </div>;

    return (
        <div id="join-div" className="card">
            <h2>Join a game</h2>
            <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter by game name" /> {/* New input field for the filter */}
            <div className="all-games">
                {games.filter(game => game.gameId.includes(filter)).map((game, index) => ( // Filter the games before mapping over them
                    <div className="game" key={index}>
                        <h3>{game.gameId}</h3>
                        <p>Players: {game.players.length}</p>
                        <button>Join</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default JoinGame;