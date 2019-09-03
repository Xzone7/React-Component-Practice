import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/userTableActionCreator';
import UserTableRow from './UserTableRow';
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';
import TextField from '@material-ui/core/TextField';
import "./UserTableMain.css";


class UserTableMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: "",
            searchData: []
        }
    }

    componentDidMount() {
        this.props.fetchData();
    }

    handleClickDelete = id => {
        this.props.deleteData(id);
    }

    handleSearchChange = e => {
        const userInput = e.target.value;
        const newSearchData = this.props.data.filter((ele, index) => {
            let concatStr = "";
            for (let key in ele) {
                if (key !== "_id" && key !== "password" && key !== "__v") {
                    concatStr += ele[key];
                }
            }
            return concatStr.toUpperCase().includes(userInput.trim().replace(/\s/g, "").toUpperCase());
        });
        this.setState({
            ...this.state,
            searchInput: userInput,
            searchData: newSearchData
        });
    }

    handleCloseErrorPage = () => {
        this.props.unSetError();
    }

    render() {
        const data = this.props.data;
        const isLoad = this.props.isLoad;
        const err = this.props.err;
        const searchInput = this.state.searchInput;
        const searchData = this.state.searchData;
        err ? console.error(err) : console.log("NO ERROR");
        return (
            <div className="project-1-mainpage-container">
                {isLoad && <LoadingPage />}
                <div className="project-1-header">
                    <div className="project-1-title">
                        <h2>Users</h2>
                    </div>
                    <div className="project-1-search-bar">
                        <TextField
                            value={searchInput}
                            onChange={this.handleSearchChange}
                            placeholder="Search" 
                            fullWidth />
                    </div>
                </div>
                {err && <div className="project-1-error-page"><ErrorPage onClose={this.handleCloseErrorPage} /></div>}
                <div className="project-1-table-container">
                    <table className="project-1-table">
                        <thead className="project-1-table-header">
                            <tr>
                                <td className="project-1-table-header-edit">Edit</td>
                                <td className="project-1-table-header-delete">Delete</td>
                                <td className="project-1-table-header-firstname">First Name</td>
                                <td className="project-1-table-header-lastname">Last Name</td>
                                <td className="project-1-table-header-sex">Sex</td>
                                <td className="project-1-table-header-age">Age</td>
                            </tr>
                        </thead>
                        <tbody className="project-1-table-body">
                            <UserTableRow data={searchInput.length > 0 ? searchData : data} 
                                          handleClickDelete={this.handleClickDelete} />
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.userTable.data,
        isLoad: state.userTable.isLoad,
        err: state.userTable.err
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => dispatch(actions.getData()),
        deleteData: (id) => dispatch(actions.deleteData(id)),
        unSetError: () => dispatch(actions.unSetError())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTableMain);
