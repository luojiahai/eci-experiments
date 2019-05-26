import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import Button from '@material-ui/core/Button';

const Navigation = () => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? <NavigationAuth /> : <NavigationNonAuth />
        }
    </AuthUserContext.Consumer>
);
  
const NavigationAuth = () => (
    <div>
        <SignOutButton />
    </div>
);

const NavigationNonAuth = () => (
    <div>
        <Button component={RouterLink} to={ROUTES.SIGN_IN} color="inherit">
            Sign In
        </Button>
    </div>
);

export default Navigation;