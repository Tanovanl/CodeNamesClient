import React, { useEffect, useState } from 'react';
import apiCall from './API/api';

function Role() {
    const [role, setRole] = useState('');
    const [team, setTeam] = useState('');
    const gameId = JSON.parse(localStorage.getItem('gameId'));
    const playerName = JSON.parse(localStorage.getItem('playerName'));

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const response = await apiCall(`/game/${gameId}/player/${playerName}`, 'GET');
                setRole(response.role);
                setTeam(response.team);
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };

        fetchRole();
    }, [gameId, playerName]);

    return (
        <div className="role-container">
            <p className={team}>Role: {role}</p>
        </div>
    );
}

export default Role;