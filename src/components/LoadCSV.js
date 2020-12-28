import React from 'react';
import Button from '@material-ui/core/Button';
import CSVReader from 'react-csv-reader';

const LoadCSV = ({ dispatch }) => {
  const loadData = (data) => {
    let i = 0;
    const columns = data[0].map((element) => {
      i++;
      return { field: `field_${i}`, headerName: element, width: 250 };
    });
    data.shift();

    let y = 0;
    const rows = data.map((row) => {
      y++;
      const datas = { id: y };
      i = 0;
      row.forEach((value) => {
        i++;
        datas[`field_${i}`] = value;
      });
      return datas;
    });

    dispatch({ columns, rows });
  };

  return (
    <label htmlFor="upload-csv">
      <CSVReader
        inputId="upload-csv"
        inputStyle={{ display: 'none' }}
        onFileLoaded={loadData}
      />
      <Button color="inherit" component="span">
        Load CSV File
      </Button>
    </label>
  );
};

export default LoadCSV;
