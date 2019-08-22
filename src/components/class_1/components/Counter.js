import React, { Component } from 'react';
import './Counter.css';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = { counter: 0 };
    }

    onAdd = () => {
        this.setState({ counter: this.state.counter + 1 });
    }

    onSubstract = () => {
        this.setState({ counter: this.state.counter - 1 });
    }
    render() {
        return (
            <div className="Counter-display">
                <div className="Number-display">
                    <p>{this.state.counter}</p>
                </div>
                <button onClick={this.onAdd}>+</button>
                <button onClick={this.onSubstract}>-</button>
            </div>
        );
    }
}

export default Counter;