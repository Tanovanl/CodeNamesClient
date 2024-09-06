import React, { useState, useEffect } from 'react';
import Host from "./Host.jsx";
import JoinGame from "./JoinGame.jsx";
import { Routes, Route, useNavigate } from 'react-router-dom';
import ChooseTeam from "./ChooseTeam.jsx";


function App() {
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
