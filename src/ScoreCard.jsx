function ScoreCard(props) {
    return (
        <div className={`score-card ${props.team}`}>
            <h2>{props.team}</h2>
            <p>x Of 8</p>
        </div>
    );
}

export default ScoreCard;