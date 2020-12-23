import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';
import DeleteButton from './Fields/DeleteButton';
import Value from './Fields/Value';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  delete: {
    top: theme.spacing(-1),
  },
}));

const emptyField = {
  selected: '',
  type: '',
  constant: '',
  completed: false,
  funcs: [],
};

function Fields({ fields, columns, dispatch }) {
  const classes = useStyles();

  const addField = () => {
    fields.push(emptyField);
    dispatch({ fields: fields });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        {fields.map((field, index) => (
          <React.Fragment key={`key-field-select-${index}`}>
            <Box p={2}>
              <Grid container>
                <Grid item xs={11}>
                  <Typography variant="h6">{`Field ${index + 1}`}</Typography>
                </Grid>
                <Grid item xs={1}>
                  <DeleteButton
                    index={index}
                    fields={fields}
                    className={classes.delete}
                    dispatch={dispatch}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth={true}>
                    <InputLabel id={`field-type-select-label-${index}`}>
                      Choose type
                    </InputLabel>
                    <Select
                      id="field-type-select"
                      value={field.type}
                      onChange={(event) => {
                        fields[index] = {
                          ...field,
                          type: event.target.value,
                          selected: '',
                          constant: '',
                          completed: false,
                        };
                        dispatch({ fields });
                      }}
                    >
                      <MenuItem value="constant">Constant</MenuItem>
                      <MenuItem value="field">Imported field</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth={true}>
                    <Value
                      field={field}
                      index={index}
                      dispatch={dispatch}
                      columns={columns}
                      fields={fields}
                    />
                  </FormControl>
                  <FormControl fullWidth={true}>
                    <InputLabel id={`field-func-select-label-${index}`}>
                      Functions to perform
                    </InputLabel>
                    <Select
                      labelId={`field-func-select-label-${index}`}
                      id={`field-func-select-${index}`}
                      multiple
                      value={field.funcs}
                      onChange={(event) => {
                        fields[index] = {
                          ...field,
                          funcs: event.target.value,
                        };
                        dispatch({ fields });
                      }}
                      input={<Input />}
                    >
                      {['toLowerCase', 'toUpperCase', 'no accent'].map(
                        (func) => (
                          <MenuItem
                            key={`field-func-item-${func}-${index}`}
                            value={func}
                          >
                            {func}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
            <Box pb={1}>{index < fields.length - 1 ? <Divider /> : ''}</Box>
          </React.Fragment>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Box p={3}>
          <Fab
            color="primary"
            aria-label="add"
            size="small"
            className={classes.fab}
            onClick={addField}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Fields;
export { emptyField };
