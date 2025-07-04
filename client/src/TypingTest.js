import React, { useState, useEffect } from "react";
import { sampleTexts } from "./data";

const getRandomText = () => {
  return sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
};

const TypingTest = () => {
  const [target, setTarget] = useState(getRandomText());
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (input.length === 1) setStartTime(new Date());
    if (input === target) {
      setCompleted(true);
    }
    const elapsed = (new Date() - startTime) / 1000 / 60; // minutes
    const words = input.length / 5;
    setWpm(words / (elapsed || 1));
  }, [input]);

  const handleRestart = () => {
    setTarget(getRandomText());
    setInput("");
    setStartTime(null);
    setWpm(0);
    setCompleted(false);
  };

  const getColoredText = () => {
    return [...target].map((char, idx) => {
      const color = input[idx]
        ? input[idx] === char
          ? "green"
          : "red"
        : "black";
      return (
        <span key={idx} style={{ color }}>
          {char}
        </span>
      );
    });
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>Typing Speed Test</h1>
      <p style={{ fontSize: "20px" }}>{getColoredText()}</p>
      <textarea
        rows={3}
        cols={60}
        value={input}
        onChange={(e) => !completed && setInput(e.target.value)}
        placeholder="Start typing here..."
        autoFocus
        style={{ marginTop: "1rem", fontSize: "16px" }}
      />
      <p style={{ marginTop: "1rem" }}>WPM: {wpm.toFixed(2)}</p>
      {completed && (
        <>
          <p style={{ color: "blue" }}>🎉 You've completed the test!</p>
          <button onClick={handleRestart}>Try Again</button>
        </>
      )}
    </div>
  );
};

export default TypingTest;
