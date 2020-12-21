import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '15px'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function RadioButtons( props ) {
  const [selectedValue, setSelectedValue] = React.useState('a');
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
      <Radio
        checked={props.selectedValue === 'a'}
        onChange={props.handleSelection}
        value='a'
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'A' }}
      />
      <Radio
        checked={props.selectedValue === 'b'}
        onChange={props.handleSelection}
        value='b'
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'B' }}
      />
      <GreenRadio
        checked={props.selectedValue === 'c'}
        onChange={props.handleSelection}
        value='c'
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'C' }}
      />
      <Radio
        checked={props.selectedValue === 'd'}
        onChange={props.handleSelection}
        value='d'
        color="default"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'D' }}
      />
      <Radio
        checked={props.selectedValue === 'e'}
        onChange={props.handleSelection}
        value='e'
        color="default"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'E' }}
      />
      </Paper>
    </div>
  );
}
