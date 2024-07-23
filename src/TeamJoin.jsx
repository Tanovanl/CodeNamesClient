

function TeamJoin(props) {
  return (
    <div className="team-card" style={{backgroundColor: props.team}}>
      <h2 className={props.team}>{props.team} Team</h2>
        <form>
            <button className={props.team}>Operative</button>
            <button className={props.team}>Spy Master</button>
        </form>
    </div>
  );
}

export default TeamJoin;