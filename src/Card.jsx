function Card(props){
    if (props.revealed == true) {
        return(
            <div className="word-card">
                <img className='card-img' alt={props.color + "card"} src={"./src/assets/card-" + props.color + ".png"}/>
            </div>
        )
    } else {
        return(
            <div className="word-card">
                <img className='card-img' alt={props.color + "card"} src={"./src/assets/card-false-" + props.color + ".png"}/>
                <p className="card-word">{props.word}</p>
            </div>
        )
    }
}

export default Card;