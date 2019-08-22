import React from 'react';
import TableApi from './components/TableApi.js';
import Modal from './components/Modal.js';
import BackButton from '../BackButton/backButton.js';
import RedirectToLogin from '../RedirectToLogin/RedirectToLogin.js';
import mapStateToProps from '../../redux/config/mapStateToProps.js';
import { connect } from 'react-redux';
import './index.css';

const Class_3 = props => {
    const content = <div className="content">Hello this is Props from App</div>;
    return (props.authentication ?
        <div className="Class-3-page">
            <BackButton />
            <div className="Container-Modal">
                <Modal buttonText="Open" cancelButtonText="Go Back" content={content} width={400} />
            </div>
            <div className="Container-TableApi">
                <TableApi />
            </div>
        </div>
        :
        <RedirectToLogin />
    );
};

export default connect(mapStateToProps)(Class_3);