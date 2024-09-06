import JoinGame from "./JoinGame.jsx";
import Host from "./Host.jsx";


function HomeScreen() {
  return (
      <div className="homescreen">
          <h1>Code-names minigame</h1>
          <p>Welcome to Code-names minigame! This is a fun and challenging game the operative has to guess 8 words while the spy master helps by giving clues. The game is played in teams and the words are chosen randomly from a list.
              of various items. Join a game or host your own and start playing!</p>
          <div className="joinAGame">
              <JoinGame />
              <Host />
          </div>
      </div>
  );
}


export default HomeScreen;