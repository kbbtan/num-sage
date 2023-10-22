type LeaderboardProps = {
  roomID: string;
  playerID: string;
  playerScores: { [id: string]: number };
};

const Leaderboard = ({ roomID, playerID, playerScores }: LeaderboardProps) => (
  <div className="mt-20 flex flex-col items-center text-xl text-text-accent">
    <h1>Leaderboard</h1>
    {playerScores && (
      <ul>
        {Object.entries(playerScores)
          .sort((a, b) => b[1] - a[1])
          .map(([id, score]) =>
            id === playerID ? (
              <li key={id} className="font-bold">
                {id} (You): {score}
              </li>
            ) : (
              <li key={id}>
                {id} : {score}
              </li>
            ),
          )}
      </ul>
    )}

    <h1 className="mt-5 text-sm text-text-accent">Room ID: {roomID}</h1>
  </div>
);

export default Leaderboard;
