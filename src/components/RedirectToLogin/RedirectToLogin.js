import React from 'react';
import { Redirect } from 'react-router-dom';

const RedirectToLogin = () => {
    return (<Redirect to={{ pathname: '/login' }} />);
}

export default RedirectToLogin;