import TeamJoin from "./TeamJoin.jsx";
import React from "react";
import LeaveGame from "./LeaveGame.jsx";
import GameInfo from "./GameInfo.jsx";
import StartGame from "./StartGame.jsx";
import { useEffect } from "react";
import apiCall from "./API/api.js";


function ChooseTeam (){
    const [isStartable, setIsStartable] = React.useState(false);
    const [isLeader, setIsLeader] = React.useState(false);

    useEffect(() => {

        const fetchIsLeader = async () => {
            const gameId = JSON.parse(localStorage.getItem('gameId'));
            const name = JSON.parse(localStorage.getItem('playerName'));
            const url = `/game/${gameId}/player/${name}`;
            const result = await apiCall(url, "GET");
            setIsLeader(result.isLeader);
        }
        fetchIsLeader();
    });

    return (
        <div className="container-teamjoin">
            <h1>Choose a team and role</h1>
            <p>Operative will have to try to guess all the words</p>
            <p>SpyMaster will have to give clues to the Operative</p>
            <GameInfo />
            <div className="teams">
                <TeamJoin team="RED"/>
                <TeamJoin team="BLUE"/>
            </div>
            <div className="teams">
                <LeaveGame />
                {!isLeader && !isStartable && <p>Waiting for everyone to join...</p>}
                {!isLeader && isStartable && <p>Waiting for leader to start...</p>}
                {isLeader && (
                    <>
                        <p>You can start the game once everyone has joined a team.</p>
                        <StartGame startable={isStartable}/>
                    </>
                )}
            </div>
        </div>
    );

}

export default ChooseTeam;