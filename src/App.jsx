import React, { useState, useEffect } from 'react';
import Header from './Header';
import Cards from "./Cards.jsx";
import Card from "./Card.jsx";
import Board from "./Board.jsx";
import Host from "./Host.jsx";
import TeamJoin from "./TeamJoin.jsx";
import JoinGame from "./JoinGame.jsx";
import apiCall from "./API/api.js";
import { Routes, Route, useNavigate } from 'react-router-dom';
import ChooseTeam from "./ChooseTeam.jsx";


function App() {
    const navigate = useNavigate();
    const [gameExists, setGameExists] = useState(false);

    useEffect(() => {
        const checkGame = async () => {
            const gameId = JSON.parse(localStorage.getItem('gameId'));
            if (gameId) {
                try {
                    await apiCall(`/game/${gameId}`, "GET");
                    setGameExists(true);
                    navigate('/teamjoin'); // navigate to team join screen
                } catch (error) {
                    setGameExists(false);
                }
            } else {
                setGameExists(false);
            }
        };

        const intervalId = setInterval(checkGame, 1000);

        return () => clearInterval(intervalId);
    }, [navigate]);
    return (
        <Routes>
            <Route path="/teamjoin" element={
                <div className="container">
                    <ChooseTeam />
                </div>
            }/>
            <Route path="/" element={
                <div className="container">
                    <Host/>
                    <JoinGame />
                </div>
            } />
        </Routes>
    );
}

export default App;
