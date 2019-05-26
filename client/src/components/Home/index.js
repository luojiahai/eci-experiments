import React, { Component } from "react";
import Quiz from '../Quiz';
import Result from '../Result';
import "./home.css";

import dataset from '../../tempAPI/dataset';
import instances from '../../tempAPI/instances';
import { withAuthorization } from '../Session';

const HomePage = () => (
    <Home />
);

class Home extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
            counter: 0,
            questionId: 1,
            instance: instances[0].instance,
            answerOptions: instances[0].answers,
            answer: '',
            result: '',
            isTrained: false
        };

        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    }

    handleAnswerSelected(event) {
        this.setUserAnswer(event.currentTarget.value);
        if (this.state.questionId < instances.length) {
            setTimeout(() => this.setNextQuestion(), 300);
            // this.setNextQuestion();
        } else {
            setTimeout(() => this.setResult(), 300);
            // this.setResult();
        }
    }

    setUserAnswer(answer) {
        this.setState((state) => ({
            answer: answer
        }));
    }

    setNextQuestion() {
        const counter = this.state.counter + 1;
        const questionId = this.state.questionId + 1;
        this.setState({
            counter: counter,
            questionId: questionId,
            instance: instances[counter].instance,
            answerOptions: instances[counter].answers,
            answer: ''
        });
    }

    setResult () {
        this.setState({ result: 'Experiment complete!' });
    }

    renderQuiz() {
        return (
            <Quiz
                answer={this.state.answer}
                answerOptions={this.state.answerOptions}
                questionId={this.state.questionId}
                instance={this.state.instance}
                questionTotal={instances.length}
                onAnswerSelected={this.handleAnswerSelected}
                classNames={dataset.classNames}
                attributeNames={dataset.attributeNames}
                categoricalNames={dataset.categoricalNames}
            />
        );
    }
      
    renderResult() {
        return (
            <Result quizResult={this.state.result} />
        );
    }

    render() {
        return (
            this.state.result ? this.renderResult() : this.renderQuiz()
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);