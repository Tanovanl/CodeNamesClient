
function StartGame(props){
    const startable = props.startable;
    return(
        <button disabled={!startable}>Start game</button>
    )
}

export default StartGame;