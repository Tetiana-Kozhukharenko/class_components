import{ Component } from 'react';
import './style.css';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.time || 60,
      isRunning: false,
    };
    this.timerId = null;
  }

  componentDidMount() {
    if (this.props.autostart) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer = () => {
    const { onTimeStart } = this.props;
    this.setState({ isRunning: true });
    this.timerId = setInterval(() => {
      const { time } = this.state;
      const { step = 1000, onTick } = this.props;
      const newTime = time - (step / 1000);
      this.setState({ time: newTime });
      if (onTick) {
        onTick(newTime);
      }
      if (newTime <= 0) {
        this.stopTimer();
        if (this.props.onTimeEnd) {
          this.props.onTimeEnd();
        }
      }
    }, this.props.step || 1000);

    if (onTimeStart) {
      onTimeStart(this.state.time);
    }
  };

  stopTimer = () => {
    const { onTimePause } = this.props;
    this.setState({ isRunning: false });
    clearInterval(this.timerId);
    if (onTimePause) {
      onTimePause(this.state.time);
    }
  };

  handleToggle = () => {
    const { isRunning } = this.state;
    if (isRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  };

  render() {
    const { time, isRunning } = this.state;
    const { onTick } = this.props;
    return (
      <div>
        <p className='text'>Залишилось часу: {time.toFixed(0)} сек</p>
        <button className='btn' onClick={this.handleToggle}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
      </div>
    );
  }
}