import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="#fafafa"
        textColor="#fafafa"
        centered
        style={{ background: '#000000', border: '1px' }}
      >
        <Tab label="Films" style={{ background: '#4f7bac' }}/>
        <Tab label="Characters" style={{ background: '#4f7bac' }}/>
        <Tab label="Species" style={{ background: '#4f7bac' }}/>
        <Tab label="Starships" style={{ background: '#4f7bac' }}/>
        <Tab label="Planets" style={{ background: '#4f7bac' }}/>
      </Tabs>
    </Paper>
  );
}
