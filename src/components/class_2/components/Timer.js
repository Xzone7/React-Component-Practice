import React, { Component } from 'react';
import './Timer.css';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            isOn: false,
            start: 0
        };
    }

    onStart = () => {
        this.setState({
            isOn: true,
        });
        console.log("start");
        this.timer = setInterval(() => {
            console.log(this.state.time);
            this.setState({
                time: this.state.time + 1
            });
        }, 1000)
    }

    onStop = () => {
        this.setState({ isOn:false })
        console.log("stop");
        clearInterval(this.timer);
    }

    onReset = () => {
        console.log("reset");
        this.setState({ time: 0 });
    }

    /* Do NOT touch this! */
    componentWillUnmount = () => {
        clearInterval(this.timer);
    }
    
    render() {
        const isOn = this.state.isOn;
        return (
            <div className="Timer-display">
                <div className="Time-display">
                    <p>{ this.state.time }</p>
                </div>
                <button onClick={ isOn ? this.onStop : this.onStart }>{ isOn ? 'STOP' : 'START' }</button>
                <button onClick={ this.onReset }>RESET</button>
            </div>
        );
    }
}

export default Timer;