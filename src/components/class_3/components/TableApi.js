import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './TableApi.css';

class TableApi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoad: true,
        };
    }

    componentDidMount() {
        axios({ method: 'get', url: 'https://api.github.com/users?per_page=100' })
            .then(response => {
                this.setState({ data: response.data, isLoad: false });
            })
            .catch(err => {
                console.error(err);
            })
    }

    handleShowDetails = (loginName) => {
        console.log(loginName);
        /* Redirect */
        this.props.history.push(`/class-3/${loginName}`);
    }

    render() {
        console.log(this.state);
        console.log(this.props);
        return (
            <div className="table-display">
                <div>
                    <h2>List</h2>
                    {this.state.isLoad ? <h3>Loading...</h3> :
                        <table className="table-data">
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <th>username</th>
                                    <th>image</th>
                                </tr>
                                {this.state.data.map((ele, index) => {
                                    return <TableRow name={ele} detail={this.handleShowDetails} key={ele.id} />;
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>
        );
    }
}

function TableRow(props) {
    return (
        <tr className="click-row" onClick={() => props.detail(props.name.login)}>
            <td>{props.name.id}</td>
            <td>{props.name.login}</td>
            <td><img className="avatar-display"
                src={props.name.avatar_url}
                alt={props.name.avatar_url} /></td>
        </tr>
    );
}

export default withRouter(TableApi);