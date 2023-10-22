"use client";

import { useState } from "react";

import Results from "@/components/Results";
import Game from "@/components/Game";

const Home = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [counter, setCounter] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [incorrect, setIncorrect] = useState<{ [prompt: string]: number }>({});
  const [roomID, setRoomID] = useState("");
  const [playerID, setPlayerID] = useState("");
  const [finalScores, setFinalScores] = useState<{ [id: string]: number }>({});

  return (
    <div className="flex h-[87vh] w-full items-center justify-center">
      <div className="flex w-3/4 flex-col items-center">
        {isCompleted ? (
          <Results
            correct={counter}
            incorrect={incorrect}
            attempted={attempted}
            finalScores={finalScores}
            roomID={roomID}
            playerID={playerID}
            setCorrect={setCounter}
            setAttempted={setAttempted}
            setIncorrect={setIncorrect}
            setIsCompleted={setIsCompleted}
            setFinalScores={setFinalScores}
          />
        ) : (
          <Game
            counter={counter}
            roomID={roomID}
            playerID={playerID}
            setCounter={setCounter}
            setIncorrect={setIncorrect}
            setAttempted={setAttempted}
            setRoomID={setRoomID}
            setPlayerID={setPlayerID}
            setIsCompleted={setIsCompleted}
            setFinalScores={setFinalScores}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
