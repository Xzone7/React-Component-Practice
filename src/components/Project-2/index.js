import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../redux/config/mapStateToProps';
import RedirectToLogin from '../RedirectToLogin/RedirectToLogin';
import MaterialUINavBar from '../Material-UI-NavBar';
import ArmyTableMain from './components/ArmyTableMain';
import './index.css';

const Project_2 = props => {
    const authentication = props.authentication;
    return (
        authentication ?
            <div className="project-1-container">
                <div className="project-1-app-bar-container">
                    <MaterialUINavBar />
                </div>
                <div>
                   <ArmyTableMain />
                </div>
            </div>
            :
            <RedirectToLogin />
    );
}

export default connect(mapStateToProps)(Project_2);
