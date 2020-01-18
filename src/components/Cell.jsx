import React, {Component} from 'react';

import './Cell.css';

export default class Cell extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      row,
    } = this.props;
    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}>         
      </div>
    );
  }
}
