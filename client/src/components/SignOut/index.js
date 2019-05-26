import React from 'react';

import { withFirebase } from '../Firebase';
import Button from '@material-ui/core/Button';

const SignOutButton = ({ firebase }) => (
    <Button
        onClick={firebase.doSignOut}
        color="inherit"
    >
        Sign Out
    </Button>
);

export default withFirebase(SignOutButton);