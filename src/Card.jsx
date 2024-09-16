import React from 'react';
import { useContext } from 'react';
import { CardContext } from './CardProvider.jsx';

function Card({ word, color, revealed, selected }) {
    const { setCardName } = useContext(CardContext);

    const handleClick = () => {
        setCardName(word);
    };

    return (
        <div className={`word-card ${selected ? 'selected' : ''}`} onClick={handleClick}>
            {revealed ?
                <img className='card-img' alt={color + "card"} src={"./src/assets/card-" + color + ".png"}/> :
                <>
                    <img className='card-img' alt={color + "card"} src={"./src/assets/card-false-" + color + ".png"}/>
                    <p className="card-word">{word}</p>
                </>
            }
        </div>
    );
}

export default Card;