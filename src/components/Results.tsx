import { useRouter } from "next/navigation";

import { isEmpty } from "@/utils/helper";
import Leaderboard from "./Leaderboard";

type ResultsProps = {
  correct: number;
  incorrect: { [prompt: string]: number };
  attempted: number;
  roomID: string;
  playerID: string;
  finalScores: { [id: string]: number };
  setCorrect: React.Dispatch<React.SetStateAction<number>>;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  setAttempted: React.Dispatch<React.SetStateAction<number>>;
  setIncorrect: React.Dispatch<
    React.SetStateAction<{ [prompt: string]: number }>
  >;
  setFinalScores: React.Dispatch<
    React.SetStateAction<{ [id: string]: number }>
  >;
};

const Results = ({
  correct,
  incorrect,
  attempted,
  roomID,
  playerID,
  finalScores,
  setCorrect,
  setIsCompleted,
  setAttempted,
  setIncorrect,
  setFinalScores,
}: ResultsProps) => {
  const router = useRouter();

  return (
    <>
      <div className="mb-5 flex w-2/3 items-center justify-evenly">
        <div>
          <h2 className="text-2xl text-text-accent">Accuracy:</h2>
          <h1 className="text-7xl text-accent">
            {Math.floor((correct / attempted) * 100)}%
          </h1>
        </div>

        <div>
          <h2 className="text-2xl text-text-accent">Missed Numbers:</h2>

          <ol className="mt-2 w-full rounded border border-sub-color">
            {isEmpty(incorrect) ? (
              <li className="flex justify-between bg-bg-color px-5 py-3 text-xl text-text-accent">
                <span>You didn&rsquo;t miss any numbers! 🎉</span>
              </li>
            ) : (
              Object.entries(incorrect)
                .sort((a, b) => b[1] - a[1])
                .map(([key, value]) => (
                  <li
                    key={key}
                    className="flex justify-between bg-bg-color px-5 py-3 text-xl text-text-accent"
                  >
                    <span>
                      {key}: {value}
                    </span>
                  </li>
                ))
            )}
          </ol>
        </div>
      </div>
      {!isEmpty(finalScores) && (
        <Leaderboard
          roomID={roomID}
          playerID={playerID}
          playerScores={finalScores}
        />
      )}
      <button
        onClick={() => {
          setCorrect(0);
          setAttempted(0);
          setIsCompleted(false);
          setIncorrect({});
          setFinalScores({});
          router.push("/");
        }}
        className="mt-4 rounded border border-sub-color px-5 py-1 text-xl text-sub-color hover:border-text-accent hover:text-text-accent"
      >
        Restart
      </button>
    </>
  );
};

export default Results;
