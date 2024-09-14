import Card from "./Card.jsx";
import {useEffect, useState} from "react";
import apiCall from "./API/api.js";
import {useNavigate} from 'react-router-dom';

function Board(){
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const navigate = useNavigate();
    const gameId = JSON.parse(localStorage.getItem('gameId'));
    const playerName = JSON.parse(localStorage.getItem('playerName'));

    const selectCard = (index) => {
        setSelectedCard(index);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiCall(`/game/${gameId}`, "GET");
                console.log(result);
                setRole(await getPlayerGameInfo());
                setCards(result.cards);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const getPlayerGameInfo = async () => {
        let url = `/game/${gameId}/player/${playerName}`;
        url = url.replace(/"|'/g, "");
        const data = await apiCall(url, "GET");
        return data.role;
    }

    if (loading) return <div>Loading board...</div>;
    if (error) return <div>Error loading board: {error.message}</div>;

    return (
        <div className="board">
            <h1>Board</h1>
            <div className="board-div">
                {cards.map((card, index) => (
                    <div key={index} onClick={() => selectCard(index)}>
                        {card.revealed ?
                            <Card word={card.word} color={card.color} revealed={true} selected={selectedCard === index} /> : role === "SPYMASTER" ?
                                <Card word={card.word} color={card.color} selected={selectedCard === index} /> :
                                <Card word={card.word} color="GRAY" revealed={false} selected={selectedCard === index} />
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Board;