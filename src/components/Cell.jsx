import React, { Component } from 'react';

import './Cell.css';

export default class Cell extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWeight,
      isWall,
      isVisited,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
        ? 'node-start'
        : isWall
          ? 'node-wall'
          : isWeight
            ? 'node-weight'
            : isVisited
              ? 'node-visited'
              : 'node-normal'
      ;

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}>
      </div>
    );
  }
}
