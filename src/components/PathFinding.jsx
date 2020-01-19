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
    isWeight: false,
    isWall: false,
    previousNode: null,
  };
};

const swapWeight = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: false,
    isWeight: !node.isWeight
  };
  newGrid[row][col] = newNode;
  return newGrid;
}

const swapWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
    isWeight: false
  };
  newGrid[row][col] = newNode;
  return newGrid;
}

export default class PathFinding extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      message: "Mouse Event",
      addingWalls: true
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    console.log(grid[0][0]);
    this.setState({grid: grid});
  }

  handleMouseDown(row, col) {
    // console.log(row)
    // console.log(col)
    var newGrid = []
    if (this.state.grid[row][col].isFinish) {
      //console.log('stop')
      return;
    } else if (this.state.addingWalls) {
      newGrid = swapWall(this.state.grid, row, col)
      //console.log('swap')
    } else {
      newGrid = swapWeight(this.state.grid, row, col)}
    // const newGrid = getWallOrWeight(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
    console.log(this.state.grid[row][col]);
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    var newGrid = []
    if (this.state.grid[row][col].isFinish) {
      //console.log('stop')
      return;
    } else if (this.state.addingWalls) {
      newGrid = swapWall(this.state.grid, row, col)
    } else {
      newGrid = swapWeight(this.state.grid, row, col)}
    this.setState({grid: newGrid});
    console.log(this.state.grid[row][col]);
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
    //console.log('STOP');
  }

  handleChangeWall () {
    const newBool = !this.state.addingWalls
    this.setState({addingWalls: newBool})
    console.log(this.state.message)
  }

  //kinda sketch need to bug
  resetGrid () {
    const grid = getInitialGrid();
    console.log(grid[0][0]);
    this.setState({grid: grid});
  }

  // visualizeAlg () {
  //   const bigArray = dijkstra(this.state.grid, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL);
  // }

  render() {
    const {grid, mouseIsPressed} = this.state;
    return (
      <div>
      <div>
        <h1 className ="title">PATH FINDER VISUALIZER</h1>
        <p className ="italic">Made by: Dan Lu & Matthew Tam</p>
        <button className="button" onClick={() => this.visualizeAlg() }>
          Visualize
        </button>
        <button className="button" onClick={() => this.resetGrid() }>
          Reset
        </button>
        <button className="button" onClick={() => this.handleChangeWall() }>
          Change Wall
        </button>
      </div>
      <div className="grid">>
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const {row, col, isFinish, isStart, isWeight, isWall} = node;
                return (
                  <Cell
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWeight={isWeight}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                    onMouseEnter={(row, col) =>
                      this.handleMouseEnter(row, col)
                    }
                    onMouseUp={() => this.handleMouseUp()}
                    row={row}>
                  </Cell>
                );
              })}
            </div>
          );
        })}
      </div>
      </div>
    );
  }
}
