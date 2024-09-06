import TeamJoin from "./TeamJoin.jsx";
import React from "react";
import LeaveGame from "./LeaveGame.jsx";


function ChooseTeam (){

    return (
        <div className="container-teamjoin">
            <h1>Choose a team and role</h1>
            <p>Operative will have to try to guess all the words</p>
            <p>SpyMaster will have to give clues to the Operative</p>
            <div className="teams">
                <TeamJoin team="RED"/>
                <TeamJoin team="BLUE"/>
            </div>
            <LeaveGame />
        </div>
    );

}

export default ChooseTeam;