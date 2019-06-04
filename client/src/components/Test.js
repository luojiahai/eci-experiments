import React from 'react';
import PropTypes from 'prop-types';
import Instance from './Instance';
import TestCount from './TestCount';
import AnswerOption from './AnswerOption';
import { CSSTransitionGroup } from 'react-transition-group';


function Test(props) {
    function renderAnswerOptions(key) {
        return (
          <AnswerOption
            key={key.content}
            answerContent={key.content}
            answerType={key.type}
            answer={props.answer}
            testId={props.testId}
            onAnswerSelected={props.onAnswerSelected}
          />
        );
    }

    const subjectClass = props.testInstance.subject[props.testInstance.subject.length-1];
    var answerOptions = [];
    var i;
    for (i = 0; i < props.classNames.length; i++) {
        const answerContent = props.classNames[i];
        var answerType = 'incorrect';
        if (i === subjectClass) {
            answerType = 'correct';
        }
        answerOptions.push({
            type: answerType,
            content: answerContent
        })
    }

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
            <div key={props.testId}>
                <TestCount
                    counter={props.testId}
                    total={props.testTotal}
                />
                <Instance 
                    content={props.testInstance}
                    classNames={props.classNames}
                    attributeNames={props.attributeNames}
                    categoricalNames={props.categoricalNames}
                />
                <ul className="answerOptions">
                    {answerOptions.map(renderAnswerOptions)}
                </ul>
            </div>
        </CSSTransitionGroup>
      );
}
  
Test.propTypes = {
    answer: PropTypes.string.isRequired,
    testInstance: PropTypes.object.isRequired,
    testId: PropTypes.number.isRequired,
    testTotal: PropTypes.number.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
};

export default Test;