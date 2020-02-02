import React, { Component } from "react";
import Cell from "./Cell";
import "./PathFinding.css";
import { dijkstra, getPath, displayVisitedNodes } from "./algorithm";

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
  console.log("This is grid in function", grid);
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: 200,
    isVisited: false,
    isWeight: false,
    isWall: false,
    previousNode: null
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
};

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
};

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
    this.setState({ grid: grid });
  }
  /*
  clap = (grid, row, col) => {
    const node = grid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall
    };
    grid[row][col] = newNode;
    return 
    }
  }
  */

  handleMouseDown(row, col) {
    // console.log(row)
    // console.log(col)
    var newGrid = [];
    if (this.state.grid[row][col].isFinish) {
      //console.log('stop')
      return;
    } else if (this.state.addingWalls) {
      newGrid = swapWall(this.state.grid, row, col);
      //console.log('swap')
    } else {
      newGrid = swapWeight(this.state.grid, row, col);
    }
    // const newGrid = getWallOrWeight(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
    console.log(this.state.grid[row][col]);
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    var newGrid = [];
    if (this.state.grid[row][col].isFinish) {
      //console.log('stop')
      return;
    } else if (this.state.addingWalls) {
      newGrid = swapWall(this.state.grid, row, col);
    } else {
      newGrid = swapWeight(this.state.grid, row, col);
    }
    this.setState({ grid: newGrid });
    console.log(this.state.grid[row][col]);
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
    //console.log('STOP');
  }

  handleChangeWall() {
    const newBool = !this.state.addingWalls;
    this.setState({ addingWalls: newBool });
    console.log(this.state.message);
  }

  //kinda sketch need to bug
  resetGrid() {
    const grid = getInitialGrid();
    console.log(grid[0][0]);
    this.setState({ grid: grid });
  }

  createPathArr() {
    const bigArray = dijkstra(
      this.state.grid,
      this.state.grid[START_NODE_ROW][START_NODE_COL]
    );
    const shortestPath = getPath(
      this.state.grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    );
    displayVisitedNodes(bigArray);
    console.log("these are my visitedNodes", bigArray);
    console.log("this is my shortest path", shortestPath);
  }

  animateDijkstra(visitedNodesInOrder, shortestPath) {
    const numNodes = visitedNodesInOrder.length
    for (let curNode = 0; curNode <= numNodes; curNode++) {
      if (curNode === numNodes) {
        setTimeout(() => {
          this.animateShortestPath(shortestPath);
        }, 10 * curNode);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[curNode];
        if (curNode === numNodes - 1) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-finish';
        } else if (curNode === 0) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-start';
        } else
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';
      }, 8 * curNode);
    }
  }

  animateShortestPath(nodePath) {
    const pathLength = nodePath.length
    for (let curNode = 0; curNode < pathLength; curNode++) {
      setTimeout(() => {
        const node = nodePath[curNode];
        if (curNode === pathLength - 1) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-finish-found';
        } else if (curNode === 0) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-start';
        } else
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path';
      }, 50 * curNode);
    }
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode);
    const nodesInShortestPathOrder = getPath(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <div>
        <div>
          <h1 className="title">PATHFINDER VISUALIZER</h1>
          <p className="italic">Made by: Dan Lu & Matthew Tam</p>
          <button className="button" onClick={() => this.visualizeDijkstra()}>
            Visualize
          </button>
          <button className="button" onClick={() => this.resetGrid()}>
            Reset
          </button>
          <button className="button" onClick={() => this.handleChangeWall()}>
            Change Wall
          </button>
        </div>
        <div className="grid">
          >
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {
                    row,
                    col,
                    isFinish,
                    isStart,
                    isWeight,
                    isWall,
                  } = node;
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
                      row={row}
                    ></Cell>
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
