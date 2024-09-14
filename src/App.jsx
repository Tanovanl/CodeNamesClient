import React, { useState, useEffect } from 'react';
import Host from "./Host.jsx";
import JoinGame from "./JoinGame.jsx";
import { Routes, Route, useNavigate } from 'react-router-dom';
import ChooseTeam from "./ChooseTeam.jsx";
import HomeScreen from "./HomeScreen.jsx";
import Board from "./Board.jsx";
import SpyMasterHint from "./SpyMasterHint.jsx";


function App() {
    return (
        <Routes>
            <Route path="/game" element={
                <div className="container">
                    <Board/>
                    <SpyMasterHint/>
                </div>

            }/>
            <Route path="/teamjoin" element={
                <div className="container">
                    <ChooseTeam/>
                </div>
            }/>
            <Route path="/" element={
                <div className="container">
                    <HomeScreen/>
                </div>
            } />
        </Routes>
    );
}

export default App;
