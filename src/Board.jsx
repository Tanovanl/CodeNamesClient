import Card from "./Card.jsx";
import {useEffect, useState} from "react";
import apiCall from "./API/api.js";

function Board(){
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiCall('/game/tano4-tanogame2', "GET");
                setRole(await getPlayerGameInfo());
                setCards(result.cards);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const getPlayerGameInfo = async () => {
        let url = `/game/${localStorage.getItem('gameId')}/player/${localStorage.getItem('playerName')}`;
        url = url.replace(/"|'/g, "");
        const data = await apiCall(url, "GET");
        return data.role;
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="board">
            <h1>Board</h1>
            <div className="board-div">
                {cards.map((card, index) => (
                    card.revealed ? <Card key={index} word={card.word} color={card.color} revealed={true} /> : role === "SPYMASTER" ? <Card key={index} word={card.word} color={card.color} /> : <Card key={index} word={card.word} color="GRAY" revealed={false}/>
                ))}
            </div>
        </div>
    )
}

export default Board;