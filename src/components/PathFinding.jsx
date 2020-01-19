import React, { Component } from "react";
import Cell from "./Cell";
import "./PathFinding.css";

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
  console.log("This is grid in function", grid[0]);
  return grid;
};

const wallCheck = (grid, col, row) => {
  if (row > 49 || row < 0 || col > 24 || col < 0) {
    return true;
  } else if (grid[row][col].isBlocked === false) {
    return false;
  } else if (grid[row][col].isWall === true) {
    return true;
  } else return false;
};

const weightCheck = (grid, row, col) => {
  if (grid[row][col].isBlocked === false) {
    return false;
  } else if (grid[row][col].isWall === false) {
    return true;
  } else return false;
};

const neighborValues = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1]
];

nodesToCheck = [];


const addUnvisited = (grid, row, col, dist, heapCurrent) => {
  if (heapCurrent == nodesToCheck.length) {
    nodesToCheck.push([dist, grid[row][col]]);
  } else if (nodesToCheck[heapCurrent][0] == dist) {
    nodesToCheck[heapCurrent].push(grid[row][col]);
  } else if (nodesToCheck[heapCurrent][0] > dist) {
    nodesToCheck.splice([heapCurrent], 0, [dist, grid[row][col]]);
  } else {
    addUnvisited(grid, row, col, dist, heapCurrent + 1);
  }
  const node = grid[row][col];
  const newNode = {
    ...node,
    distance: dist
  };
  grid[row][col] = newNode;
};

function deleteNode(nodesToCheck, row, col) {
  for (heap in nodesToCheck) {
    for (node in nodesToCheck[heap]) {
      if (nodesToCheck[heap][node][0] == row && nodesToCheck[heap][node][1] == col) {
        nodesToCheck = nodesToCheck.splice(nodesToCheck, 1)
      }
    }
  } return nodesToCheck
}

const getNeighbors = (grid, row, col) => {
  tempNeighbors = [];
  for (direction in neighborValues) {
    tempCoordinate = [row + direction[0], col + direction[1]];
    tempNeighbors.push(tempCoordinate);
  }
  for (neighbor in tempNeighbors) {
    finalNeighbors = [];
    if (
      wallCheck(grid, tempNeighbors[neighbor][0], tempneighbor[neighbor][1]) ===
      false
    ) {
      finalNeighbors.push([
        tempNeighbors[neighbor][0],
        tempneighbor[neighbor][1]
      ]);
    }
  }
  return finalNeighbors;
};

const changeDistance = (grid, row, col) => {};
const weight = 3;

function getClosestNode(nodesToCheck) {
  if (nodesToCheck.length == 0) {
    return empty
  } else (nodesToCheck[0][0])
}

function getAllNodes

export function dijkstra(grid, startRow, startCol, endRow, endCol) {
  var currentRow = startRow;
  var currentCol = startCol;
  newGrid = grid;
  while (this.state.done === false) {
    currentNeighbors = getNeighbors(grid, currentRow, currentCol);
    for (neighbor in currentNeighbors) {
      if (weightCheck(newGrid, currentNeighbors[neighbor][0], currentNeighbors[neighbor][1])) {
        nodesToCheck = deleteNode(nodesToCheck, currentNeighbors[neighbor][0], currentNeighbors[neighbor][1]);
        addUnvisited(
          newGrid,
          currentNeighbors[neighbor][0],
          currentNeighbors[neighbor][1],
          grid[currentRow][currentCol].distance + weight,
          0
        );
      } else
        nodesToCheck = deleteNode(nodesToCheck, currentNeighbors[neighbor][0], currentNeighbors[neighbor][1]);
        addUnvisited(
          newGrid,
          currentNeighbors[neighbor][0],
          currentNeighbors[neighbor][1],
          grid[currentRow][currentCol].distance + 1,
          0
        );
    }
    this.setState({ grid: newGrid });
  }
};


var unvisitedNodes = [];
var visitedNodes = [];
var currentNode = [];

const dijkstra = grid => {
  currentNode.push(grid[START_NODE_ROW][START_NODE_COL]);
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
    previousNode: null
  };
};

export default class PathFinding extends Component {
  constructor() {
    super();
    this.state = {
      grid: []
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid: grid });
    console.log(grid[0][0]);
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

  render() {
    const { grid } = this.state;
    return (
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <Cell
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    row={row}
                  ></Cell>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
