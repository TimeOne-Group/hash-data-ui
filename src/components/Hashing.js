import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Hashing = ({ addedColumnName, hashing, dispatch }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box p={2}>
          <FormControl fullWidth={true}>
            <TextField
              id="column_name"
              label="Added column name"
              value={addedColumnName}
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
            <InputLabel id="hashing-select-label">
              Choose hash function
            </InputLabel>
            <Select
              id="hashing-select"
              value={hashing}
              onChange={(event) => dispatch({ hashing: event.target.value })}
            >
              <MenuItem value="md5">MD5</MenuItem>
              <MenuItem value="sha256">SHA256</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Hashing;
