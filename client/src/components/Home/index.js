import React, { Component } from "react";
import Quiz from '../Quiz';
import Training from '../Training';
import Result from '../Result';
import "./home.css";
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';

const HomePage = () => (
    <Home />
);

class HomeBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDataFetched: false,
            isTrainingDataFetched: false,
            trainingCounter: 0,
            trainingId: 1,
            trainingInstance: null,
            questionId: 1,
            questionCounter: 0,
            instance: null,
            answer: '',
            result: '',
            isTrained: false,
            answerCount: 0,
        };

        this.trainingSize = 10;
        this.size = 5;

        this.fetchData();

        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
        this.handleTrainingClicked = this.handleTrainingClicked.bind(this);
    }

    fetchData() {
        this.props.firebase.db.ref().child('dataset')
            .on('value', snapshot => {
                this.dataset = snapshot.val();
            });
        this.props.firebase.db.ref().child('trainingInstances')
            .on('value', snapshot => {
                this.trainingInstances = snapshot.val();
                this.setState({
                    isTrainingDataFetched: true,
                    trainingInstance: this.trainingInstances[0].instance,
                });
            });
        this.props.firebase.db.ref().child('instances')
            .on('value', snapshot => {
                this.instances = snapshot.val();
                this.setState({
                    isDataFetched: true,
                    instance: this.instances[0].instance,
                });
            });
    }

    handleAnswerSelected(event) {
        this.setUserAnswer(event.currentTarget.value);
        if (this.state.questionId < this.instances.length) {
            setTimeout(() => this.setNextQuestion(), 150);
        } else {
            setTimeout(() => this.setResult(), 150);
        }
    }

    handleTrainingClicked(event) {
        const isNext = event.currentTarget.value;
        if (isNext === 'true') {
            if (this.state.trainingId < this.trainingInstances.length) {
                this.setNextTraining();
            } else {
                this.setState({
                    isTrained: true
                });
            }
        } else {
            if (this.state.trainingId > 1) {
                this.setPrevTraining();
            }
        }
    }

    setUserAnswer(answer) {
        var answerCount = this.state.answerCount;
        if (answer === 'correct') {
            answerCount = answerCount + 1;
        }
        this.setState({
            answer: answer,
            answerCount: answerCount
        });
    }

    setPrevTraining() {
        const trainingCounter = this.state.trainingCounter - 1;
        const trainingId = this.state.trainingId - 1;
        this.setState({
            trainingCounter: trainingCounter,
            trainingId: trainingId,
            trainingInstance: this.trainingInstances[trainingCounter].instance
        });
    }

    setNextTraining() {
        const trainingCounter = this.state.trainingCounter + 1;
        const trainingId = this.state.trainingId + 1;
        this.setState({
            trainingCounter: trainingCounter,
            trainingId: trainingId,
            trainingInstance: this.trainingInstances[trainingCounter].instance
        });
    }

    setNextQuestion() {
        const questionCounter = this.state.questionCounter + 1;
        const questionId = this.state.questionId + 1;
        this.setState({
            questionCounter: questionCounter,
            questionId: questionId,
            instance: this.instances[questionCounter].instance,
            answer: ''
        });
    }

    setResult () {
        const answerCount = this.state.answerCount;
        const str = 'accuracy: ' + answerCount.toString() + '/' + this.instances.length.toString();
        this.setState({ result: 'Experiment complete! ' + str });
    }

    renderTraining() {
        return (
            <Training
                trainingId={this.state.trainingId}
                trainingInstance={this.state.trainingInstance}
                trainingTotal={this.trainingInstances.length}
                onTrainingClicked={this.handleTrainingClicked}
                classNames={this.dataset.classNames}
                attributeNames={this.dataset.attributeNames}
                categoricalNames={this.dataset.categoricalNames}
            />
        );
    }

    renderQuiz() {
        return (
            <Quiz
                answer={this.state.answer}
                questionId={this.state.questionId}
                instance={this.state.instance}
                questionTotal={this.instances.length}
                onAnswerSelected={this.handleAnswerSelected}
                classNames={this.dataset.classNames}
                attributeNames={this.dataset.attributeNames}
                categoricalNames={this.dataset.categoricalNames}
            />
        );
    }
      
    renderResult() {
        return (
            <Result quizResult={this.state.result} />
        );
    }

    render() {
        if (!this.state.isDataFetched || !this.state.isTrainingDataFetched) {
            return ''
        } else if (!this.state.isTrained) {
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

const Home = compose(
    withAuthorization(condition),
    withFirebase,
)(HomeBase);

export default HomePage;