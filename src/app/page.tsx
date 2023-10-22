"use client";

import { useState, useEffect, useRef } from "react";
import * as Colyseus from "colyseus.js";

import LanguageMenu from "./components/LanguageMenu";
import { numToString } from "@/utils/numberConverter";

import Results from "./components/Results";

const DEFAULT_LANGUAGE = "English";
const DEFAULT_LOCALE = "en";
const DEFAULT_TIMEOUT = 60;
const CLIENT = new Colyseus.Client("ws://localhost:2567");
let ROOM: Colyseus.Room;

const Home = () => {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [seconds, setSeconds] = useState(DEFAULT_TIMEOUT);
  const [timer, setTimer] = useState(false);
  const [number, setNumber] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [counter, setCounter] = useState(0);
  const [roomID, setRoomID] = useState("");
  const [playerID, setPlayerID] = useState("");
  const [playerScores, setPlayerScores] = useState<{ [id: string]: number }>();
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
    if (!timer) {
      setTimer(true);
      const id = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(id);
        setTimer(false);
        setSeconds(seconds);
        // TODO: Change state when time is up
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
        setCounter((prev) => prev + 1);
        generatePrompt(locale);
      } else {
        promptRef.current!.style.color = "red";
        setTimeout(() => {
          promptRef.current!.style.color = "white";
        }, 500);
      }
    }
  };

  const restart = () => {
    setTimer(false);
    setSeconds(DEFAULT_TIMEOUT);
    generatePrompt(locale);
    ROOM?.leave();
    setRoomID("");
    setPlayerScores(undefined);
    inputRef.current!.value = "";
  };

  const joinRoom = () => {
    CLIENT.joinOrCreate("my_room")
      .then((room) => {
        ROOM = room;
        console.log(ROOM.sessionId, "joined", ROOM.name);
        setRoomID(ROOM.roomId);
        setPlayerID(ROOM.sessionId);
        ROOM.onMessage("players", (res: IterableIterator<string>) => {
          setPlayerScores(
            Object.fromEntries(
              Array.from(res).map((playerID) => [playerID, 0]),
            ),
          );
        });
        ROOM.onMessage("update", (res: { id: string; solved: number }) => {
          setPlayerScores((prev) => ({
            ...prev,
            [res.id]: res.solved,
          }));
        });
      })
      .catch((e) => {
        console.log("JOIN ERROR", e);
      });
  };

  return (
    <div className="flex h-[87vh] w-full items-center justify-center">
      <div className="flex flex-col items-center w-3/4">
        <Results/>

        <button
          onClick={restart}
          className="mt-4 rounded border border-sub-color px-5 py-1 text-xl text-sub-color hover:border-text-accent hover:text-text-accent"
        >
          Restart
        </button>
        {!!!roomID && (
          <button
            onClick={joinRoom}
            className=" m-3 rounded-md px-3 py-2 text-2xl font-medium text-sub-color hover:bg-sub-color hover:text-accent"
            aria-current="page"
          >
            Join Multiplayer
          </button>
        )}
      </div>
      {playerScores && (
        <div className="mt-20 flex flex-col items-center text-xl text-text-accent">
          <h1>Leaderboard</h1>
          {playerScores && (
            <ul>
              {Object.entries(playerScores)
                .sort((a, b) => b[1] - a[1])
                .map(([id, score]) => (
                  <li key={id}>
                    {id} {id === playerID && " (You)"}: {score}
                  </li>
                ))}
            </ul>
          )}
          <h1 className="mt-5 text-sm text-text-accent">Room ID: {roomID}</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
