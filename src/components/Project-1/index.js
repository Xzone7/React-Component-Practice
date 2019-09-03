import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../redux/config/mapStateToProps';
import RedirectToLogin from '../RedirectToLogin/RedirectToLogin';
import MaterialUINavBar from '../Material-UI-NavBar';
import UserTableMain from './components/UserTableMain';
import "./index.css";

class Project_1 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const authentication = this.props.authentication;
        return (
            authentication ?
                <div className="project-1-container">
                    <div className="project-1-app-bar-container">
                        <MaterialUINavBar />
                    </div>
                    <div>
                        <UserTableMain />
                    </div>
                </div>
                :
                <RedirectToLogin />
        );
    }
}

export default connect(mapStateToProps)(Project_1);