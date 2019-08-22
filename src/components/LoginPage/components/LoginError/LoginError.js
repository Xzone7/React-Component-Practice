import React from 'react';
import './LoginError.css';

const LoginError = ({ onClose }) => {
    return (
        <div className="login-err-wrap">
            <div className="login-err-container">
                Incorrect username or password.
            </div>
            <div>
                <button className="err-button" onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default LoginError;