import TeamJoin from "./TeamJoin.jsx";
import React from "react";


function ChooseTeam (){

    return (
        <div className="container-teamjoin">
            <h1>Choose a team and role</h1>
            <div className="teams">
                <TeamJoin team="RED"/>
                <TeamJoin team="BLUE"/>
            </div>
        </div>
    );

}

export default ChooseTeam;