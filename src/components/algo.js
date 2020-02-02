function getAllNodes(grid) {
  const nodes = []
  for (const row of grid) {
    for (const node of grid) {
      nodes.push(node)
    }
  }
  return nodes
}

const neighborValues = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1]
];


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

const wallCheck = (grid, col, row) => {
  if (row > 49 || row < 0 || col > 24 || col < 0) {
    return true;
  } else if (grid[row][col].isBlocked === false) {
    return false;
  } else if (grid[row][col].isWall === true) {
    return true;
  } else return false;
};

function weightCheck(grid, row, col) {
  if (grid[row][col].isBlocked === false) {
    return false;
  } else if (grid[row][col].isWall === false) {
    return true;
  } else return false;
};
