import React, { useState, useEffect } from 'react';
import './index.css'; 

const App = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else if (!isRunning) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startStopHandler = () => {
    setIsRunning(!isRunning);
  };

  const resetHandler = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const lapHandler = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (time) => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = Math.floor((time / 1000) % 60);
    const getSeconds = `0${seconds}`.slice(-2);
    const minutes = Math.floor((time / 60000) % 60);
    const getMinutes = `0${minutes}`.slice(-2);
    return `${getMinutes}:${getSeconds}:${getMilliseconds}`;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Stopwatch</h1>
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <div className="text-4xl font-mono mb-8">{formatTime(time)}</div>
        <div className="space-x-4">
          <button 
            onClick={startStopHandler}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
          <button 
            onClick={lapHandler}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition"
            disabled={!isRunning}
          >
            Lap
          </button>
          <button 
            onClick={resetHandler}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
            disabled={isRunning}
          >
            Reset
          </button>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl mb-4">Laps</h2>
          <ul className="space-y-2">
            {laps.map((lap, index) => (
              <li key={index} className="bg-gray-200 px-4 py-2 rounded">
                {formatTime(lap)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
