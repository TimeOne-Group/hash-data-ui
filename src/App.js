import React, { useReducer } from 'react';
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
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CSVReader from 'react-csv-reader';
import { DataGrid } from '@material-ui/data-grid';
import md5 from 'js-md5';
import sha256 from 'js-sha256';
import Fields, { emptyField } from './components/Fields';
import DisplayError from './components/DisplayError';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const initialState = {
  columns: [],
  rows: [],
  encoding: 'sha256',
  addedColumnName: 'Added column',
  error: '',
  fields: [emptyField],
};

function reducer(state, action) {
  return { ...state, ...action };
}

export default function App() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadData = (data, fileInfo) => {
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

  const encode = () => {
    if (!state.addedColumnName) {
      return dispatch({ error: 'Added column name is empty' });
    }

    if (
      state.fields.filter((field) => field.completed).length !==
      state.fields.length
    ) {
      return dispatch({ error: 'No field selected' });
    }

    const columns = state.columns.filter(
      (column) => column.field !== 'field_add'
    );

    columns.push({
      field: 'field_add',
      headerName: state.addedColumnName,
      width: 250,
    });

    const rows = state.rows.map((row) => {
      const string = state.fields
        .map((field) => (field.selected ? row[field.selected] : field.constant))
        .join('');
      console.log(string);
      let value;
      if (state.encoding === 'md5') {
        value = md5(string);
      } else if (state.encoding === 'sha256') {
        value = sha256(string);
      }
      row['field_add'] = value;
      return row;
    });

    dispatch({ columns, rows });
  };

  return (
    <Div100vh className={classes.root}>
      <DisplayError error={state.error} dispatch={dispatch} />
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
        <Grid item xs={9}>
          <Box pt={5} pl={5} pr={2} height="90vh" width="100%">
            <DataGrid
              rows={state.rows}
              columns={state.columns}
              pageSize={100}
            />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box pt={5} pr={5} pl={2}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-encoding-content"
                id="panel-encoding-header"
              >
                <Typography>Encoding</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  <Grid item xs={12}>
                    <Box p={2}>
                      <FormControl fullWidth={true}>
                        <TextField
                          id="column_name"
                          label="Added column name"
                          value={state.addedColumnName}
                          onChange={(event) =>
                            dispatch({ addedColumnName: event.target.value })
                          }
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box p={2}>
                      <FormControl fullWidth={true}>
                        <InputLabel id="encoding-select-label">
                          Choose encoding
                        </InputLabel>
                        <Select
                          id="encoding-select"
                          value={state.encoding}
                          onChange={(event) =>
                            dispatch({ encoding: event.target.value })
                          }
                        >
                          <MenuItem value="md5">MD5</MenuItem>
                          <MenuItem value="sha256">SHA256</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-fields-content"
                id="panel-fields-header"
              >
                <Typography>Fields</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Fields
                  fields={state.fields}
                  columns={state.columns}
                  dispatch={dispatch}
                />
              </AccordionDetails>
            </Accordion>
            <Box p={2} mx="auto">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={encode}
              >
                Encode
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Div100vh>
  );
}
