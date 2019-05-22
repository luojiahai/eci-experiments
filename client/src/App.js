import React, { Component } from "react";
import Quiz from './components/Quiz';
import Result from './components/Result';
import logo from "./svg/logo.svg";
import "./App.css";

import quizQuestions from './tempAPI/quizQuestions';

class App extends Component {
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
            question: '',
            answerOptions: [],
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

    componentDidMount() {
        // const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));
        const answerOptions = quizQuestions.map((question) => question.answers);   
      
        this.setState({
            question: quizQuestions[0].question,
            answerOptions: answerOptions[0]
        });
    }

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
        if (this.state.questionId < quizQuestions.length) {
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
            question: quizQuestions[counter].question,
            answerOptions: quizQuestions[counter].answers,
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
                question={this.state.question}
                questionTotal={quizQuestions.length}
                onAnswerSelected={this.handleAnswerSelected}
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
            
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>ECI-EXPERIMENTS</h2>
                </div>
                {this.state.result ? this.renderResult() : this.renderQuiz()}
            </div>
        );
    }
}

export default App;
