import React from 'react';
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const MaterialUINavBar = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        React & Material-UI Sample App-Nav-Bar
                    </Typography>
                </Toolbar>
            </ AppBar>
        </div>
    );
};

export default MaterialUINavBar;