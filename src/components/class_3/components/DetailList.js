import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import RedirectToLogin from '../../RedirectToLogin/RedirectToLogin.js';
import mapStateToProps from '../../../redux/config/mapStateToProps.js';
import './DetailList.css';

class DetailList extends Component {
    constructor(props) {
        super(props);
        this.state = { details: [], isLoad: false, err: false };
    }

    componentDidMount = () => {
        const loginName = this.props.match.params.login;
        axios.get(`https://api.github.com/users/${loginName}`)
            .then(res => {
                this.setState({ details: [res.data], isLoad: true });
            })
            .catch(err => {
                console.error(err);
                this.setState({ err: true, isLoad: true });
            })
    }

    handleBackToList = () => {
        this.props.history.push("/class-3");
    }

    render() {
        if (this.props.authentication) {
            if (!this.state.err) {
                return (
                    <div>
                        <div className="BackButton">
                            <button onClick={this.handleBackToList}>back</button>
                        </div>
                        <div className="details-display">
                            <div>
                                <h2>Details</h2>
                                <div className="details-text">
                                    {this.state.isLoad ?
                                        this.state.details.map((ele, index) => {
                                            return <Details obj={ele} key={index} />;
                                        })
                                        :
                                        <h3>Loading...</h3>
                                    }
                                </div>
                            </div>
                            <div>
                                {this.state.isLoad ?
                                    <img className="detail-avatar"
                                        src={this.state.details[0].avatar_url}
                                        alt={this.state.details[0].avatar_url}
                                    />
                                    :
                                    <h3>Loading...</h3>
                                }
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <div className="BackButton">
                            <button onClick={this.handleBackToList}>back</button>
                        </div>
                        <div>
                            <h1>User Not Found</h1>
                            <h2>Please try another login name or to hit back button</h2>
                        </div>
                    </div>
                );
            }
        } else {
            return (<RedirectToLogin />);
        }
    }
}

function Details({ obj }) {
    return (
        <ul className="details-list">
            <li>{`name: ${obj.login}`}</li>
            <li>{`location: ${obj.location}`}</li>
            <li>{`following: ${obj.following}`}</li>
            <li>{`followers: ${obj.followers}`}</li>
        </ul>
    );
}

export default connect(mapStateToProps)(DetailList);