import React from 'react';
import PropTypes from 'prop-types';
import Instance from './Instance';
import TrainCount from './TrainCount';
import TrainPagination from './TrainPagination';
import { CSSTransitionGroup } from 'react-transition-group';


function Train(props) {
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
            <div key={props.trainId}>
                <TrainCount
                    counter={props.trainId}
                    total={props.trainTotal}
                />
                <Instance 
                    content={props.trainInstance}
                    classNames={props.classNames}
                    attributeNames={props.attributeNames}
                    categoricalNames={props.categoricalNames}
                    phase={0}
                    group={props.group}
                />
                <TrainPagination 
                    onTrainClicked={props.onTrainClicked}
                />
            </div>
        </CSSTransitionGroup>
      );
}
  
Train.propTypes = {
    trainInstance: PropTypes.object.isRequired,
    trainId: PropTypes.number.isRequired,
    trainTotal: PropTypes.number.isRequired,
    onTrainClicked: PropTypes.func.isRequired,
    group: PropTypes.number.isRequired,
};

export default Train;