import React, { useEffect, useState } from 'react';
import apiCall from './API/api';

function CurrentHint() {
    const [hint, setHint] = useState("Some hint");
    const [numberHint, setNumberHint] = useState(0);
    const [colorHint, setColorHint] = useState("BLUE/RED");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const gameId = JSON.parse(localStorage.getItem('gameId'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiCall(`/game/${gameId}`, "GET");
                setHint(result.hintWord);
                setNumberHint(result.hintNumber);
                setColorHint(result.turn);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 1000);

        return () => clearInterval(intervalId);
    }, [gameId]);

    return (
        <div className="hint-container">
            <h3 className={colorHint}>{colorHint}</h3>
            <p>{hint} {numberHint}</p>
        </div>
    );
}

export default CurrentHint;