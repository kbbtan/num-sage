"use client";

import { useEffect, useState } from "react";
import { numToString } from "@/utils/numberConverter";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString

const TempLogic = () => {
  const [locale, setLocale] = useState("ko");
  const [seconds, setSeconds] = useState(10);
  const [timer, setTimer] = useState(false);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    generatePrompt();
  }, []);

  const generatePrompt = () => {
    const prompt = Math.floor(Math.random() * 1000);
    console.log(prompt);
    // setPrompt(numToString(prompt, locale));
    setPrompt(numToString(prompt, locale));
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

  return (
    <>
      {timer && <h1>{seconds}</h1>}
      <h1>{prompt}</h1>
      <input type="number" onChange={handleInputChange}></input>
    </>
  );
};

export default TempLogic;
