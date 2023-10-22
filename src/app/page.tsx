"use client";

import { useState, useEffect, useRef } from "react";

import LanguageMenu from "./components/LanguageMenu";
import { numToString } from "@/utils/numberConverter";

const DEFAULT_LANGUAGE = "English";
const DEFAULT_LOCALE = "en";
const DEFAULT_TIMEOUT = 60;

const Home = () => {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [seconds, setSeconds] = useState(DEFAULT_TIMEOUT);
  const [timer, setTimer] = useState(false);
  const [number, setNumber] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [counter, setCounter] = useState(0);
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
      }, seconds * 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const inputNumber = parseInt(inputRef.current!.value);
      if (inputNumber === number) {
        setCounter((prev) => prev + 1);
        generatePrompt(locale);
        inputRef.current!.value = "";
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
    inputRef.current!.value = "";
  };

  return (
    <div className="flex h-[87vh] w-full items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative w-full text-center">
          {timer ? (
            <>
              <h1>{counter}</h1>
              <h1>{seconds}</h1>
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

        <button
          onClick={restart}
          className="mt-4 rounded border border-sub-color px-5 py-1 text-xl text-sub-color hover:border-text-accent hover:text-text-accent"
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default Home;
