import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Div100vh from 'react-div-100vh';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
  const [encoding, setEncoding] = useState('sha256');

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
      <Grid container>
        <Grid item xs={10}>
          <Box pt={5} pl={5} pr={2} height="90vh" width="100%">
            <DataGrid rows={rows} columns={columns} pageSize={100} />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box pt={5} pr={5} pl={2}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Encoding</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl>
                  <Select
                    id="encoding-select"
                    value={encoding}
                    onChange={(event) => setEncoding(event.target.value)}
                  >
                    <MenuItem value="md5">MD5</MenuItem>
                    <MenuItem value="sha256">SHA256</MenuItem>
                  </Select>
                  <FormHelperText>Choose your proper encoding</FormHelperText>
                </FormControl>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>
      </Grid>
    </Div100vh>
  );
}
