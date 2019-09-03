import React from 'react';
import './ErrorPage.css';

const ErrorPage = ({ onClose, err }) => {
    return (
        <div className="server-err-wrap">
            <div className="server-err-container">
                Oops, something wrong! Please wait for the page to refresh or contact Admin
            </div>
            <div>
                <button className="err-button" onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default ErrorPage;