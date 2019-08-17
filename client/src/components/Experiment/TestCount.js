import React from 'react';
import PropTypes from 'prop-types';

function TestCount(props) {
    return (
        <div className="testCount">
            VALIDATION <span>{props.counter}</span> of <span>{props.total}</span>
        </div>
    );
}

TestCount.propTypes = {
    counter: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};

export default TestCount;