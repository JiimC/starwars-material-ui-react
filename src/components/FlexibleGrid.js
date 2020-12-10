import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StarWarsCard from './Card';
import { getRandomData } from '../functions/orchestration/datareader';
import CircularProgress from '@material-ui/core/CircularProgress';
//import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function AutoGrid() {
  const classes = useStyles();

  const [result, setResult] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState(1);

  const handleChange = async (event, newValue) => {
    setLoading(true);
    setValue(newValue);
  };

  React.useEffect(() => {
    async function getData() {
      let map = ['film', 'character', 'species', 'starship', 'planet'];
      let outcome = await getRandomData(value ? map[value] : 'character', 25);
      setResult(outcome);
      setLoading(false);
      return outcome;
    }
    let data = getData();
    return data;
  }, [value])

  console.log(result);

  return (
    <div className={classes.root}>
      {
        <div>
          <Paper className={classes.root}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="#fafafa"
              textColor="#fafafa"
              centered
            >
              <Tab label="Films"/>
              <Tab label="Characters"/>
              <Tab label="Species"/>
              <Tab label="Starships"/>
              <Tab label="Planets"/>
            </Tabs>
          </Paper>
          {
            loading ?
            //<Backdrop className={classes.backdrop} open={loading}>
              <CircularProgress color="inherit" />
            //</Backdrop>
            :
            <Paper variant="outlined">
              <Grid container spacing={3}>
                {
                  loading ? [] :
                    result.map(i => {
                      return (
                        <Grid item xs>
                          <StarWarsCard data={loading ? 'loading...' : i.data}></StarWarsCard>
                        </Grid>
                      );
                    })
                }
              </Grid>
            </Paper>
          }
        </div>
      }
    </div>
  );
}
