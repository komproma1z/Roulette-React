import React, { Component } from 'react';
import MiniGame from './components/miniGame';
import './App.css';

let miniGame = false;

const defaultState = {
    balance: 200,
    bet: '',
    bets: [],
    guess: '',
    guesses: [],
    successfulGuesses: [],
    rolls: [],
    result: '',
    hasToBeVisible: miniGame,
    winRate: 0,
    miniGameTrigger: true,
};

class Roulette extends Component {
    constructor(props) {
        super(props);
        this.state = {...defaultState};
    }

    handleChange = key => event => this.setState({[key]: parseInt(event.target.value)});

    handleBet = this.handleChange('bet'); 

    handleGuess = this.handleChange('guess');

    handleSubmit = event => {

        let roll = Math.floor(Math.random() * 36);

        let balance = this.state.balance;

        const guesses = [...this.state.guesses, this.state.guess];

        const successfulGuesses = [...this.state.successfulGuesses];

        const rollResult = roll === this.state.guess;

        balance = rollResult ? balance + this.state.bet*36 : balance - this.state.bet;

        if (balance <= 0) {
            this.setState({...defaultState, result: 'You lost, new game\'s started'});
        } else {
            if (rollResult) {
                successfulGuesses.push(this.state.guess);
                this.setState({rolls: [...this.state.rolls, roll], guesses: [...this.state.guesses, this.state.guess], successfulGuesses: [...this.state.successfulGuesses, this.state.guess], winRate: Math.floor(successfulGuesses.length/guesses.length*100), result: 'You won', balance})
        } else {
            this.setState({rolls: [...this.state.rolls, roll], guesses: [...this.state.guesses, this.state.guess], result: 'Your bet didn\'t play', winRate: Math.floor(successfulGuesses.length/guesses.length*100), balance})
            }
        }

    const uniqueRolls = new Set(guesses);

    if (uniqueRolls.size === 5 && this.state.miniGameTrigger) {
        miniGame = true;
        this.setState({hasToBeVisible: miniGame, miniGameTrigger: false})
    }

    event.preventDefault();
  }

    miniGame = () => {
        const uniqueRolls = new Set(this.state.guesses);
        let miniGameAnswer = Array(...uniqueRolls)[Math.floor(Math.random() * 4)];
        let guess = parseInt(this.state.guess);

        miniGame = Object.freeze(false);

        if (guess === miniGameAnswer) {
            this.setState({balance: this.state.balance + 100, guesses: [...this.state.guesses, this.state.guess], hasToBeVisible: miniGame});
        } else {
            this.setState({guesses: [...this.state.guesses, this.state.guess], hasToBeVisible: miniGame});
        }
    }

  render() {
    const { balance, guess, bet } = this.state;

    return (
        <div className="App" style={body}>
            <form onSubmit={this.handleSubmit}>
                Balance: <input type="number" name="balance" autoComplete="off" value={balance} readOnly></input><br></br>
                Bet: <input type="number" name="bet" autoComplete="off" required onChange={this.handleBet} value={bet}></input><br></br>
                Number: <input type="number" name="guess" min="0" max="35" autoComplete="off" required onChange={this.handleGuess} value={guess}></input>
                <input type='submit' value='Roll' className="btn" style={null}></input>
            </form>
        <div>
            {this.state.result}{this.state.rolls.length > 0 ? <span>, Roulette played: {this.state.rolls[this.state.rolls.length-1]}</span> : null } <br></br> Win rate: {this.state.winRate >= 0 ? <span>{this.state.winRate}%</span> : <span>0%</span>}
        </div>
        <br></br>
        <MiniGame guesses={this.state.guesses} handleGuess={this.handleGuess} miniGame={this.miniGame} hasToBeVisible={this.state.hasToBeVisible}/>
        </div>
        );
    }
}

const body = {
    display: 'flex',
    flexDirection: 'column',
}

export default Roulette;