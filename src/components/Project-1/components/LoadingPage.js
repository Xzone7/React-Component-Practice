import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './LoadingPage.css';

const useStyles = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(2),
    },
}));

const LoadingPage = () => {
    const classes = useStyles();
    return (
        <div className="project-1-loading-container">
            <div className="project-1-loading-wrapper">
                <CircularProgress className={classes.progress} />
            </div>
        </div>
    );
}

export default LoadingPage;