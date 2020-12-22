import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteButton = ({ index, className, fields, dispatch }) => {
  const deleteField = () => {
    fields.pop();
    dispatch({ fields: fields });
  };

  return index === 0 ? (
    ''
  ) : (
    <IconButton aria-label="delete" className={className} onClick={deleteField}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
};

export default DeleteButton;
