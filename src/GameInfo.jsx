import React from "react";


function GameInfo() {

    const gameId = JSON.parse(localStorage.getItem('gameId'));
    const name = JSON.parse(localStorage.getItem('playerName'));


    return (
      <p className="gameid">Game-Id: <b>{gameId}</b> Name: <b>{name}</b></p>
  );
}

export default GameInfo;