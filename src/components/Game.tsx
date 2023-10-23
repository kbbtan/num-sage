"use client";

import { useState, useEffect, useRef } from "react";
import * as Colyseus from "colyseus.js";

import LanguageMenu from "./LanguageMenu";
import Leaderboard from "./Leaderboard";
import {
  DEFAULT_LANGUAGE,
  DEFAULT_LOCALE,
  DEFAULT_TIMEOUT,
} from "@/utils/constants";
import { isEmpty } from "@/utils/helper";
import { CLIENT } from "@/utils/multiplayer";
import { numToString } from "@/utils/numberConverter";
import { useAppStore } from "@/utils/store";
import LoadingButton from "./LoadingButton";

let ROOM: Colyseus.Room;

const Game = () => {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const [number, setNumber] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [seconds, setSeconds] = useState(DEFAULT_TIMEOUT);
  const [isTiming, setIsTiming] = useState(false);

  const {
    counter,
    roomID,
    playerScores,
    finalScores,
    communicating,
    incrementCounter,
    updateIncorrect,
    setCommunicating,
    setIsCompleted,
    incrementAttempted,
    setRoomID,
    setPlayerID,
    updateFinalScores,
    updatePlayerScores,
    setPlayerScores,
    setFinalScores,
  } = useAppStore();

  const inputRef = useRef<HTMLInputElement>(null);
  const promptRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    generatePrompt(locale);
  }, [locale]);

  const generatePrompt = (locale: string) => {
    const num = Math.floor(Math.random() * 1000);
    setNumber(num);
    setPrompt(numToString(num, locale));
  };

  const selectOption = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setLanguage(e.currentTarget.innerText);
    setLocale(e.currentTarget.id);
    setLanguageMenuOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTiming) {
      setIsTiming(true);
      const id = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        ROOM?.send("end");
        clearInterval(id);
        setIsTiming(false);
        setSeconds(seconds);
        updatePlayerScores((prev) => {
          return Object.fromEntries(Object.keys(prev).map((key) => [key, 0]));
        });
        setIsCompleted(true);
      }, seconds * 1000);

      ROOM?.send("start");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const inputNumber = parseInt(inputRef.current!.value);
      if (inputNumber === number) {
        ROOM?.send("solve");
        inputRef.current!.value = "";
        incrementCounter();
        generatePrompt(locale);
      } else {
        promptRef.current!.style.color = "red";
        updateIncorrect((prev) => ({
          ...prev,
          [prompt]: (prev[prompt] || 0) + 1,
        }));
        setTimeout(() => {
          promptRef.current!.style.color = "white";
        }, 500);
      }
      incrementAttempted();
    }
  };

  const joinRoom = async () => {
    setCommunicating(true);
    try {
      ROOM = (await CLIENT.joinOrCreate("my_room")) as Colyseus.Room;
      console.log(ROOM.sessionId, "joined", ROOM.name);
      setRoomID(ROOM.roomId);
      setPlayerID(ROOM.sessionId);

      ROOM.onMessage("players", (res: IterableIterator<string>) => {
        setPlayerScores(
          Object.fromEntries(Array.from(res).map((playerID) => [playerID, 0])),
        );
        setFinalScores(
          Object.fromEntries(Array.from(res).map((playerID) => [playerID, -1])),
        );
      });
      ROOM.onMessage("update", (res: { id: string; solved: number }) => {
        updatePlayerScores((prev) => ({
          ...prev,
          [res.id]: res.solved,
        }));
      });
      ROOM.onMessage("final", (res: { id: string; solved: number }) => {
        updateFinalScores((prev) => ({
          ...prev,
          [res.id]: res.solved,
        }));
        if (Object.values(finalScores).every((score) => score !== -1))
          ROOM.send("unlock");
      });
    } catch (e) {
      console.log("JOIN ERROR", e);
    }

    setCommunicating(false);
  };

  const leaveRoom = () => {
    ROOM.leave();
    setRoomID("");
    setPlayerScores({});
  };

  return (
    <>
      <div className="relative w-full text-center">
        {isTiming ? (
          <>
            <h1 className="text-3xl text-green-900">{counter}</h1>
            <h1 className="text-5xl text-sub-color">{seconds}</h1>
          </>
        ) : (
          <button
            className={`
                        bg-transparent text-center text-3xl
                        text-sub-color
                        hover:cursor-pointer hover:text-text-accent
                        ${languageMenuOpen && "text-text-accent"}
                    `}
            onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
          >
            {language}
          </button>
        )}

        {languageMenuOpen && <LanguageMenu selectOption={selectOption} />}
      </div>
      <h1
        ref={promptRef}
        className="my-10 text-7xl font-medium text-text-accent"
      >
        {prompt}
      </h1>

      <input
        type="number"
        ref={inputRef}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        autoFocus
        className="
                    w-1/2 rounded border border-sub-color bg-transparent px-5 py-2 
                    text-center text-2xl
                    text-text-accent
                "
      />

      {isTiming ? null : communicating ? (
        <LoadingButton />
      ) : roomID ? (
        <button
          onClick={leaveRoom}
          className=" m-3 rounded-md px-3 py-2 text-2xl font-medium text-sub-color hover:bg-sub-color hover:text-accent"
          aria-current="page"
        >
          Leave
        </button>
      ) : (
        <button
          onClick={joinRoom}
          className="m-3 rounded-md px-3 py-2 text-2xl font-medium text-sub-color hover:bg-sub-color hover:text-accent"
          aria-current="page"
        >
          Join Multiplayer
        </button>
      )}

      {!isEmpty(playerScores) && <Leaderboard final={false} />}
    </>
  );
};

export default Game;
