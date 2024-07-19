import Card from "./Card.jsx";
import {useEffect, useState} from "react";
import apiCall from "./API/api.js";

function Board(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiCall('/game/tano4-tanogame2', "GET");
                console.log(result);
                setCards(result.cards);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Board</h1>
            {cards.map((card, index) => (
                <Card key={index} word={card.word} color={card.color} />
            ))}
        </div>
    )
}

export default Board;