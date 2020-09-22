import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import './progress-bar.scss'


const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 5,
    },

    bar: {
        zIndex: theme.zIndex.drawer + 2,

        borderRadius: 5,
        backgroundColor: '#472d5b',
    },
}))(LinearProgress);


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

export default function CustomizedProgressBars() {
    const classes = useStyles();

    return (
        <div className={classes.root} id='progress-bar'>
            <BorderLinearProgress  />
        </div>
    );
}