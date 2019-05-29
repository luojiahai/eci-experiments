import React from 'react';
import PropTypes from 'prop-types';
import Instance from './Instance';
import QuestionCount from './QuestionCount';
import AnswerOption from './AnswerOption';
import { CSSTransitionGroup } from 'react-transition-group';


function Quiz(props) {
    function renderAnswerOptions(key) {
        return (
          <AnswerOption
            key={key.content}
            answerContent={key.content}
            answerType={key.type}
            answer={props.answer}
            questionId={props.questionId}
            onAnswerSelected={props.onAnswerSelected}
          />
        );
    }

    const subjectClass = props.instance.subject[props.instance.subject.length-1];
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
            <div key={props.questionId}>
                <QuestionCount
                    counter={props.questionId}
                    total={props.questionTotal}
                />
                <Instance 
                    content={props.instance}
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
  
Quiz.propTypes = {
    answer: PropTypes.string.isRequired,
    instance: PropTypes.object.isRequired,
    questionId: PropTypes.number.isRequired,
    questionTotal: PropTypes.number.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
};

export default Quiz;