import React from 'react';

import  { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import Home from '../Home';

const Landing = () => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? <Home /> : <LandingPage />
        }
    </AuthUserContext.Consumer>
);

const LandingPage = () => (
    <FirebaseContext.Consumer>
        {firebase => {
            return <div>I've access to Firebase and render something.</div>;
        }}
    </FirebaseContext.Consumer>
);

export default Landing;