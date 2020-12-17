import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Div100vh from 'react-div-100vh';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CSVReader from 'react-csv-reader';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function App() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const loadData = (data, fileInfo) => {
    let i = 0;
    setColumns(
      data[0].map((element) => {
        i++;
        return { field: `field_${i}`, headerName: element, width: 150 };
      })
    );

    data.shift();

    let y = 0;
    setRows(
      data.map((row) => {
        y++;
        const datas = { id: y };
        i = 0;
        row.forEach((value) => {
          i++;
          datas[`field_${i}`] = value;
        });
        return datas;
      })
    );
  };

  return (
    <Div100vh className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Encode File UI
          </Typography>
          <label htmlFor="upload-photo">
            <CSVReader
              inputId="upload-photo"
              inputStyle={{ display: 'none' }}
              onFileLoaded={loadData}
            />
            <Button color="inherit" component="span">
              Load CSV File
            </Button>
          </label>
        </Toolbar>
      </AppBar>
      <Box p={5} height="90vh" width="95%">
        <DataGrid rows={rows} columns={columns} pageSize={100} />
      </Box>
    </Div100vh>
  );
}
