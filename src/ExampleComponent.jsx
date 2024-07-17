import React, { useState, useEffect } from 'react';
import apiCall from './API/api';

const ExampleComponent = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiCall('/game?prefix=tano&gameName=tano2&player=tano', "POST");
                console.log(result);
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>API Data:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default ExampleComponent;