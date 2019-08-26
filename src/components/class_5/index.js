import React from 'react';
import RedirectToLogin from '../RedirectToLogin/RedirectToLogin';
import { connect } from 'react-redux';
import BackButton from '../BackButton/backButton';
import mapStateToProps from '../../redux/config/mapStateToProps';
import EmailClient from './components/EmailClient';
import './index.css';

const Class_5 = props => {
    const authentication = props.authentication;
    return (
        authentication
            ?
            <div className="Class-5-page">
                <BackButton />
                <div className="Container-email-client">
                    <EmailClient />
                </div>
            </div>
            :
            <RedirectToLogin />
    );
}

export default connect(mapStateToProps)(Class_5);