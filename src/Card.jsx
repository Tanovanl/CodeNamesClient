function Card({ word, color, revealed, selected, selectCard }) {
    const handleClick = () => {
        selectCard();
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