import React, { useState, useEffect } from 'react';
import apiCall from './API/api';
import { useNavigate } from 'react-router-dom';

function TeamJoin(props) {
    const [redOperative, setRedOperative] = useState('');
    const [redSpyMaster, setRedSpyMaster] = useState('');
    const [blueOperative, setBlueOperative] = useState('');
    const [blueSpyMaster, setBlueSpyMaster] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const gameId = JSON.parse(localStorage.getItem('gameId'));
    const navigate = useNavigate();


    const fetchPlayers = async () => {
        let players = await apiCall(`/game/${gameId}`);
        players = players.players;
        const redOperativeFind = players.find(player => player.team === 'RED' && player.role === 'OPERATIVE');
        const redSpyMasterFind = players.find(player => player.team === 'RED' && player.role === 'SPYMASTER');
        const blueOperativeFind = players.find(player => player.team === 'BLUE' && player.role === 'OPERATIVE');
        const blueSpyMasterFind = players.find(player => player.team === 'BLUE' && player.role === 'SPYMASTER');
        setRedOperative(redOperativeFind ? redOperativeFind.playerName : '');
        setRedSpyMaster(redSpyMasterFind ? redSpyMasterFind.playerName : '');
        setBlueOperative(blueOperativeFind ? blueOperativeFind.playerName : '');
        setBlueSpyMaster(blueSpyMasterFind ? blueSpyMasterFind.playerName : '');
        setIsLoading(false);
    };

    const checkIfGameStarted = async () => {
        const gameId = JSON.parse(localStorage.getItem('gameId'));
        const game = await apiCall(`/game/${gameId}`);
        if (game.isStarted === true) {
            localStorage.setItem('gameStatus', JSON.stringify('IN_PROGRESS'));
            navigate('/game');
        }
    }

    useEffect(() => {
        fetchPlayers();
        const fetchPlayersIntervalId = setInterval(fetchPlayers, 1000);
        const checkGameStartedIntervalId = setInterval(checkIfGameStarted, 1000);
        return () => {
            clearInterval(fetchPlayersIntervalId);
            clearInterval(checkGameStartedIntervalId);
        };
    }, []);

    const handleButtonClick = async (role, event) => {
        event.preventDefault();
        const gameId = JSON.parse(localStorage.getItem('gameId'));
        const playerName = JSON.parse(localStorage.getItem('playerName'));

        const body = {
            "team": props.team.toUpperCase(),
            "role": role.toUpperCase(),
            "player": playerName
        }

        await apiCall(`/game/${gameId}/player/team`, "POST", body);

        await fetchPlayers();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="team-card" style={{backgroundColor: props.team}}>
            <h2 className={props.team}>{props.team} Team</h2>
            <form>
                {props.team === 'RED' && (redOperative !== '' ? <button disabled>{redOperative}</button> :
                    <button className={props.team}
                            onClick={(event) => handleButtonClick('Operative', event)}>Operative</button>)}
                {props.team === 'RED' && (redSpyMaster !== '' ? <button disabled>{redSpyMaster}</button> :
                    <button className={props.team} onClick={(event) => handleButtonClick('SpyMaster', event)}>Spy
                        Master</button>)}
                {props.team === 'BLUE' && (blueOperative !== '' ? <button disabled>{blueOperative}</button> :
                    <button className={props.team}
                            onClick={(event) => handleButtonClick('Operative', event)}>Operative</button>)}
                {props.team === 'BLUE' && (blueSpyMaster !== '' ? <button disabled>{blueSpyMaster}</button> :
                    <button className={props.team} onClick={(event) => handleButtonClick('SpyMaster', event)}>Spy
                        Master</button>)}
            </form>
        </div>
    );
}

export default TeamJoin;