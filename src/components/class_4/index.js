import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../redux/config/mapStateToProps.js';
import RedirectToLogin from '../RedirectToLogin/RedirectToLogin.js';
import BackButton from '../BackButton/backButton.js';
import ProblemList from './components/ProblemList.js';
import BuildTag from './components/BuildTag.js';
import './index.css';

const Class_4 = props => {
    return (props.authentication ?
        <div className="Class_4">
            <BackButton />
            <div className="Container-problemList">
                <ProblemList />
            </div>
            <div className="Container-tags">
                <BuildTag />
            </div>
        </div>
        :
        <RedirectToLogin />
    );
};

export default connect(mapStateToProps)(Class_4);