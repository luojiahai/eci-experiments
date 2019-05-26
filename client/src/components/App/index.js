import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignInPage from '../SignIn';
import Toolbar from '@material-ui/core/Toolbar';
import logo from "../../svg/logo.svg";

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const styles = {
    root: {
        flexGrow: 1,
        backgroundColor: '#222'
    },
    logo: {
        flexGrow: 1,
        animation: 'spin infinite 20s linear',
        height: '50px'
    },
    title: {
        flexGrow: 1,
    },
};

const App = () => (
    <Router>
        <AppBar position="static" style={styles.root}>
            <Toolbar>
                <IconButton color="inherit">
                    <img src={logo} style={styles.logo} alt="logo" />
                </IconButton>
                <Typography style={styles.title} variant="h6" color="inherit">
                    <b>ECI-EXPERIMENTS</b>
                </Typography>
                <Navigation />
            </Toolbar>
        </AppBar>

        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
    </Router>
);
  
export default withAuthentication(App);