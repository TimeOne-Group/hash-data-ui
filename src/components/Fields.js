import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';

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
};

function Fields({ fields, columns, dispatch }) {
  const classes = useStyles();

  const addField = () => {
    fields.push(emptyField);
    dispatch({ fields: fields });
  };

  const deleteField = () => {
    fields.pop(emptyField);
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
                  {index === 0 ? (
                    ''
                  ) : (
                    <IconButton
                      aria-label="delete"
                      className={classes.delete}
                      onClick={deleteField}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth={true}>
                    <InputLabel id={`field-select-label-${index}`}>
                      Choose field
                    </InputLabel>
                    <Select
                      id={`field-select-${index}`}
                      value={field.selected}
                      onChange={(event) => {
                        fields[index] = {
                          selected: event.target.value,
                        };
                        dispatch({ fields });
                      }}
                    >
                      {columns
                        .filter((column) => column.field !== 'field_add')
                        .map((item) => (
                          <MenuItem
                            key={`key_${item.field}`}
                            value={item.field}
                          >
                            {item.headerName}
                          </MenuItem>
                        ))}
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

Fields.defaultProps = {
  fields: [emptyField],
  columns: [],
  dispatch: (d) => console.log(d),
};

Fields.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.instanceOf(Array),
  dispatch: PropTypes.func,
};

export default Fields;
export { emptyField };
