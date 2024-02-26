
import React, { Component } from 'react';
import "./index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      elapsedTime: 0,
      previousTime: null,
    };
  }

  componentDidMount() {
    this.intervalId = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isRunning && !prevState.isRunning) {
      this.intervalId = setInterval(() => {
        this.setState({
          elapsedTime: this.state.elapsedTime + (Date.now() - this.state.previousTime),
          previousTime: Date.now(),
        });
      }, 10);
    } else if (!this.state.isRunning && prevState.isRunning) {
      clearInterval(this.intervalId);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  startTimer = () => {
    this.setState({ isRunning: true, previousTime: Date.now() });
  };

  stopTimer = () => {
    this.setState({ isRunning: false });
  };

  resetTimer = () => {
    this.setState({ elapsedTime: 0, isRunning: false, previousTime: null });
  };

  formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formattedTime;
  };

  render() {
    const { isRunning, elapsedTime } = this.state;

    return (
      <div className="stopwatch">
        <h1 className="stopwatch-heading">STOPWATCH</h1>
        <div className="buttons">
          <button
            onClick={this.startTimer}
            disabled={isRunning}
            className={isRunning ? 'disabled' : ''}
          >
            Start
          </button>
          <button
            onClick={this.stopTimer}
            disabled={!isRunning}
            className={!isRunning ? 'disabled' : ''}
          >
            Stop
          </button>
          <button onClick={this.resetTimer} disabled={!elapsedTime}>
            Reset
          </button>
        <div className="timer">{this.formatTime(elapsedTime)}</div>

        </div>
      </div>
    );
  }
}

export default App;
