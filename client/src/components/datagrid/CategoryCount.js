import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getCollectionCount } from '../../functions/orchestration/datareader';

const category_map = ['film', 'character', 'species', 'starship', 'planet'];

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const initialCounts = [
  0, 0, 0, 0, 0
];

const getCountData = (category_map) => {
  return category_map.map(category => {
    return getCollectionCount(category);
  });
};

export default function BasicTable() {
  const classes = useStyles();

  const [counts, setCounts] = React.useState(initialCounts);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(async () => {
    async function getData() {
      try {
        let promises = getCountData(category_map);
        let outcome = await Promise.all(promises);
        outcome = outcome.map(element => {
          return element.data.count;
        });
        setCounts(outcome);
        setLoading(false);
        return outcome;
      } catch (err) {
        console.log(err);
      }
    }
    let data = await getData();
    return data;
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Count</TableCell>
          </TableRow>
        </TableHead>
        {
          loading ? initialCounts :
            <TableBody>
              {counts.map((row, index) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {
                      category_map[index]
                    }
                  </TableCell>
                  <TableCell align="right">{row}</TableCell>
                </TableRow>
              ))}
            </TableBody>
        }
      </Table>
    </TableContainer>
  );
}
