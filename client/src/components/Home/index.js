import React, { Component } from "react";
import Test from '../Test';
import Train from '../Train';
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
            trainCounter: 0,
            trainId: 1,
            trainInstance: null,
            testId: 1,
            testCounter: 0,
            testInstance: null,
            answer: '',
            result: '',
            isTrained: false,
            answerCount: 0,
        };

        this.trainSize = 10;
        this.size = 5;

        this.fetchData();

        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
        this.handleTrainClicked = this.handleTrainClicked.bind(this);
    }

    getChoiceFn(size) {
        var bucket = [];

        for (var i = 0; i < size; i++) {
            bucket.push(i);
        }

        function getRandomFromBucket() {
            var randomIndex = Math.floor(Math.random() * bucket.length);
            return bucket.splice(randomIndex, 1)[0];
        }

        return getRandomFromBucket
    }

    fetchData() {
        this.props.firebase.db.ref()
            .child('adult_dataset')
            .on('value', snapshot => {
                var train = null;
                if (snapshot.val().train.length < this.trainSize) {
                    train = snapshot.val().train;
                } else {
                    train = []
                    const trainChoice = this.getChoiceFn(snapshot.val().train.length);
                    for (var i=0; i < this.trainSize; i++) {
                        const idx = trainChoice();
                        train.push(snapshot.val().train[idx]);
                    }
                }

                var test = null;
                if (snapshot.val().test.length < this.size) {
                    test = snapshot.val().test;
                } else {
                    test = []
                    const choice = this.getChoiceFn(snapshot.val().test.length);
                    for (var i = 0; i < this.size; i++) {
                        const idx = choice();
                        test.push(snapshot.val().test[idx]);
                    }
                }
                
                this.dataset = {
                    'attributeNames': snapshot.val().attributeNames,
                    'categoricalNames': snapshot.val().categoricalNames,
                    'classNames': snapshot.val().classNames,
                    'train': train,
                    'test': test,
                };

                this.setState({
                    isDataFetched: true,
                    trainInstance: this.dataset.train[0].instance,
                    testInstance: this.dataset.test[0].instance,
                });
            });
    }

    handleAnswerSelected(event) {
        this.setUserAnswer(event.currentTarget.value);
        if (this.state.testId < this.dataset.test.length) {
            setTimeout(() => this.setNextTest(), 150);
        } else {
            setTimeout(() => this.setResult(), 150);
        }
    }

    handleTrainClicked(event) {
        const isNext = event.currentTarget.value;
        if (isNext === 'true') {
            if (this.state.trainId < this.dataset.train.length) {
                this.setNextTrain();
            } else {
                this.setState({
                    isTrained: true
                });
            }
        } else {
            if (this.state.trainId > 1) {
                this.setPrevTrain();
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

    setPrevTrain() {
        const trainCounter = this.state.trainCounter - 1;
        const trainId = this.state.trainId - 1;
        this.setState({
            trainCounter: trainCounter,
            trainId: trainId,
            trainInstance: this.dataset.train[trainCounter].instance
        });
    }

    setNextTrain() {
        const trainCounter = this.state.trainCounter + 1;
        const trainId = this.state.trainId + 1;
        this.setState({
            trainCounter: trainCounter,
            trainId: trainId,
            trainInstance: this.dataset.train[trainCounter].instance
        });
    }

    setNextTest() {
        const testCounter = this.state.testCounter + 1;
        const testId = this.state.testId + 1;
        this.setState({
            testCounter: testCounter,
            testId: testId,
            testInstance: this.dataset.test[testCounter].instance,
            answer: ''
        });
    }

    setResult () {
        const answerCount = this.state.answerCount;
        const str = 'accuracy: ' + answerCount.toString() + '/' + this.dataset.test.length.toString();
        this.setState({ result: 'Experiment complete! ' + str });
    }

    renderTrain() {
        return (
            <Train
                trainId={this.state.trainId}
                trainInstance={this.state.trainInstance}
                trainTotal={this.dataset.train.length}
                onTrainClicked={this.handleTrainClicked}
                classNames={this.dataset.classNames}
                attributeNames={this.dataset.attributeNames}
                categoricalNames={this.dataset.categoricalNames}
            />
        );
    }

    renderTest() {
        return (
            <Test
                answer={this.state.answer}
                testId={this.state.testId}
                testInstance={this.state.testInstance}
                testTotal={this.dataset.test.length}
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
        if (!this.state.isDataFetched) {
            return ''
        } else if (!this.state.isTrained) {
            return (
                this.renderTrain()
            )
        } else {
            return (
                this.state.result ? this.renderResult() : this.renderTest()
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