import React, { Component } from "react";
import Test from '../Experiment/Test';
import Train from '../Experiment/Train';
import Result from '../Experiment/Result';
import TrainConfirm from '../Experiment/TrainConfirm';
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
            trainIdx: [],
            trainSize: 10,
            trainStart: 0,
            trainSeconds: 0,
            testId: 1,
            testCounter: 0,
            testInstance: null,
            testIdx: [],
            testSize: 15,
            testStart: 0,
            testSeconds: 0,
            answers: [],
            responseTime: [],
            answer: '',
            result: '',
            isTrained: false,
            correctCount: 0,
        };

        this.uid = this.props.firebase.auth.currentUser.uid;
        this.email = this.props.firebase.auth.currentUser.email;

        this.fetchData();

        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
        this.handleTrainClicked = this.handleTrainClicked.bind(this);
    }

    componentDidUpdate() {
        this.props.firebase
            .user(this.uid)
            .update({
                'state': this.state,
            });
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
        this.props.firebase.db.ref().child('users').on('value', snapshot => {
            if (snapshot.hasChild(this.uid)) {
                this.props.firebase.db.ref()
                    .child('adult_dataset')
                    .on('value', snapshot1 => {
                        var train = null;
                        const trainIdx = snapshot.child(this.uid).val().state.trainIdx;
                        train = [];
                        for (var i = 0; i < this.state.trainSize; i++) {
                            train.push(snapshot1.val().train[trainIdx[i]]);
                        }

                        var test = null;
                        const testIdx = snapshot.child(this.uid).val().state.testIdx;
                        test = [];
                        for (i = 0; i < this.state.testSize; i++) {
                            test.push(snapshot1.val().test[testIdx[i]]);
                        }
                        
                        this.dataset = {
                            'attributeNames': snapshot1.val().attributeNames,
                            'categoricalNames': snapshot1.val().categoricalNames,
                            'classNames': snapshot1.val().classNames,
                            'train': train,
                            'test': test,
                        };
                        
                        this.setState(snapshot.child(this.uid).val().state);
                    });
            } else {
                this.props.firebase.db.ref()
                    .child('adult_dataset')
                    .on('value', snapshot1 => {
                        var train = null;
                        var trainIdx = null;
                        train = [];
                        trainIdx = [];
                        const trainChoice = this.getChoiceFn(snapshot1.val().train.length);
                        for (var i = 0; i < this.state.trainSize; i++) {
                            const idx = trainChoice();
                            train.push(snapshot1.val().train[idx]);
                            trainIdx.push(idx);
                        }

                        var test = null;
                        var testIdx = null;
                        test = [];
                        testIdx = [];
                        const choice = this.getChoiceFn(snapshot1.val().test.length);
                        for (i = 0; i < this.state.testSize; i++) {
                            const idx = choice();
                            test.push(snapshot1.val().test[idx]);
                            testIdx.push(idx);
                        }
                        
                        this.dataset = {
                            'attributeNames': snapshot1.val().attributeNames,
                            'categoricalNames': snapshot1.val().categoricalNames,
                            'classNames': snapshot1.val().classNames,
                            'train': train,
                            'test': test,
                        };

                        this.setState({
                            isDataFetched: true,
                            trainInstance: this.dataset.train[0].instance,
                            testInstance: this.dataset.test[0].instance,
                            trainIdx: trainIdx,
                            testIdx: testIdx,
                            trainStart: Date.now(),
                        });

                        this.props.firebase
                            .user(this.uid)
                            .set({
                                'email': this.email,
                                'state': this.state,
                            });
                    });
            }
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
            } else if (this.state.trainId === this.dataset.train.length) {
                const trainCounter = this.state.trainCounter + 1;
                const trainId = this.state.trainId + 1;
                this.setState({
                    trainCounter: trainCounter,
                    trainId: trainId,
                });
            } else {
                var trainElapsed = new Date() - this.state.trainStart;
                trainElapsed = Math.round(trainElapsed / 100);
                var trainSeconds = (trainElapsed / 10).toFixed(1);
                this.setState({
                    isTrained: true,
                    testStart: Date.now(),
                    trainSeconds: trainSeconds,
                });
            }
        } else {
            if (this.state.trainId > 1) {
                this.setPrevTrain();
            }
        }
    }

    setUserAnswer(answer) {
        var correctCount = this.state.correctCount;
        var ans = 0;
        if (answer === 'correct') {
            correctCount = correctCount + 1;
            ans = 1;
        }
        var answers = this.state.answers;
        answers.push(ans);

        var responseTime = this.state.responseTime;
        var testElapsed = new Date() - this.state.testStart;
        var testSeconds = 0;
        if (responseTime.length === 0) {
            testElapsed = Math.round(testElapsed / 100);
            testSeconds = (testElapsed / 10).toFixed(1);
            responseTime.push(testSeconds);
        } else {
            var offset = 0.0;
            for (var i = 0; i < responseTime.length; i++) {
                offset = offset + parseFloat(responseTime[i]);
            }
            testElapsed = Math.round(testElapsed / 100);
            testSeconds = ((testElapsed / 10) - offset).toFixed(1);
            responseTime.push(testSeconds);
        }
        this.setState({
            answer: answer,
            correctCount: correctCount,
            answers: answers,
            responseTime: responseTime,
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
        const correctCount = this.state.correctCount;
        const str = 'accuracy: ' + correctCount.toString() + '/' + this.dataset.test.length.toString();
        var testElapsed = new Date() - this.state.testStart;
        testElapsed = Math.round(testElapsed / 100);
        var testSeconds = (testElapsed / 10).toFixed(1);
        this.setState({ 
            result: str,
            testSeconds: testSeconds,
        });
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

    renderTrainConfirm() {
        return (
            <TrainConfirm onTrainClicked={this.handleTrainClicked} />
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
            if (this.state.trainId === this.dataset.train.length + 1) {
                return (
                    this.renderTrainConfirm()
                )
            } else {
                return  (
                    this.renderTrain()
                )
            }
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