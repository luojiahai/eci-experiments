import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';


const styles = {
    root: {
        padding: '0px 25px 25px 25px',
        width: '100%'
    },
    button: {
        marginRight: '25px',
        padding: '5px 50px',
        flexGrow: 1
    },
}

function TrainingPagination(props) {
    return (
        <div style={styles.root}>
            <Button 
                variant="outlined" 
                style={styles.button} 
                value={false} 
                onClick={props.onTrainingClicked}
            >
                Prev
            </Button>
            <Button 
                variant="outlined" 
                style={styles.button} 
                value={true} 
                onClick={props.onTrainingClicked}
            >
                Next
            </Button>
        </div>
    );
}

TrainingPagination.propTypes = {
    onTrainingClicked: PropTypes.func.isRequired
};

export default TrainingPagination;