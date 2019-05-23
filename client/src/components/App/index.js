import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import Toolbar from '@material-ui/core/Toolbar';
import logo from "../../svg/logo.svg";

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const appBarStyle = {
    height: '90px',
    backgroundColor: '#222'
}

const App = () => (
    <Router>
        <div>
            {/* <div className="App-header"> */}
            <AppBar position="static" style={appBarStyle}>
                <Toolbar>
                    <IconButton color="inherit">
                        <img src={logo} className="App-logo" alt="logo" />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        <b>ECI-EXPERIMENTS</b>
                    </Typography>
                    <Navigation />
                </Toolbar>
            </AppBar>
            {/* </div> */}
    
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route
                path={ROUTES.PASSWORD_FORGET}
                component={PasswordForgetPage}
            />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
        </div>
    </Router>
);
  
export default withAuthentication(App);