import React from 'react';
import PropTypes from 'prop-types';

function TrainCount(props) {
    return (
        <div className="testCount">
            TRAIN <span>{props.counter}</span> of <span>{props.total}</span>
        </div>
    );
}

TrainCount.propTypes = {
    counter: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};

export default TrainCount;