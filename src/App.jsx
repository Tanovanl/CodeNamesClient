import React, { useState, useEffect } from 'react';
import Header from './Header';
import Cards from "./Cards.jsx";
import Card from "./Card.jsx";
import Board from "./Board.jsx";
import Host from "./Host.jsx";
import TeamJoin from "./TeamJoin.jsx";
import JoinGame from "./JoinGame.jsx";
import apiCall from "./API/api.js";

function App() {
    const [gameExists, setGameExists] = useState(false);

    useEffect(() => {
        const checkGame = async () => {
            const gameId = JSON.parse(localStorage.getItem('gameId'));
            if (gameId) {
                try {
                    await apiCall(`/game/${gameId}`, "GET");
                    setGameExists(true);
                } catch (error) {
                    setGameExists(false);
                }
            } else {
                setGameExists(false);
            }
        };

        const intervalId = setInterval(checkGame, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            {gameExists ? (
                <div className="container">
                    <TeamJoin team="RED" />
                    <TeamJoin team="BLUE" />
                </div>
            ) : (
                <div className="container">
                    <Host />
                    <JoinGame />
                </div>
            )}
        </>
    );
}

export default App;
