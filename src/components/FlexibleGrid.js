import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StarWarsCard from './cards/Card';
import GalaxyCardDemo from './cards/MuiCard.js';
import { getRandomData } from '../functions/orchestration/datareader';
import CircularProgress from '@material-ui/core/CircularProgress';
//import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SolidGameCardDemo from './cards/GameCard';
import NewsCard2Demo from './cards/SpaceCard';
import RadioButtons from './input/Radio';
import HighlightCardDemo from './cards/HighlightCardDemo';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: '15px'
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
  const [cardStyle, setCardStyle] = React.useState('a');
  const loadingResults = ['','','','','',''];

  const handleChange = async (event, newValue) => {
    setLoading(true);
    setValue(newValue);
  };

  const handleCardStyleChange = async (event) => {
    console.log( JSON.stringify( event.target.value ) );
    setCardStyle( event.target.value );
    console.log( cardStyle );
  };

  React.useEffect(() => {
    async function getData() {
      let map = ['film', 'character', 'species', 'starship', 'planet'];
      let resolvedVariantValue = typeof(value) !== 'undefined' ? map[value] : 'character';
      let outcome = await getRandomData(resolvedVariantValue, 12);
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
            <Tabs>
              <RadioButtons handleSelection={ handleCardStyleChange } selectedValue={ cardStyle } ></RadioButtons>
            </Tabs>
          </Paper>
          {
            loading ?
            //<Backdrop className={classes.backdrop} open={loading}>
              
              <Grid container spacing={3}>
                {
                  loading ?
                    loadingResults.map(i => {
                      return (
                        <Grid item xs>
                          <CircularProgress color="inherit" />
                        </Grid>
                      );
                    })
                    : []
                }
              </Grid>
            //</Backdrop>
            :
            <Paper>
              <Grid container spacing={3}>
                {
                  loading ? [] :
                    result.map(i => {
                      return (
                        <Grid item xs>
                          { cardStyle === 'a' ? <StarWarsCard data={loading ? 'loading...' : i.data}></StarWarsCard> : ''}
                          { cardStyle === 'b' ? <GalaxyCardDemo data={loading ? 'loading...' : i.data}></GalaxyCardDemo > : '' }
                          { cardStyle === 'c' ? <NewsCard2Demo data={loading ? 'loading...' : i.data}></NewsCard2Demo> : '' }
                          { cardStyle === 'd' ? <SolidGameCardDemo data={loading ? 'loading...' : i.data}></SolidGameCardDemo> : '' }
                          { cardStyle === 'e' ? <HighlightCardDemo data={loading ? 'loading...' : i.data}></HighlightCardDemo> : '' }
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
