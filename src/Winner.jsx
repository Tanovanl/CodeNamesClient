import { useLocation } from 'react-router-dom';
import LeaveGame from "./LeaveGame.jsx";

function Winner() {
  const location = useLocation();
  const { winner } = location.state || {};

  return (
      <div className="winner">
        <h1>{winner} won the game!</h1>
        <LeaveGame />
      </div>
  );
}

export default Winner;