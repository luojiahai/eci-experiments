import React, { Component } from "react";
import Quiz from '../Quiz';
import Training from '../Training';
import Result from '../Result';
import "./home.css";

import dataset from '../../tempAPI/dataset';
import instances from '../../tempAPI/instances';
import trainingInstances from '../../tempAPI/trainingInstances';
import { withAuthorization } from '../Session';

const HomePage = () => (
    <Home />
);

class Home extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
            trainingCounter: 0,
            trainingId: 1,
            trainingInstance: trainingInstances[0].instance,
            questionId: 1,
            questionCounter: 0,
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
            setTimeout(() => this.setNextQuestion(), 150);
            // this.setNextQuestion();
        } else {
            setTimeout(() => this.setResult(), 150);
            // this.setResult();
        }
    }

    handleNextClicked() {
        if (this.state.trainingId < trainingInstances.length) {
            setTimeout(() => this.setNextTraining(), 150);
        } else {
            this.isTrained = true;
        }
    }

    setUserAnswer(answer) {
        this.setState((state) => ({
            answer: answer
        }));
    }

    setNextTraining() {
        const trainingCounter = this.state.trainingCounter + 1;
        const trainingId = this.state.trainingId + 1;
        this.setState({
            trainingCounter: trainingCounter,
            trainingId: trainingId,
            trainingInstance: trainingInstances[trainingCounter].instance
        });
    }

    setNextQuestion() {
        const questionCounter = this.state.questionCounter + 1;
        const questionId = this.state.questionId + 1;
        this.setState({
            questionCounter: questionCounter,
            questionId: questionId,
            instance: instances[questionCounter].instance,
            answerOptions: instances[questionCounter].answers,
            answer: ''
        });
    }

    setResult () {
        this.setState({ result: 'Experiment complete!' });
    }

    renderTraining() {
        return (
            <Training
                trainingId={this.state.trainingId}
                trainingInstance={this.state.trainingInstance}
                trainingTotal={trainingInstances.length}
                onNextClicked={this.handleNextClicked}
                classNames={dataset.classNames}
                attributeNames={dataset.attributeNames}
                categoricalNames={dataset.categoricalNames}
            />
        );
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
        if (!this.isTrained) {
            return (
                this.renderTraining()
            )
        } else {
            return (
                this.state.result ? this.renderResult() : this.renderQuiz()
            );
        }
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);