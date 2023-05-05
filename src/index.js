import React from 'react';
import ReactDOM from 'react-dom/client';
import Timer from './App';

const handleTimeEnd = () => {
  console.log("Час вийшов!");
}

const handleTimeStart = (timeLeft) => {
  console.log("Таймер запущено з часом: " + timeLeft);
}

const handleTimePause = (timeLeft) => {
  console.log("Таймер на паузі з часом: " + timeLeft);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Timer
    time={60}
    autostart={true}
    step={1000}
    onTick={(time) => console.log("Залишилось часу: " + time)}
    onTimeEnd={handleTimeEnd}
    onTimeStart={handleTimeStart}
    onTimePause={handleTimePause}
  />
);