export function dijkstra(grid, startNode) {
  const visitedNodes = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  var closestNode = [];
  console.log(unvisitedNodes);
  while (!!unvisitedNodes.length) {
    sortNodes(unvisitedNodes);
    console.log(unvisitedNodes.length);
    closestNode = getClosestNode(unvisitedNodes);
    console.log(unvisitedNodes.length);
    console.log(closestNode.distance);
    if (closestNode.distance === 200) {
      console.log("IMPOSSIBLE!", unvisitedNodes);
      return visitedNodes;
    }
    visitedNodes.push(closestNode);
    closestNode.isVisited = true;
    if (closestNode.isFinish === true) {
      console.log("wuh");
      return visitedNodes;
    }
    var currentNeighbors = getNeighbors(grid, closestNode);
    for (const neighbor of currentNeighbors) {
      if (neighbor.isWeight === true) {
        if (neighbor.distance > closestNode.distance + weight) {
          neighbor.distance = closestNode.distance + weight;
          console.log("heavy");
        }
      } else if (neighbor.distance > closestNode.distance + 1) {
        neighbor.distance = closestNode.distance + 1;
      }
      neighbor.previousNode = closestNode;
    }
    console.log("these are the neighbors", currentNeighbors);
  }
  return visitedNodes;
}

export function getPath(endNode) {
  const nodeArr = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    nodeArr.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodeArr;
}

const getClosestNode = nodeArr => {
  return nodeArr.shift();
};

const wallCheck = (grid, row, col) => {
  if (row > 24 || row < 0 || col > 49 || col < 0) {
    return true;
  } else if (grid[row][col].isWall === true) {
    return true;
  } else return false;
};

function sortNodes(unvisitedNodes) {
  unvisitedNodes.sort((NodeA, NodeB) => NodeA.distance - NodeB.distance);
}

function getNeighbors(grid, node) {
  var tempNeighbors = [];
  var tempNode = [];
  const neighborValues = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1]
  ];
  for (var direction of neighborValues) {
    if (
      wallCheck(grid, node.row + direction[0], node.col + direction[1]) ===
      false
    ) {
      tempNode = grid[node.row + direction[0]][node.col + direction[1]];
      if (tempNode.isVisited === false) {
        tempNeighbors.push(tempNode);
      }
    }
  }
  return tempNeighbors;
}
const weight = 3;

function getAllNodes(grid) {
  const nodeArr = [];
  for (const row of grid) {
    for (const node of row) {
      if (node.isWall === false) {
        nodeArr.push(node);
      } else {
        console.log("wtf");
      }
    }
  }
  return nodeArr;
}

export function displayVisitedNodes(nodeArr) {
  for (const node of nodeArr) {
    console.log(node.isVisited)
  }
}
