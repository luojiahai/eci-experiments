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
                    {props.answerOptions.map(renderAnswerOptions)}
                </ul>
            </div>
        </CSSTransitionGroup>
      );
}
  
Quiz.propTypes = {
    answer: PropTypes.string.isRequired,
    answerOptions: PropTypes.array.isRequired,
    instance: PropTypes.object.isRequired,
    questionId: PropTypes.number.isRequired,
    questionTotal: PropTypes.number.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
};

export default Quiz;