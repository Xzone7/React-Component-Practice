import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './TableApi.css';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/listActionCreator';

class TableApi extends Component {

    componentDidMount() {
        this.props.fetchData();
    }

    handleShowDetails = (loginName) => {
        console.log(loginName);
        /* Redirect */
        this.props.history.push(`/class-3/${loginName}`);
    }

    render() {
        const data = this.props.data;
        const isLoad = this.props.isLoad;
        const err = this.props.err;
        return (
            <div className="table-display">
                <div>
                    <h2>List</h2>
                    {err ?
                        <h1>Please Refresh the page</h1>
                        :
                        isLoad ? <h3>Loading...</h3> :
                            <table className="table-data">
                                <tbody>
                                    <tr>
                                        <th>ID</th>
                                        <th>username</th>
                                        <th>image</th>
                                    </tr>
                                    {data.map((ele, index) => {
                                        return <TableRow name={ele} detail={this.handleShowDetails} key={ele.id} />;
                                    })}
                                </tbody>
                            </table>
                    }
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

const mapStateToProps = state => {
    return {
        data: state.list.data,
        isLoad: state.list.isLoad,
        err: state.list.err
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => { dispatch(actions.getData()) }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableApi));