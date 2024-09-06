import React, { useContext } from 'react';
import {useNavigate} from 'react-router-dom';

// TODO: Request to leave the game in server

function LeaveGame() {
    const navigate = useNavigate();

  const leaveGame = () => {
      localStorage.removeItem('gameId');
      localStorage.removeItem('playerName');
      navigate('/');
  };

  return (
    <button onClick={leaveGame}>Leave Game</button>
  );
}

export default LeaveGame;