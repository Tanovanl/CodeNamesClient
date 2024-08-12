import React, { useState } from 'react';

function Card({ word, color, revealed }) {
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        setSelected(!selected);
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