import React, { Component } from 'react';
import './Iphone.css';

class Iphone extends Component {
    render() {
        return (
            <div className="Iphone">
                <div className="Iphone-dispaly">
                    <div className="Iphone-statusBar">
                    </div>

                    <div className="Iphone-screen">
                        <button className="icon"></button>
                        <button className="icon"></button>
                        <button className="icon"></button>
                        <button className="icon"></button>
                        <button className="icon"></button>
                        <button className="icon"></button>
                        <button className="icon"></button>
                        <button className="icon"></button>
                        <button className="icon"></button>
                        <button className="icon"></button>
                        <button className="icon"></button>
                        <button className="icon"></button>
                        <button className="icon"></button>
                        <button className="icon"></button>
                        <button className="icon"></button>
                        <button className="icon"></button>
                        <button className="icon"></button>
                        <button className="icon"></button>
                        <button className="icon"></button>
                    </div>

                    <div className="Iphone-docker">
                        <button className="icon"></button>
                        <button className="icon"></button>
                        <button className="icon"></button>
                        <button className="icon"></button>
                    </div>

                    <div>
                        <button className="home" title="Home"></button>
                    </div>
                    <span className="speaker" title="Speaker"></span>
                    <span className="camera" title="Camera"></span>
                    <span className="proximity" title="Proximity Sensor"></span>
                </div>
            </div>
        );
    }
}

export default Iphone;