import React from 'react';
import PropTypes from 'prop-types';

function TrainingCount(props) {
    return (
        <div className="questionCount">
            Training <span>{props.counter}</span> of <span>{props.total}</span>
        </div>
    );
}

TrainingCount.propTypes = {
    counter: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};

export default TrainingCount;