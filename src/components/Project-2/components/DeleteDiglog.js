import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const DeleteDialog = props => {
    const [open] = React.useState(props.openFlag[0]);

    function handleClickConfirm() {
        props.confirm(props.openFlag[1]);
    }

    function handleClickCancle() {
        props.cancel(null);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClickCancle}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this user?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Click the confirm button below to confirm delete.
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClickCancle} color="primary">
                    Cancle
          </Button>
                <Button onClick={handleClickConfirm} color="primary" autoFocus>
                    Confirm
          </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteDialog;