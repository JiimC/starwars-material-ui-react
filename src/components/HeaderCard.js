import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 'auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function HeaderCard(props) {
  const classes = useStyles();
  return (

    <Box width="100%">
      <Paper square>
        <Card className={classes.root} square>
          <CardMedia
            component="img"
            alt="Star Wars"
            height="360"
            width="auto"
            image="/images/header/1.jpg"
            title="Star Wars"
          />
          <CardContent>
            <Typography>
              React application using data provided by the publicly available Star Wars API. Implementation of the prototype UI is using material-ui components.
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
}
