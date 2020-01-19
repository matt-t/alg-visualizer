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
      if (
        nodesToCheck[heap][node][0] == row &&
        nodesToCheck[heap][node][1] == col
      ) {
        nodesToCheck = nodesToCheck.splice(nodesToCheck, 1);
      }
    }
  }
  return nodesToCheck;
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

const weight = 3;

function getClosestNode(nodesToCheck) {
  if (nodesToCheck.length == 1) {
    return false;
  } else nodesToCheck[0][0];
}

function getAllNodes(grid) {
  for (row in grid) {
    for (col in grid) {
      addUnvisited(grid, row, col, Infinity, 0);
    }
  }
}

export function dijkstra(grid, startRow, startCol, endRow, endCol) {
  var currentRow = startRow;
  var currentCol = startCol;
  var visitedNodes = [];
  var nodesToCheck = getAllNodes(grid);
  newGrid = grid;
  while (this.state.done === false) {
    currentNeighbors = getNeighbors(grid, currentRow, currentCol);
    for (neighbor in currentNeighbors) {
      if (
        weightCheck(
          newGrid,
          currentNeighbors[neighbor][0],
          currentNeighbors[neighbor][1]
        )
      ) {
        nodesToCheck = deleteNode(
          nodesToCheck,
          currentNeighbors[neighbor][0],
          currentNeighbors[neighbor][1]
        );
        addUnvisited(
          newGrid,
          currentNeighbors[neighbor][0],
          currentNeighbors[neighbor][1],
          grid[currentRow][currentCol].distance + weight,
          0
        );
      } else
        nodesToCheck = deleteNode(
          nodesToCheck,
          currentNeighbors[neighbor][0],
          currentNeighbors[neighbor][1]
        );
      addUnvisited(
        newGrid,
        currentNeighbors[neighbor][0],
        currentNeighbors[neighbor][1],
        grid[currentRow][currentCol].distance + 1,
        0
      );
    }
    if (getClosestNode === false) {
      this.setState({ done: true });
    } else if (newGrid[currentRow][currentCol].isFinish == true) {
      this.setState({ done: true });
    } else {
      visitedNodes.push([[currentRow], [currentCol]]);
      currentRow = getClosestNode[0];
      currentCol = getClosestCol[1];
      console.log("lol");
    }
  }
}
