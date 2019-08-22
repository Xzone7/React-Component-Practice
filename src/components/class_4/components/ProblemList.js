import React, { Component } from 'react';
import axios from 'axios';
import './ProblemList.css';
import { withRouter } from 'react-router-dom';

class ProblemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            problemlist: [],
            isLoad: false,
            err: false
        };
    }

    componentDidMount = () => {
        axios.get("http://api.haochuan.io/oj/problems")
            .then(res => {
                this.setState({
                    problemlist: res.data.questions,
                    isLoad: true
                });
            })
            .catch(err => {
                console.error(err);
                this.setState({ err: true });
            });
    }

    handleClickProblem = (ele, index) => {
        this.props.history.push(`/class-4/${index + 1}?id=${ele.id}`);
    }

    randomAcc = () => {
        return `${Math.floor(Math.random() * 99) + 1}%`;
    }

    render() {
        const problemlist = this.state.problemlist;
        const isLoad = this.state.isLoad;
        const err = this.state.err;
        return (
            err ?
                <div className="problem-list-display">
                    <h1 className="problem-list-err-msg">
                        Problems Not Found, please refresh the page
                    </h1>
                </div>
                :
                <div className="problem-list-display">
                    <h1>Problem List</h1>
                    {isLoad ?
                        <div>
                            <table className="problem-list-table">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Title</th>
                                        <th>Acceptance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {problemlist.map((ele, index) => {
                                        return (
                                            <tr key={ele.id} onClick={() => this.handleClickProblem(ele, index)}>
                                                <td>{index + 1}</td>
                                                <td>basic JS</td>
                                                <td>{this.randomAcc()}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        :
                        <div>Loading...</div>
                    }
                </div>
        );
    }
}

export default withRouter(ProblemList);
