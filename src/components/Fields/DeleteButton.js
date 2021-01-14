import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteButton = ({ index, className, fields, dispatch }) => {
  const deleteField = () => {
    dispatch({ fields: fields.filter((_, idx) => idx !== index) });
  };

  if (index === 0) {
    return '';
  }

  return (
    <IconButton aria-label="delete" className={className} onClick={deleteField}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
};

export default DeleteButton;
