import PomodoroTimer from '../components/PomodoroTimer';
import '../styles/Pomodoro.css';

const PomodoroPage = () => {
  return (
    <div className="pomodoro-container">
      <h2>Pomodoro Timer</h2>
      <div className="pomodoro-content">
        <div className="timer-section">
          <PomodoroTimer />
        </div>
        <div className="info-section">
          <div className="info-card">
            <h3>What is the Pomodoro Technique?</h3>
            <p>
              The Pomodoro Technique is a time management method that uses a timer
              to break work into focused 25-minute intervals, separated by short breaks.
              This helps maintain concentration and avoid mental fatigue.
            </p>
          </div>
          <div className="info-card">
            <h3>How to Use</h3>
            <ol>
              <li>Choose a task to work on</li>
              <li>Start the 25-minute work timer</li>
              <li>Work on your task until the timer rings</li>
              <li>Take a 5-minute break</li>
              <li>After 4 pomodoros, take a longer break (15-30 minutes)</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroPage;
