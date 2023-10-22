"use client";

import { useState } from "react";

import Results from "@/components/Results";
import Game from "@/components/Game";

const Home = () => {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="flex h-[87vh] w-full items-center justify-center">
      <div className="flex w-3/4 flex-col items-center">
        {completed ? (
          <Results setCompleted={setCompleted} />
        ) : (
          <Game setCompleted={setCompleted} />
        )}
      </div>
    </div>
  );
};

export default Home;
