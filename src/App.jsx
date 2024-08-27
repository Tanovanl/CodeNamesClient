import Header from './Header';

import Cards from "./Cards.jsx";
import Card from "./Card.jsx";
import Board from "./Board.jsx";
import Host from "./Host.jsx";
import TeamJoin from "./TeamJoin.jsx";
import JoinGame from "./JoinGame.jsx";
function App() {

  return (
    <>
        <div className="container">
            <Host/>
            <JoinGame/>
            <TeamJoin team="RED"/>
            <Board/>


            <TeamJoin team="BLUE"/>
        </div>
    </>
  )
}

export default App
