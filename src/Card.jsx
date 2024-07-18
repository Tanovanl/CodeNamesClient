


function Card(props){

    return(
        <div className="word-card">
            <img className='card-img' alt={props.color + "card"} src={"./src/assets/card-" + props.color + ".png"}/>
            <p className="card-word">{props.word}</p>
        </div>
    )

}

export default Card;