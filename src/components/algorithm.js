export function dijkstra(grid, startNode) {
  var solved = false;
  const visitedNodes = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (solved === false) {
    sortNodes(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    unvisitedNodes.shift();
    if (wallCheck(closestNode) === true) {
      return visitedNodes;
    }
    if (closestNode.distance === Infinity) {
      return visitedNodes;
    }
    visitedNodes.push(closestNode);
    closestNode.isVisited = true;
    if (closestNode.isFinish) {
      solved = true;
    }
    currentNeighbors = getNeighbors(grid, closestNode);
    for (const neighbor of currentNeighbors) {
      if (neighbor.isWeight === true) {
        if (neighbor.distance > closestNode.distance + weight) {
          neighbor.distance = closestNode.distance + weight;
        }
      } else if (neighbor.distance > closestNode.distance + 1) {
        neighbor.distance = closestNode.distance + 1;
      }
      neighbor.previousNode = closestNode;
    }
  }
  return visitedNodes;
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

const wallCheck = node => {
  if (node.row > 49 || node.row < 0 || node.col > 24 || node.col < 0) {
    return true;
  } else if (node.isWall === true) {
    return true;
  } else return false;
};

const neighborValues = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1]
];

function sortNodes(unvisitedNodes) {
  unvisitedNodes.sort((a, b) => a.distance - b.distance);
}

const getNeighbors = (grid, node) => {
  const tempNeighbors = [];
  for (const direction in neighborValues) {
    const tempNode = grid[node.row + direction[0]][node.col + direction[1]];
    if (tempNode.isVisited === false && tempNode.isWall === false) {
      tempNeighbors.push(tempNode);
    }
    return tempNeighbors;
  }
};
const weight = 3;

function getAllNodes(grid) {
  const nodeArr = [];
  for (row of grid) {
    for (node of row) {
      if (node.isWall === false) {
        nodeArr.push(node);
      }
    }
  }
  return nodeArr;
}
