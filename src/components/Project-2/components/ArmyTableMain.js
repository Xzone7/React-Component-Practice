import React from 'react';
import './ArmyTableMain.css';
import SearchBar from './MaterialSearchBar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/armyTableActionCreator';
import ArmyTableRow from './ArmyTableRow';
import DeleteDiglog from './DeleteDiglog';
import { withRouter } from 'react-router-dom';
import LoadingPage from '../../Project-1/components/LoadingPage';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from '../../Project-1/components/MySnackbarContentWrapper';
import ErrorPage from '../../Project-1/components/ErrorPage';
import TableSortLable from '@material-ui/core/TableSortLabel';

class ArmyTableMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            openDeleteModal: [false, null],
            loadMoreFlag: false,
            loadEndFlag: false,
            orderBy: false,
            sortActiveFlag: [false, false, false, false],
        }
    }

    componentDidMount() {
        this.props.fetchData();
        this.scrollListener = this.refs.tbodyRef.addEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        let tbody = document.querySelector("tbody");

        if (tbody.scrollTop / (tbody.scrollHeight - tbody.clientHeight) === 1) {
            this.props.loadMore(() => tbody.scrollTop = 0.7 * (tbody.scrollHeight - tbody.clientHeight), this.handlLoadMoreOpen, this.handleLoadEndOpen);
        }
    }

    handleInput = e => {
        /* if search input exsit */
        // 1. remove scroll bar listener
        // 2. http call to fetch search result
        // 3. set local state 
        if (e.target.value) {
            this.refs.tbodyRef.removeEventListener("scroll", this.handleScroll);
            this.props.searchInput(e.target.value);
            this.setState({
                ...this.state,
                input: e.target.value
            });
        } else {
            this.refs.tbodyRef.addEventListener("scroll", this.handleScroll);
            this.setState({
                ...this.state,
                input: e.target.value
            });
        }
    }

    handleClearSearchInput = () => {
        this.refs.tbodyRef.addEventListener("scroll", this.handleScroll);
        this.setState({
            ...this.state,
            input: ""
        });
    }

    handleClickDelete = data => {
        this.setState({
            openDeleteModal: [!this.state.openDeleteModal[0], data]
        });
    }

    handleClickDeleteConfirm = data => {
        const deleteData = {
            ...data,
            avatar_img: null
        }
        this.props.deleteData(deleteData);
        this.setState({
            ...this.state,
            openDeleteModal: [false, null]
        });
    }

    handleClickNewSoldier = () => {
        this.props.history.push('/project-2/create');
    }

    handleClickEdit = id => {
        this.props.history.push(`/project-2/edit/${id}`);
    }

    handlLoadMoreOpen = () => {
        this.setState({
            ...this.state,
            loadMoreFlag: true,
            loadEndFlag: false
        });
    }

    handleLoadEndOpen = () => {
        this.setState({
            ...this.state,
            loadMoreFlag: false,
            loadEndFlag: true
        });
    }

    handleOpsClose = () => {
        this.setState({
            ...this.state,
            loadMoreFlag: false,
            loadEndFlag: false
        });
    }

    handlCloseErrorPage = () => {
        this.props.unsetError();
    }

    handleSortActive = id => {
        this.refs.tbodyRef.removeEventListener("scroll", this.handleScroll);
        if (!this.state.sortActiveFlag[id]) {
            this.setState({
                ...this.state,
                sortActiveFlag: this.state.sortActiveFlag.map((ele, index) => {
                    return index === id ? true : false
                })
            });
        } else {
            if (this.state.orderBy) {
                // do Asc
                this.props.getSortedData(id, "asc");
            } else {
                // do Desc
                this.props.getSortedData(id, "desc");
            }
            this.setState({
                ...this.state,
                orderBy: !this.state.orderBy
            });
        }
    }

    handleClickReset = () => {

    }

    render() {
        const data = this.props.data;
        const isLoad = this.props.isLoad;
        const isError = this.props.isError;
        const openDeleteModal = this.state.openDeleteModal;
        const paginationLoad = this.props.paginationLoad;
        const loadMoreFlag = this.state.loadMoreFlag;
        const loadEndFlag = this.state.loadEndFlag;
        const input = this.state.input;
        const searchData = this.props.searchData;
        const orderBy = this.state.orderBy;
        const sortActiveFlag = this.state.sortActiveFlag;
        return (
            <div className="project-2-mainpage-container">

                {isLoad && <LoadingPage />}
                {paginationLoad && <LoadingPage />}

                <header className="project-2-mainpage-header">
                    <img src="/armyLogo.png" alt="logo" className="project-2-mainpage-header-logo" />
                    <h2><span>US Army Personnel Registry</span></h2>
                </header>

                {isError &&
                    <div id="cxghy-2019">
                        <ErrorPage onClose={this.handlCloseErrorPage} />
                    </div>
                }

                <nav className="project-2-mainpage-nav">
                    <div className="project-2-mainpage-nav-1">
                        <SearchBar onChange={this.handleInput} value={this.state.input} onClear={this.handleClearSearchInput} />
                    </div>
                    <div className="project-2-mainpage-nav-2">
                        <div className="project-2-mainpage-nav-2-wrapper">
                            <Button variant="contained" id="reset-main" onClick={this.handleClickReset}>Reset</Button>
                            <Button variant="contained" id="new-main" onClick={this.handleClickNewSoldier}>New Soldier</Button>
                        </div>
                    </div>
                </nav>

                <div className="project-2-table-container">
                    <table className="project-2-table">
                        <thead className="project-2-table-header">
                            <tr>
                                <th className="project-2-table-header-col">
                                    Avatar
                                </th>
                                <th className="project-2-table-header-col">
                                    Name
                                    <TableSortLable
                                        active={input.length === 0 && sortActiveFlag[0]} direction={orderBy ? "desc" : "asc"} onClick={() => this.handleSortActive(0)} />
                                </th>
                                <th className="project-2-table-header-col">
                                    Sex
                                    <TableSortLable
                                        active={input.length === 0 && sortActiveFlag[1]} direction={orderBy ? "desc" : "asc"} onClick={() => this.handleSortActive(1)} />
                                </th>
                                <th className="project-2-table-header-col">
                                    Rank
                                    <TableSortLable
                                        active={input.length === 0 && sortActiveFlag[2]} direction={orderBy ? "desc" : "asc"} onClick={() => this.handleSortActive(2)} />
                                </th>
                                <th className="project-2-table-header-col">
                                    Start Date
                                    <TableSortLable
                                        active={input.length === 0 && sortActiveFlag[3]} direction={orderBy ? "desc" : "asc"} onClick={() => this.handleSortActive(3)} />
                                </th>
                                <th className="project-2-table-header-col">
                                    Phone
                                </th>
                                <th className="project-2-table-header-col">
                                    Email
                                </th>
                                <th className="project-2-table-header-col">
                                    Superior
                                </th>
                                <th className="project-2-table-header-col">
                                    # of D.S.
                                </th>
                                <th className="project-2-table-header-col">
                                    Edit
                                </th>
                                <th className="project-2-table-header-col">
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody className="project-2-table-body" ref="tbodyRef">
                            {!isLoad && <ArmyTableRow data={input.length > 0 ? searchData : data} handleClickDelete={this.handleClickDelete} handleClickEdit={this.handleClickEdit} />}
                        </tbody>
                    </table>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={loadMoreFlag}
                    autoHideDuration={3000}
                    onClose={this.handleOpsClose}
                >
                    <MySnackbarContentWrapper
                        onClose={this.handleOpsClose}
                        variant="success"
                        message="More data loaded!" />
                </Snackbar>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={loadEndFlag}
                    autoHideDuration={3000}
                    onClose={this.handleOpsClose}
                >
                    <MySnackbarContentWrapper
                        onClose={this.handleOpsClose}
                        variant="info"
                        message="You have loaded all the data" />
                </Snackbar>
                {openDeleteModal[0] && <DeleteDiglog openFlag={openDeleteModal} cancel={this.handleClickDelete} confirm={this.handleClickDeleteConfirm} />}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.armyTable.data,
        isLoad: state.armyTable.isLoad,
        isError: state.armyTable.err,
        page: state.armyTable.page,
        paginationLoad: state.armyTable.paginationLoad,
        searchData: state.armyTable.searchData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => dispatch(actions.getFirstPageData()),
        deleteData: (data) => dispatch(actions.deleteData(data)),
        loadMore: (setScroll, loadMore, loadEnd) => dispatch(actions.addPage(setScroll, loadMore, loadEnd)),
        unsetError: () => dispatch(actions.unsetError()),
        searchInput: (key) => dispatch(actions.getSearchData(key)),
        getSortedData: (id, order) => dispatch(actions.getSortedData(id, order))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ArmyTableMain));