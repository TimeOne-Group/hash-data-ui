import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const DisplayError = ({ error, dispatch }) => {
  const handleClose = () => {
    dispatch({ error: '' });
  };

  if (error) {
    return (
      <React.Fragment>
        <Dialog
          open={true}
          onClose={handleClose}
          aria-labelledby="error-dialog-title"
        >
          <DialogTitle id="error-dialog-title">
            Something went wrong:
          </DialogTitle>
          <DialogContent>
            <DialogContentText>{error}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }

  return '';
};

DisplayError.defaultProps = {
  error: '',
  dispatch: (d) => console.log(d),
};

DisplayError.propTypes = {
  error: PropTypes.string,
  dispatch: PropTypes.func,
};

export default DisplayError;
