import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import RedirectToLogin from '../../RedirectToLogin/RedirectToLogin.js';
import mapStateToProps from '../../../redux/config/mapStateToProps.js';
import queryString from 'query-string';
import './ProblemDetail.css';

class ProblemDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            problem: {},
            isLoad: false,
            err: false,
            showAnswer: false,
            answer: "",
            userInput: ""
        };
    }

    componentDidMount = () => {
        const problemId = queryString.parse(this.props.location.search).id;
        /* noError query force server to answer back with 200 except network down */
        axios.get(`http://api.haochuan.io/oj/problems/${problemId}?noError=1`)
            .then(res => {
                this.setState({
                    problem: res.data.question,
                    isLoad: true
                });
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    err: true
                })
            })
    }

    handleInputChange = e => {
        console.log(`user set input to: ${e.target.value}`);
        this.setState({
            userInput: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const userAnswer = this.state.userInput;
        /* server ask for boolean data type */
        const postBody = {
            answer: userAnswer === "true"
        };
        const url = `http://api.haochuan.io/oj/problems/${this.state.problem.id}/solution?noError=1`;
        if (userAnswer === "true" || userAnswer === "false") {
            axios.post(url, postBody)
                .then(res => {
                    this.setState(
                        {
                            showAnswer: true,
                            answer: res.data.pass ? "Correct" : "Incorrect"
                        }
                    );
                })
                .catch(err => {
                    // noError query above, so no addtional err handle here
                    console.error(err);
                });
        } else {
            // invalid input
            alert("Please enter valid input");
        }
    }

    handleCloseMsgBox = () => {
        this.setState({ showAnswer: false });
    }

    handleBackToList = () => {
        this.props.history.push('/class-4');
    }

    render() {
        const authentication = this.props.authentication;
        const isLoad = this.state.isLoad;
        const err = this.state.err;
        const problem = this.state.problem;
        const showAnswer = this.state.showAnswer;
        return (
            authentication ?
                err ? <div className="problem-list-err-msg">Problems Not Found, please refresh the page</div> :
                    isLoad ?
                        <div className="problem-detail-container">
                            <div className="BackButton">
                                <button onClick={this.handleBackToList}>back</button>
                            </div>
                            <div className="problem-detail-display">
                                <h1>{problem.title}</h1>
                                <h4>{problem.content}</h4>
                                <p>Type your answer here:</p>
                                {showAnswer && <AnswerMsg onClose={this.handleCloseMsgBox} answer={this.state.answer} />}
                                <form className="code-test-form" onSubmit={this.handleSubmit}>
                                    <div>
                                        <input type="text"
                                            placeholder="true or false"
                                            value={this.state.userInput}
                                            onChange={this.handleInputChange} />
                                    </div>
                                    <div>
                                        <button type="submit" value="Submit">Submit Answer</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        : <div>Loading...</div>
                :
                <RedirectToLogin />
        );
    }
}

const AnswerMsg = ({ onClose, answer }) => {
    const flag = answer === "Correct" ? true : false;
    return (
        <div className={flag ? "answer-msg-correct-wrap" : "answer-msg-incorrect-wrap"}>
            <div className="answer-msg-container">
                {`Your answer is ${answer}`}
            </div>
            <div>
                <button className="answer-msg-button" onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(ProblemDetail);

