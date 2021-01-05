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
import { DataGrid } from '@material-ui/data-grid';
import Fields, { emptyField } from './components/Fields';
import DisplayError from './components/DisplayError';
import CSV from './components/CSV';
import Hashing from './components/Hashing';
import LoadCSV from './components/LoadCSV';
import ButtonHash from './components/ButtonHash';

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
  hashing: 'sha256',
  addedColumnName: 'Added column',
  error: '',
  fields: [emptyField],
  csv: [],
};

function reducer(state, action) {
  return { ...state, ...action };
}

export default function App() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Div100vh className={classes.root}>
      <DisplayError error={state.error} dispatch={dispatch} />
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Hash Data UI
          </Typography>
          <label htmlFor="upload-photo">
            <LoadCSV dispatch={dispatch} />
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
                aria-controls="panel-hashing-content"
                id="panel-hashing-header"
              >
                <Typography>Hashing</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Hashing
                  addedColumnName={state.addedColumnName}
                  hashing={state.hashing}
                  dispatch={dispatch}
                />
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
              <ButtonHash {...state} dispatch={dispatch} />
            </Box>
            <Box pt={0.4} pb={2} pl={2} pr={2} mx="auto">
              <CSV csv={state.csv} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Div100vh>
  );
}
