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

function getHashedValue(name, string) {
  const hash = {
    md5,
    sha256,
  };

  return hash[name] && hash[name](string);
}

const ButtonHash = ({
  addedColumnName,
  columns,
  rows,
  fields,
  hashing,
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

      row['field_add'] = getHashedValue(hashing, string);

      return row;
    });

    const csv = rows.reduce(
      (acc, row) => {
        const entry = Object.entries(row)
          .filter((value) => value[0] !== 'id')
          .map((value) => value[1]);

        return [...acc, entry];
      },
      [newColumns.map((column) => column.headerName)]
    );

    dispatch({ columns: newColumns, rows: newRows, csv });
  };

  return (
    <Button variant="contained" color="primary" fullWidth onClick={encode}>
      Hash
    </Button>
  );
};

export default ButtonHash;
