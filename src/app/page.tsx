"use client";

import { useState } from "react";

import Results from "@/components/Results";
import Game from "@/components/Game";

const Home = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [counter, setCounter] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [incorrect, setIncorrect] = useState<{ [prompt: string]: number }>({});

  return (
    <div className="flex h-[87vh] w-full items-center justify-center">
      <div className="flex w-3/4 flex-col items-center">
        {isCompleted ? (
          <Results
            correct={counter}
            incorrect={incorrect}
            attempted={attempted}
            setCorrect={setCounter}
            setAttempted={setAttempted}
            setIncorrect={setIncorrect}
            setIsCompleted={setIsCompleted}
          />
        ) : (
          <Game
            counter={counter}
            setCounter={setCounter}
            setIncorrect={setIncorrect}
            setAttempted={setAttempted}
            setIsCompleted={setIsCompleted}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
