import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import mapStateToProps from '../../redux/config/mapStateToProps.js'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        color: "#fff",
        background: "#1976d2",
    },
    signButton: {
        textTransform: "none",
    }
}));

const MaterialUINavBar = props => {
    const classes = useStyles();
    const authentication = props.authentication;
    const dispatch = props.dispatch;
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" className={classes.menuButton} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" align="left" className={classes.title}>
                        Welcome {authentication && "Today"}
                    </Typography>
                    {authentication ?
                        <div>
                            <IconButton color="inherit">
                                <AccountCircle />
                            </IconButton>
                            <Button className={classes.signButton} color="inherit" onClick={() => dispatch({ type: "REJECTED" })}>Sign out</Button>
                        </div>
                        :
                        <Button className={classes.signButton} color="inherit" href="/login">Sign in</Button>
                    }
                </Toolbar>
            </ AppBar>
        </div>
    );
};

export default connect(mapStateToProps)(MaterialUINavBar);