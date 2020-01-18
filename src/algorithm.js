console.log('hello world')

var mattsWomen = ['woman1', 'woman2']

function womenPrinter(arr) {
    var arrayLen = arr.length;
    for (var i = 0; i < arrayLen; i++) {
            console.log(mattsWomen[i]);
        }
}

womenPrinter(mattsWomen)

function square (xcor, ycor) {
    this.xcor = xcor;
    this.ycor = ycor;
    this.visited = false;
    this.wall = false;
    this.start = false;
    this.endPoint = false;
}

var visitedSquares = []
var unvisitedSquares = []

for (i = 0; i < 50; i++) {
    tempArr = []
    for (j = 0; j < 50; j++) {
        tempArr.push(new square(i, j));
    }
    unvisitedSquares.push(tempArr)
}

function selectStart(xcor, ycor) {
    unvisitedSquares[xcor][ycor].start = true
}

function selectEndPoint(xcor, ycor) {
    unvisitedSquares[xcor][ycor].endPoint = true
}
function makeWall(xcor, ycor) {
    unvisitedSquares[xcor][ycor].wall = true
}

function giveneighbors(xcor, ycor) {
    
}
selectStart(0, 0)
selectEndPoint(49, 49)
makeWall(3, 3)
console.log(unvisitedSquares[0][0].start)
console.log(unvisitedSquares[49][49].endPoint)
console.log(unvisitedSquares[3][3].wall)