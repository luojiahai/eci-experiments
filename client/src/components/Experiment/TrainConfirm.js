import React from 'react';
import PropTypes from 'prop-types';
import TrainPagination from './TrainPagination';
import { CSSTransitionGroup } from 'react-transition-group';


function TrainConfirm(props) {
    return (
        <CSSTransitionGroup
            className="container"
            component="div"
            transitionName="fade"
            transitionEnterTimeout={400}
            transitionLeaveTimeout={250}
            transitionAppear
            transitionAppearTimeout={250}
        >
            <div className="trainConfirm">
                <strong>Click NEXT to start test</strong>
            </div>
            <TrainPagination 
                onTrainClicked={props.onTrainClicked}
            />
        </CSSTransitionGroup>
      );
}
  
TrainConfirm.propTypes = {
    onTrainClicked: PropTypes.func.isRequired
};

export default TrainConfirm;