import React from 'react';
import PropTypes from 'prop-types';
import Instance from './Instance';
import TrainingCount from './TrainingCount';
import TrainingPagination from './TrainingPagination';
import { CSSTransitionGroup } from 'react-transition-group';


function Training(props) {
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
            <div key={props.trainingId}>
                <TrainingCount
                    counter={props.trainingId}
                    total={props.trainingTotal}
                />
                <Instance 
                    content={props.trainingInstance}
                    classNames={props.classNames}
                    attributeNames={props.attributeNames}
                    categoricalNames={props.categoricalNames}
                    task={0}    // training
                />
                <TrainingPagination 
                    onTrainingClicked={props.onTrainingClicked}
                />
            </div>
        </CSSTransitionGroup>
      );
}
  
Training.propTypes = {
    trainingInstance: PropTypes.object.isRequired,
    trainingId: PropTypes.number.isRequired,
    trainingTotal: PropTypes.number.isRequired,
    onTrainingClicked: PropTypes.func.isRequired
};

export default Training;