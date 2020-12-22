import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const Value = ({ field, index, fields, columns, dispatch }) => {
  let dom;
  switch (field.type) {
    case 'constant':
      dom = (
        <TextField
          label="Value"
          id={`value-constant-textfield-${index}`}
          value={field.constant}
          onChange={(event) => {
            fields[index] = {
              ...field,
              constant: event.target.value,
              completed: true,
            };
            dispatch({ fields });
          }}
        />
      );
      break;

    case 'field':
      dom = (
        <React.Fragment>
          <InputLabel id={`field-select-label-${index}`}>
            Choose field
          </InputLabel>
          <Select
            id={`field-select-${index}`}
            value={field.selected}
            onChange={(event) => {
              fields[index] = {
                ...field,
                selected: event.target.value,
                completed: true,
              };
              dispatch({ fields });
            }}
          >
            {columns
              .filter((column) => column.field !== 'field_add')
              .map((item) => (
                <MenuItem key={`key_${item.field}`} value={item.field}>
                  {item.headerName}
                </MenuItem>
              ))}
          </Select>
        </React.Fragment>
      );
      break;

    default:
      dom = '';
      break;
  }

  return dom;
};

export default Value;
