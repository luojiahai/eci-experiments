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
            trainIdx: [],
            testId: 1,
            testCounter: 0,
            testInstance: null,
            testIdx: [],
            answers: [],
            answer: '',
            result: '',
            isTrained: false,
            answerCount: 0,
        };

        this.uid = this.props.firebase.auth.currentUser.uid;
        this.email = this.props.firebase.auth.currentUser.email;

        this.trainSize = 10;
        this.size = 5;

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
                        for (var i = 0; i < this.trainSize; i++) {
                            
                            train.push(snapshot1.val().train[trainIdx[i]]);
                        }

                        var test = null;
                        const testIdx = snapshot.child(this.uid).val().state.testIdx;
                        test = [];
                        for (i = 0; i < this.size; i++) {
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
                        for (var i = 0; i < this.trainSize; i++) {
                            const idx = trainChoice();
                            train.push(snapshot1.val().train[idx]);
                            trainIdx.push(idx);
                        }

                        var test = null;
                        var testIdx = null;
                        test = [];
                        testIdx = [];
                        const choice = this.getChoiceFn(snapshot1.val().test.length);
                        for (i = 0; i < this.size; i++) {
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