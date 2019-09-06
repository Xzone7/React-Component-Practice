import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/userTableActionCreator';
import UserTableRow from './UserTableRow';
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import HowToReg from '@material-ui/icons/HowToReg';
import TablePagination from '@material-ui/core/TablePagination';
import "./UserTableMain.css";
import { withRouter } from 'react-router-dom';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import TableSortLable from '@material-ui/core/TableSortLabel';
import MySnackbarContentWrapper from './MySnackbarContentWrapper';
import DeleteDialog from './DeleteDialog';


class UserTableMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: "",
            searchData: [],
            page: 0,
            rowsPerPage: 7,
            operationFlag: false,
            operationMsg: "",
            orderBy: false,
            sortActiveFlag: [false, false, false, false],
            openDeleteModal: [false, null]
        }
    }

    componentDidMount() {
        const historyPath = this.props.location.state
        if (this.props.history.action === "POP") {
            this.props.fetchData(
                {
                    setSuccessModal: this.handleOpsOpen,
                    message: ""
                }
            );
        } else if (historyPath && historyPath.pathname === "create") {
            this.props.location.state = null;
            this.props.fetchData(
                {
                    setSuccessModal: this.handleOpsOpen,
                    message: "Successfully Create A New User !"
                }
            );
        } else if (historyPath && historyPath.pathname === "edit") {
            this.props.location.state = null;
            this.props.fetchData(
                {
                    setSuccessModal: this.handleOpsOpen,
                    message: "Successfully Changed Selected User Data !"
                }
            );
        } else {
            this.props.fetchData(
                {
                    setSuccessModal: this.handleOpsOpen,
                    message: ""
                }
            );
        }
    }

    handleClickDelete = id => {
        this.setState({
            openDeleteModal: [!this.state.openDeleteModal[0], id]
        });
    }

    handleClickDeleteConfirm = id => {
        this.props.deleteData(id,
            {
                setSuccessModal: this.handleOpsOpen,
                message: ""
            }
        );
        this.setState({
            ...this.state,
            sortActiveFlag: [false, false, false, false],
            openDeleteModal: [false, null]
        });
    }

    handleClickEdit = id => {
        /* Funtion: 1. update the whole data set 2. redirect to edit page */
        this.props.updateData(id, this.props.history.push);
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

    handleClickNewUser = () => {
        this.props.history.push("/project-1/create");
    }

    handlePageForward = () => {
        this.setState({
            ...this.state,
            page: this.state.page + 1,
        });
    }

    handlePageBackward = () => {
        this.setState({
            ...this.state,
            page: this.state.page - 1,
        });
    }

    handlePageFirst = () => {
        this.setState({
            ...this.state,
            page: 0
        });
    }

    handlePageLast = () => {
        this.setState({
            ...this.state,
            page: Math.ceil(this.props.data.length / this.state.rowsPerPage) - 1
        });
    }

    handleChangeRowsPerPage = e => {
        this.setState({
            ...this.state,
            page: 0,
            rowsPerPage: e.target.value
        });
    }

    handlePageOutRange = () => {
        const lastPage = this.state.page - 1;
        this.setState({
            ...this.state,
            page: this.state.page - 1
        });
        return lastPage;
    }

    useStyles = () => {
        return makeStyles(theme => ({
            root: {
                flexShrink: 0,
                color: theme.palette.text.secondary,
                marginLeft: theme.spacing(2.5),
            },
        }))
    }

    handleOpsOpen = (message) => {
        this.setState({
            ...this.state,
            operationFlag: true,
            operationMsg: message
        });
    }

    handleOpsClose = () => {
        this.setState({
            ...this.state,
            operationFlag: false
        });
    }

    handleSortActive = id => {
        if (!this.state.sortActiveFlag[id]) {
            this.setState({
                ...this.state,
                sortActiveFlag: this.state.sortActiveFlag.map((ele, index) => {
                    return index === id ? true : false
                })
            });
        } else {
            if (this.state.orderBy) {
                this.props.sortData(this.getSortedDataAsc(id));
            } else {
                this.props.sortData(this.getSortedDataDesc(id));
            }
            this.setState({
                ...this.state,
                orderBy: !this.state.orderBy
            });
        }
    }

    getSortedDataAsc = id => {
        const sortMap = ["firstname", "lastname", "sex", "age"];
        const sortProp = sortMap[id];
        const sortedData = this.props.data.filter((ele, index) => true);
        sortedData.sort((a, b) => {
            if (a[sortProp] > b[sortProp]) {
                return 1;
            } else if (a[sortProp] < b[sortProp]) {
                return -1;
            } else {
                return 0;
            }
        })
        return sortedData;
    }

    getSortedDataDesc = id => {
        const sortMap = ["firstname", "lastname", "sex", "age"];
        const sortProp = sortMap[id];
        const sortedData = this.props.data.filter((ele, index) => true);
        sortedData.sort((a, b) => {
            if (a[sortProp] < b[sortProp]) {
                return 1;
            } else if (a[sortProp] > b[sortProp]) {
                return -1;
            } else {
                return 0;
            }
        })
        return sortedData;
    }

    render() {
        const data = this.props.data;
        const isLoad = this.props.isLoad;
        const err = this.props.err;
        const searchInput = this.state.searchInput;
        const searchData = this.state.searchData;
        const page = this.state.page;
        const rowsPerPage = this.state.rowsPerPage;
        const sortActiveFlag = this.state.sortActiveFlag
        const orderBy = this.state.orderBy;
        const openDeleteModal = this.state.openDeleteModal;
        console.log(page);
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
                                <th className="project-1-table-header-edit">Edit</th>
                                <th className="project-1-table-header-delete">Delete</th>
                                <th className="project-1-table-header-firstname">
                                    First Name
                                <TableSortLable
                                        active={searchInput.length === 0 && sortActiveFlag[0]} direction={orderBy ? "desc" : "asc"} onClick={() => this.handleSortActive(0)} /></th>
                                <th className="project-1-table-header-lastname">
                                    Last Name
                                    <TableSortLable
                                        active={searchInput.length === 0 && sortActiveFlag[1]} direction={orderBy ? "desc" : "asc"} onClick={() => this.handleSortActive(1)} /></th>
                                <th className="project-1-table-header-sex">
                                    Sex
                                    <TableSortLable
                                        active={searchInput.length === 0 && sortActiveFlag[2]} direction={orderBy ? "desc" : "asc"} onClick={() => this.handleSortActive(2)} /></th>
                                <th className="project-1-table-header-age">
                                    Age
                                    <TableSortLable
                                        active={searchInput.length === 0 && sortActiveFlag[3]} direction={orderBy ? "desc" : "asc"} onClick={() => this.handleSortActive(3)} /></th>
                            </tr>
                        </thead>
                        <tbody className="project-1-table-body">
                            <UserTableRow data={searchInput.length > 0 ? searchData : data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                                handleClickEdit={this.handleClickEdit}
                                handleClickDelete={this.handleClickDelete} />
                        </tbody>
                    </table>
                </div>
                <div className="project-1-pagination-container">
                    <TablePagination
                        rowsPerPageOptions={[5, 7, 10]}
                        page={(data.length > 0 && page * rowsPerPage >= data.length) ? this.handlePageOutRange() : page}
                        rowsPerPage={rowsPerPage}
                        count={data.length}
                        component="div"
                        onChangePage={() => { }}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        ActionsComponent={() => {
                            return (
                                <div className={this.useStyles()().root}>
                                    <IconButton
                                        onClick={this.handlePageFirst}
                                        disabled={page === 0 || searchInput.length > 0}
                                        aria-label="first page"
                                    >
                                        {useTheme().direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                                    </IconButton>
                                    <IconButton onClick={this.handlePageBackward} disabled={page === 0 || searchInput.length > 0} aria-label="previous page">
                                        {useTheme().direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                    </IconButton>
                                    <IconButton
                                        onClick={this.handlePageForward}
                                        disabled={page >= Math.ceil(data.length / rowsPerPage) - 1 || searchInput.length > 0}
                                        aria-label="next page"
                                    >
                                        {useTheme().direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                    </IconButton>
                                    <IconButton
                                        onClick={this.handlePageLast}
                                        disabled={page >= Math.ceil(data.length / rowsPerPage) - 1 || searchInput.length > 0}
                                        aria-label="last page"
                                    >
                                        {useTheme().direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                                    </IconButton>
                                </div>
                            );
                        }} />
                </div>
                {
                    !isLoad &&
                    <div className="project-1-newUser-container">
                        <Fab variant="extended"
                            id="project-1-newUser-button"
                            onClick={this.handleClickNewUser}>
                            <span>
                                <HowToReg />
                            </span>
                            Create New User
                    </Fab>
                    </div>
                }
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={this.state.operationFlag}
                    autoHideDuration={3000}
                    onClose={this.handleOpsClose}
                >
                    <MySnackbarContentWrapper
                        onClose={this.handleOpsClose}
                        variant="success"
                        message={this.state.operationMsg} />
                </Snackbar>
                {openDeleteModal[0] && <DeleteDialog openFlag={this.state.openDeleteModal} cancle={this.handleClickDelete} confirm={this.handleClickDeleteConfirm} />}
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
        fetchData: (event) => dispatch(actions.getData(event)),
        deleteData: (id, event) => dispatch(actions.deleteData(id, event)),
        unSetError: () => dispatch(actions.unSetError()),
        updateData: (id, redirectToEdit) => dispatch(actions.updateData(id, redirectToEdit)),
        sortData: (sortedData) => dispatch(actions.setUserList(sortedData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserTableMain));
