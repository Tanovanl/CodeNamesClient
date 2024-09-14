import CurrentHint from "./CurrentHint.jsx";
import SpyMasterHint from "./SpyMasterHint.jsx";
import ScoreCard from "./ScoreCard.jsx";


function Scoreboard() {
    return (
        <div className="scoreboard-container">
            <div className="scoreboard">
                <div className="teamStats">
                    <ScoreCard team="BLUE"/>
                    <ScoreCard team="RED"/>
                </div>
                <CurrentHint/>
                <SpyMasterHint/>
            </div>
        </div>
    )}

export default Scoreboard;