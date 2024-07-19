import Header from './Header';

import Cards from "./Cards.jsx";
import Card from "./Card.jsx";
import Board from "./Board.jsx";
function App() {

  return (
    <>
        <Board/>
        <Card word="Hello" color="BLUE" />
        <Card word="TEST" color="RED" />
        <Card word="TEST" color="GRAY" />
        <Card word="TEST" color="BLACK" />
    </>
  )
}

export default App
