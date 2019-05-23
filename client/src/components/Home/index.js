import React, { Component } from "react";
import Quiz from '../Quiz';
import Result from '../Result';
import "./home.css";

import dataset from '../../tempAPI/dataset';
import instances from '../../tempAPI/instances';
import { withAuthorization } from '../Session';

const HomePage = () => (
    <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <Home />
    </div>
);

class Home extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { 
    //         apiResponse: "",
    //         dbResponse: "" 
    //     };
    // }
    
    constructor(props) {
        super(props);
      
        this.state = {
            counter: 0,
            questionId: 1,
            instance: instances[0].instance,
            answerOptions: instances[0].answers,
            answer: '',
            result: ''
        };

        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    }

    // callAPI() {
    //     fetch("http://115.146.92.40:9000/testAPI")
    //         .then(res => res.text())
    //         .then(res => this.setState({ apiResponse: res }))
    //         .catch(err => err);
    // }

    // callDB() {
    //     fetch("http://115.146.92.40:9000/testDB")
    //         .then(res => res.text())
    //         .then(res => this.setState({ dbResponse: res }))
    //         .catch(err => err);
    // }

    // componentDidMount() {
    //     this.callAPI();
    //     this.callDB();
    // }

    // componentDidMount() {
    //     // const shuffledAnswerOptions = instances.map((instance) => this.shuffleArray(instance.answers));
      
    //     this.setState({
    //         instance: instances[0].instance,
    //         answerOptions: shuffledAnswerOptions[0].answers,
    //     });
    // }

    // shuffleArray(array) {
    //     var currentIndex = array.length, temporaryValue, randomIndex;
      
    //     // While there remain elements to shuffle...
    //     while (0 !== currentIndex) {
      
    //         // Pick a remaining element...
    //         randomIndex = Math.floor(Math.random() * currentIndex);
    //         currentIndex -= 1;
        
    //         // And swap it with the current element.
    //         temporaryValue = array[currentIndex];
    //         array[currentIndex] = array[randomIndex];
    //         array[randomIndex] = temporaryValue;
    //     }
      
    //     return array;
    // };

    handleAnswerSelected(event) {
        this.setUserAnswer(event.currentTarget.value);
        if (this.state.questionId < instances.length) {
            setTimeout(() => this.setNextQuestion(), 300);
        } else {
            setTimeout(() => this.setResult(), 300);
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
            // <div className="App">
            //     <header className="App-header">
            //         <img src={logo} className="App-logo" alt="logo" />
            //         <p>
            //             Edit <code>src/App.js</code> and save to reload.
            //         </p>
            //         <a
            //         className="App-link"
            //         href="https://reactjs.org"
            //         target="_blank"
            //         rel="noopener noreferrer"
            //         >
            //             Learn React
            //         </a>
            //     </header>
            //     <p className="App-intro">{this.state.apiResponse}</p>
            //     <p className="App-intro">{this.state.dbResponse}</p>
            // </div>
            
            this.state.result ? this.renderResult() : this.renderQuiz()
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);