import React, { useState } from 'react';
import apiCall from './API/api';

function SpyMasterHint() {
    const [hint, setHint] = useState('');
    const gameId = JSON.parse(localStorage.getItem('gameId'));

    const handleInputChange = (event) => {
        setHint(event.target.value);
    };

    const sendHint = async () => {
        if (hint.trim().includes(' ')) {
            alert('Hint can only be one word.');
            return;
        }

        const url = `/game/${gameId}/hint`;
        const body = {
            "hint": hint
        };

        try {
            await apiCall(url, "POST", body);
            setHint('');
        } catch (error) {
            console.error('Error sending hint:', error);
        }
    };

    return (
        <div className="hint-container">
            <input
                type="text"
                value={hint}
                onChange={handleInputChange}
                placeholder="Enter your hint"
            />
            <button onClick={sendHint}>Send Hint</button>
        </div>
    );
}

export default SpyMasterHint;