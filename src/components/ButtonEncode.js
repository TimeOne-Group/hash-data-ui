import React from 'react';
import Button from '@material-ui/core/Button';
import md5 from 'js-md5';
import sha256 from 'js-sha256';
import noAccent from '../utils/noAccent';

const performFunctions = (funcs, string) => {
  funcs.forEach((func) => {
    switch (func) {
      case 'toLowerCase':
        string = string.toLowerCase();
        break;

      case 'toUpperCase':
        string = string.toUpperCase();
        break;

      case 'no accent':
        string = noAccent(string);
        break;

      default:
        break;
    }
  });

  return string;
};

const ButtonEncode = ({
  addedColumnName,
  columns,
  rows,
  fields,
  encoding,
  dispatch,
}) => {
  const encode = () => {
    if (!addedColumnName) {
      return dispatch({ error: 'Added column name is empty' });
    }

    if (fields.filter((field) => field.completed).length !== fields.length) {
      return dispatch({ error: 'No field selected' });
    }

    const newColumns = columns.filter((column) => column.field !== 'field_add');

    newColumns.push({
      field: 'field_add',
      headerName: addedColumnName,
      width: 250,
    });

    const newRows = rows.map((row) => {
      const string = fields
        .map((field) =>
          performFunctions(
            field.funcs,
            field.selected ? row[field.selected] : field.constant
          )
        )
        .join('');

      let value;
      if (encoding === 'md5') {
        value = md5(string);
      } else if (encoding === 'sha256') {
        value = sha256(string);
      }
      row['field_add'] = value;
      return row;
    });

    const csv = [];

    csv.push(columns.map((column) => column.headerName));
    rows.forEach((row) =>
      csv.push(
        Object.entries(row)
          .filter((value) => value[0] !== 'id')
          .map((value) => value[1])
      )
    );

    dispatch({ columns: newColumns, rows: newRows, csv });
  };
  return (
    <Button variant="contained" color="primary" fullWidth onClick={encode}>
      Encode
    </Button>
  );
};

export default ButtonEncode;
