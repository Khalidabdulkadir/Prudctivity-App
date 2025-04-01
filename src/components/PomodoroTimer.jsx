import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRedo } from '@fortawesome/free-solid-svg-icons';
import '../styles/PomodoroTimer.css';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work'); // 'work' or 'break'

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  }, [mode]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const switchMode = () => {
    const newMode = mode === 'work' ? 'break' : 'work';
    setMode(newMode);
    setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60);
    setIsRunning(false);
  };

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Play notification sound
      const audio = new Audio('/notification.mp3');
      audio.play();
      // Switch modes automatically
      switchMode();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const progress = mode === 'work' 
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  return (
    <div className="pomodoro-timer">
      <div className="timer-modes">
        <button
          className={`mode-btn ${mode === 'work' ? 'active' : ''}`}
          onClick={() => mode !== 'work' && switchMode()}
        >
          Work
        </button>
        <button
          className={`mode-btn ${mode === 'break' ? 'active' : ''}`}
          onClick={() => mode !== 'break' && switchMode()}
        >
          Break
        </button>
      </div>

      <div className="timer-display">
        <div className="progress-ring">
          <svg width="200" height="200">
            <circle
              className="progress-ring-circle-bg"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="transparent"
              r="90"
              cx="100"
              cy="100"
            />
            <circle
              className="progress-ring-circle"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              r="90"
              cx="100"
              cy="100"
              style={{
                strokeDasharray: `${2 * Math.PI * 90}`,
                strokeDashoffset: `${2 * Math.PI * 90 * (1 - progress / 100)}`,
              }}
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy=".3em"
              className="timer-text"
            >
              {formatTime(timeLeft)}
            </text>
          </svg>
        </div>
      </div>

      <div className="timer-controls">
        <button className="control-btn" onClick={toggleTimer}>
          <FontAwesomeIcon icon={isRunning ? faPause : faPlay} />
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button className="control-btn" onClick={resetTimer}>
          <FontAwesomeIcon icon={faRedo} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
