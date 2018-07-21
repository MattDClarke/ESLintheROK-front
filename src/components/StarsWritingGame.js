import React, { Component } from "react";
import classNames from 'classnames';
import Card from '../components/Card';
import { handleGameData, handleAnimations, handleKeyEvent, handleReset, handleClasses, handleClick } from '../helpers'
// import '../styles/StarsWritingGame.css';

const xCount = 3;

class StarsWritingGame extends Component {
  constructor(props){
    super(props); 
    this.state = {
      allData: {},
      gameData: [],
      Xs: [],
      clicked: [],
      targetedIds : [],
      colors: ['gold', 'purple', 'darkslateblue', 'aqua', 'teal', 'fuchsia', 'plum', 'olive'],
      height: '25vh',
      targetedId: null,
      handlingClick: false,
      resetting: false,
      isVocab: true,
      abort: false,
      compressor: 1,
    }
    this.handleGameData   = handleGameData.bind(this);
    this.handleKeyEvent   = handleKeyEvent.bind(this);
    this.handleClick      = handleClick.bind(this);
    this.handleClasses    = handleClasses.bind(this);
    this.handleReset      = handleReset.bind(this);
    this.handleAnimations = handleAnimations.bind(this);
  }

  componentDidMount(){
    // document level keypress to handle game hotkeys
    document.addEventListener('keydown', this.handleKeyEvent);
    // copy data from props
    const { data } = this.props;
    const vocabularyData = data.vocabularyData.map(data=>data.text);
    const expressionData = data.expressionData.map(data=>data.text);
    const allData = {vocabularyData, expressionData};
    // returns an array of shuffled data equal to our boxCount variable
    const gameData = this.handleGameData(allData);
    // returns an array of Xs
    const Xs = this._getXs(gameData.length, xCount);
    this.setState({allData, gameData, Xs})
  }

  componentWillUnmount(){
    // document level keypress to handle game hotkeys
    document.removeEventListener('keydown', this.handleKeyEvent)
  }

  _getXs = (dataLength, xCount) => {
    let arr = [];
    // used when our component mounts
    // randomly chooses an 'xCount' amount of numbers
    while(arr.length < xCount){
      const randNum = Math.floor(Math.random()*dataLength);
      if(arr.indexOf(randNum) === -1) arr.push(randNum);
    }
    return arr;
  };
  
  render(){
    const {gameData, Xs, resetting, compressor, colors} = this.state;
    const containerClasses = classNames('elim-container', { resetting });
    const cards = gameData.map((card, i) => {
      const allCardClasses = this.handleClasses(card, i);
      const isX = Xs.includes(i);
      return (
        <Card 
          key={i}
          index={i}
          handleClick={this.handleClick}
          classNames={allCardClasses}
          frontColor={colors[i]}
          frontText={card.text}
          backColor={isX ? 'red' : 'lime'}
          backText={isX ? 'X' : 'O'}
          compressor={compressor}
        />
      );
    });
    return (
      <div className={containerClasses}>
        {cards}
      </div>
    );
  }
}

export default StarsWritingGame;