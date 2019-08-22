import React from 'react';
import Timer from './components/Timer.js';
import LoginForm from './components/LoginForm.js';
import BackButton from '../BackButton/backButton.js';
import RedirectToLogin from '../RedirectToLogin/RedirectToLogin.js';
import mapStateToProps from '../../redux/config/mapStateToProps.js';
import { connect } from 'react-redux';
import './index.css';

const Class_2 = props => {
    return props.authentication ?
        <div className="Class-2-page">
            <BackButton />
            <div className="Container-Timer">
                <Timer />
            </div>
            <br />
            <div className="Container-LoginForm">
                <LoginForm />
            </div>
        </div>
        :
        <RedirectToLogin />
};

export default connect(mapStateToProps)(Class_2);