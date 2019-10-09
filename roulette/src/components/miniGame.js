import React, { Component } from 'react';

class MiniGame extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const {guesses, handleGuess, miniGame, hasToBeVisible} = this.props;

    const uniqueRolls = new Set(guesses);

    let uniqueRollsStr = Array(...uniqueRolls).join(', ');

    return (
        <div className="MiniGame">
        {hasToBeVisible ?
            <div>
                <span>
                    You've reached a minigame where you can earn extra money. <br></br> Out of your last five unique guesses guess the one we chose and earn $100, the rolls are {uniqueRollsStr} <br></br>
                </span> 
                <input 
                    type="number" name="miniGameGuess" min="0" max="35" autoComplete="off" required onChange={handleGuess}>
                </input> 
                <button onClick={miniGame}>Play</button>
            </div> : null
        } 
        </div>
    );
  }
}

export default MiniGame;


