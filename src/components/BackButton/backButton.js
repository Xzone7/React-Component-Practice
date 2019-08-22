import React from 'react';
import { withRouter } from 'react-router-dom';
import './backButton.css';

const BackButton = ({ history }) => {
    return (
        <div className="Container-BackButton">
            <button onClick={() => handleClick(history)}>Back</button>
        </div>
    );
};

const handleClick = (history) => {
    history.push("/");
}

export default withRouter(BackButton);