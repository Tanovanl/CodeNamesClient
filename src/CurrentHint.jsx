
import React, { useState } from 'react';

function CurrentHint() {
    const [hint, setHint] = useState("Some hint");
    const [colorHint, setColorHint] = useState("BLUE/RED");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const gameId = JSON.parse(localStorage.getItem('gameId'));


    return (
        <div>
            <h3 className={colorHint}>{colorHint}</h3>
            <p>{hint}</p>
        </div>
    );
}

export default CurrentHint;