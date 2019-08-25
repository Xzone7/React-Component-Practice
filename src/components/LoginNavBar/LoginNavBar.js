import React from 'react';
import './LoginNavBar.css';

/* Note: this component has been deprecated! since I used Marterial-UI App bar instead */
const LoginNavBar = () => {
    return (
        <div className="login-link">
            <a href='/login'>Sign in</a>
        </div>
    );
}

export default LoginNavBar;