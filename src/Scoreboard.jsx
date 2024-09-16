import React, { useEffect, useState } from "react";
import CurrentHint from "./CurrentHint.jsx";
import SpyMasterHint from "./SpyMasterHint.jsx";
import ScoreCard from "./ScoreCard.jsx";
import Role from "./Role.jsx";
import apiCall from "./API/api.js";
import Guess from "./Guess.jsx";

function Scoreboard() {
    const [role, setRole] = useState('');
    const gameId = JSON.parse(localStorage.getItem('gameId'));
    const playerName = JSON.parse(localStorage.getItem('playerName'));

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const response = await apiCall(`/game/${gameId}/player/${playerName}`, 'GET');
                setRole(response.role);
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };

        fetchRole();
    }, [gameId, playerName]);

    return (
        <div className="scoreboard-container">
            <div className="scoreboard">
                <div className="teamStats">
                    <ScoreCard team="BLUE"/>
                    <ScoreCard team="RED"/>
                </div>
                <CurrentHint/>

                {role === 'SPYMASTER' ? <SpyMasterHint/> : <Guess/>}
                <Role/>
            </div>
        </div>
    );
}

export default Scoreboard;