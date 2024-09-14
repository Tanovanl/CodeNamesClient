import Card from "./Card.jsx";
import {useEffect, useState} from "react";
import apiCall from "./API/api.js";
import {useNavigate} from 'react-router-dom';


function Board(){
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null); // Add this line
    const navigate = useNavigate();
    const gameId = localStorage.getItem('gameId');
    const playerName = localStorage.getItem('playerName');

    const selectCard = (index) => {
        setSelectedCard(index);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await apiCall(`/game/${gameId}`, "GET");
                setRole(await getPlayerGameInfo());
                setCards(result.cards);
            } catch (error) {

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

    if (loading) return <div>Loading board...</div>

    return (
        <div className="board">
            <h1>Board</h1>
            <div className="board-div">
                {cards.map((card, index) => (
                    <div onClick={() => selectCard(index)}>
                        {card.revealed ?
                            <Card key={index} word={card.word} color={card.color} revealed={true} selected={selectedCard === index} /> : role === "SPYMASTER" ?
                                <Card key={index} word={card.word} color={card.color} selected={selectedCard === index} /> :
                                <Card key={index} word={card.word} color="GRAY" revealed={false} selected={selectedCard === index} />
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Board;