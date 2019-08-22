import React from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../redux/config/mapStateToProps.js';

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
