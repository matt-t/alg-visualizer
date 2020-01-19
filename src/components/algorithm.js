  const wallCheck = node => {
    if (row > 49 || row < 0 || col > 24 || col < 0) {
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
    return unvisitedNodes.sort((a, b) => a.distance - b.distance)
  }

  const getNeighbors = (grid, node) => {
    tempNeighbors = [];
    for (const direction in neighborValues) {
      tempNode = grid[node.row + direction[0]][node.col + direction[1]];
      if (tempNode.isVisited === false && tempNode.isWall === false) {
        tempNeighbors.push(tempNode);
      }
    return tempNeighbors
    }

  const weight = 3;

  function getClosestNode(unvisitedNodes) {
    return unvisitedNodes.shift()
  }

  function getAllNodes(grid) {
    nodeArr = []
    for (const row in grid) {
      for (const col in grid[row]) {
        if (grid[row][col].isWall === false) {
          nodeArr.push(grid[row][col]);
      }
    }
  }

  export function dijkstra(grid, startNode) {
    const solved = false
    const visitedNodes = [];
    startNode.distance = 0
    const unvisitedNodes = getAllNodes(grid);
    while (solved === false) {
      unvisitedNodes = sortNodes(unvisitedNodes)
      const closestNode = getClosestNode(unvisitedNodes)
      unvisitedNodes.shift()
      if (wallCheck(closestNode) === true) {
        return visitedNodes
      }
      if (closestNode.distance === Infinity) {
        return visitedNodes
      }
      visitedNodes.push(closestNode)
      closestNode.isVisited = true
      if (closestNode.isFinish) {
        solved = true
      }
      currentNeighbors = getNeighbors(grid, closestNode);
      for (neighbor of currentNeighbors) {
        if (neighbor.isWeight === true) {
          if (neighbor.distance > closestNode.distance + weight) {
            neighbor.distance = closestNode.distance + weight
          }
        } else if (neighbor.distance > closestNode.distance + 1) {
          neighbor.distance = closestNode.distance + 1
        }
        neighbor.previousNode = closestNode
      }
    }
    return visitedNodes
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