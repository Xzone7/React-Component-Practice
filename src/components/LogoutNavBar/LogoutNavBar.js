import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../redux/config/mapStateToProps.js';

/* Note: this component has been deprecated! since I used Marterial-UI App bar instead */
const LogoutNavBar = props => {
    return (
        <div className="logout-link">
            <a onClick={() => handleLogout(props)} href='/'>Sign out</a>
        </div>
    );
}

const handleLogout = props => {
    props.dispatch({ type: "REJECTED" });
}

export default connect(mapStateToProps)(LogoutNavBar);
