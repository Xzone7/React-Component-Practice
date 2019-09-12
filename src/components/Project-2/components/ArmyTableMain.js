import React from 'react';
import './ArmyTableMain.css';
import SearchBar from './MaterialSearchBar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/armyTableActionCreator';
import ArmyTableRow from './ArmyTableRow';
import DeleteDiglog from './DeleteDiglog';
import { withRouter } from 'react-router-dom';

class ArmyTableMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            openDeleteModal: [false, null]
        }
    }

    componentDidMount() {
        this.props.fetchData();
    }

    handleInput = e => {
        this.setState({
            input: e.target.value
        });
    }

    handleClearSearchInput = () => {
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
        this.props.deleteData(data);
        this.setState({
            ...this.state,
            openDeleteModal: [false, null]
        });
    }

    handleClickNewSoldier = () => {
        this.props.history.push('/project-2/create');
    }

    render() {
        const data = this.props.data;
        const openDeleteModal = this.state.openDeleteModal;
        return (
            <div className="project-2-mainpage-container">

                <header className="project-2-mainpage-header">
                    <img src="/armyLogo.png" alt="logo" className="project-2-mainpage-header-logo" />
                    <h2><span>US Army Personnel Registry</span></h2>
                </header>

                <nav className="project-2-mainpage-nav">
                    <div className="project-2-mainpage-nav-1">
                        <SearchBar onChange={this.handleInput} value={this.state.input} onClear={this.handleClearSearchInput} />
                    </div>
                    <div className="project-2-mainpage-nav-2">
                        <div className="project-2-mainpage-nav-2-wrapper">
                            <Button variant="contained" id="reset-main">Reset</Button>
                            <Button variant="contained" id="new-main" onClick={this.handleClickNewSoldier}>New Soldier</Button>
                        </div>
                    </div>
                </nav>

                <div className="project-2-table-container">
                    <table className="project-2-table">
                        <thead className="project-2-table-header">
                            <tr>
                                <th className="project-2-table-header-col">Avatar</th>
                                <th className="project-2-table-header-col">Name</th>
                                <th className="project-2-table-header-col">Sex</th>
                                <th className="project-2-table-header-col">Rank</th>
                                <th className="project-2-table-header-col">Start Date</th>
                                <th className="project-2-table-header-col">Phone</th>
                                <th className="project-2-table-header-col">Email</th>
                                <th className="project-2-table-header-col">Superior</th>
                                <th className="project-2-table-header-col"># of D.S.</th>
                                <th className="project-2-table-header-col">Edit</th>
                                <th className="project-2-table-header-col">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="project-2-table-body">
                            <ArmyTableRow data={data} handleClickDelete={this.handleClickDelete}/>
                        </tbody>
                    </table>
                </div>
                {openDeleteModal[0] && <DeleteDiglog openFlag={openDeleteModal} cancel={this.handleClickDelete} confirm={this.handleClickDeleteConfirm} />}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.armyTable.data,
        isLoad: state.armyTable.isLoad,
        isError: state.armyTable.err
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => dispatch(actions.getData()),
        deleteData: (data) => dispatch(actions.deleteData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ArmyTableMain));