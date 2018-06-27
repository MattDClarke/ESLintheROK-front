import React from 'react';
import ReactFitText from 'react-fittext';
import './Card.css';

const Card = ({handleClick, name, isX, classNames, frontColor}) => (
  <div className={classNames}>
    <ReactFitText 
      compressor={0.7}
      minFontSize={0}
      maxFontSize={500}
    >
      <div 
        className='front'
        style={{backgroundColor: frontColor}}
        onClick={handleClick}      
      >
        {name}
      </div>
    </ReactFitText>
    <div
      className='back'
      style={{backgroundColor: isX ? 'red' : 'lime'}}
    >
      {isX ? 'X' : 'O'}
    </div>
  </div>
);

export default Card;