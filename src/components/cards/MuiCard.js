import React, { useState } from 'react';
import GoogleFontLoader from 'react-google-font-loader';
import NoSsr from '@material-ui/core/NoSsr';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';

import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

import {
  Info,
  InfoCaption,
  InfoSubtitle,
  InfoTitle,
} from '@mui-treasury/components/info';
import { useGalaxyInfoStyles } from '../styles/info/galaxy';
import { useCoverCardMediaStyles } from '../styles/cardMedia/cover';

var subtitleFamily = "'Spartan', sans-serif";
var family = "'Montserrat', sans-serif";
var titleFontSize = '1.25rem';
var subtitleFontSize = '1rem';
var captionFontSize = '0.875rem';

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: '1rem',
    boxShadow: 'none',
    position: 'relative',
    minWidth: 200,
    minHeight: 360,
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '100%',
      height: '64%',
      bottom: 0,
      zIndex: 1,
      background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
    },
  },
  content: {
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    width: '100%',
  },
  title: {
    fontFamily: family,
    color: '#fff',
    fontSize: titleFontSize,
    fontWeight: 'bold',
    lineHeight: 1.2
  },
  caption: {
    fontFamily: family,
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: captionFontSize,
    lineHeight: 1.5,
    '&:last-child': {
      marginTop: '1rem'
    }
  },
  subtitle: {
    fontFamily: subtitleFamily,
    color: 'rgba(255, 255, 255, 0.92)',
    fontSize: subtitleFontSize,
    lineHeight: 1.4,
    letterSpacing: '1px',
    fontWeight: 200
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

export const GalaxyCardDemo = React.memo(function GalaxyCard( props ) {
  const mediaStyles = useCoverCardMediaStyles({ bgPosition: 'top' });
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const styles = useStyles();
  return (
    <>
      <NoSsr>
        <GoogleFontLoader
          fonts={[
            { font: 'Spartan', weights: [300] },
            { font: 'Montserrat', weights: [200, 400, 700] },
          ]}
        />
      </NoSsr>
      <Card className={styles.card}>
        <CardMedia
          classes={mediaStyles}
          image={
            props.data.imagePath
          }
        />
        <Box py={3} px={2} className={styles.content}>
          <Info useStyles={useGalaxyInfoStyles}>
            <InfoSubtitle></InfoSubtitle>
            <InfoTitle>{props.data.name}</InfoTitle>
            <InfoCaption></InfoCaption>
          </Info>
        </Box>
      </Card>
    </>
  );
});
export default GalaxyCardDemo