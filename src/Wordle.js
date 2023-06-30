import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Wordle.css";

// const WORD_LIST_API_URL = "https://api.frontendexpert.io/api/fe/wordle-words";
const WORD = "point";
const NO_OF_LINES = 6;
const WORD_LEN = 5;

const Row = ({ guess, isComplete }) => {
  return (
    <div className="line">
      {guess.split("").map((letter, i) => {
        let className = "tile";
        if (isComplete) {
          if (letter === WORD[i]) {
            className = "tile green";
          } else if (WORD.includes(letter)) {
            className = "tile yellow";
          } else {
            className = "tile grey";
          }
        }
        return <div className={className}>{letter}</div>;
      })}
    </div>
  );
};

export default function Wordle() {
  const [totalGuess, setTotalGuess] = useState(
    Array(NO_OF_LINES).fill("".padEnd(WORD_LEN))
  );
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleKeyPress = (e) => {
    if (
      totalGuess[NO_OF_LINES - 1] !== "".padEnd(WORD_LEN) ||
      totalGuess.includes(WORD)
    )
      return;

    const charCode = e.key.toLowerCase().charCodeAt(0);
    const isLetter =
      (e.key.length === 1) & (charCode >= "a".charCodeAt(0)) &&
      charCode <= "z".charCodeAt(0);

    if (e.key === "Enter" && currentGuess.length === WORD_LEN) {
      const newTotalGuess = totalGuess.map((el, i) => {
        if (currentIndex === i) {
          return currentGuess;
        }
        return el;
      });
      setTotalGuess(newTotalGuess);
      setCurrentIndex((prev) => prev + 1);
      setCurrentGuess("");
    } else if (e.key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (isLetter && currentGuess.length < WORD_LEN) {
      setCurrentGuess((prev) => prev + e.key.toLowerCase());
    }
  };

  console.log(currentGuess);

  // useEffect(() => {
  //   const fetchSolution = async () => {
  //     const res = await axios.get(WORD_LIST_API_URL);
  //     const words = await res.json();
  //     console.log(words);
  //   };

  //   fetchSolution();
  // }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentGuess]);

  return (
    <div>
      <h1>WORDLE</h1>
      <div className="board">
        {totalGuess.map((guess, index) => {
          return (
            <Row
              key={index}
              guess={currentIndex === index ? currentGuess.padEnd(5) : guess}
              isComplete={index < currentIndex}
            />
          );
        })}
      </div>
    </div>
  );
}
