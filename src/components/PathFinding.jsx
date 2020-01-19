import React, {Component} from 'react';
import Cell from './Cell';
import './PathFinding.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 25; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

export default class PathFinding extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      message: "Mouse Event"
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    console.log(grid[0][0]);
    this.setState({grid: grid});
  }


  


  handleEvent = (event) => {
    if (event.type === "mousedown") {
           this.setState({ message: "Mouse Down"});
           console.log(this.state.message)
       } else {
           this.setState({ message: "Mouse Up"});
           console.log(this.state.message)
       }
   }

  render() {
    const {grid} = this.state;
    return (
      <>
        <button className="btn btn-secondary" onMouseDown={ this.handleEvent } onMouseUp={ this.handleEvent } >
          Visualize
        </button>
      <div className="grid">>
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const {row, col, isFinish, isStart, isWall} = node;
                return (
                  <Cell
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    row={row}>
                  </Cell>
                );
              })}
            </div>
          );
        })}
      </div>
      </>
    );
  }
}