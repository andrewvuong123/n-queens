/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


// I: Number of rooks and length of board
// O: A matrix with no conflicts
// E: n < 1, no conflicts. If a rook is placed in a any corner, and rook count is >3 no valid sol exists
window.findNRooksSolution = function(n) {
  //
  // Initialize empty board
  var board = new Board({n: n});
  // If n = 1 return [1]
  if (n === 1) {
    return [[1]];
  }
  // Helper Function takes these inputs:
  //  Row
  //  placedRookCount tracker
  // Var solution here
  var solution;
  var rooksSolver = function(row, placedRookCount) {
    // BASE CASE
    // if placedRookCount === n
    if (placedRookCount === n) {
      //   return solved Matrix
      // .rows returns an array of arrays..
      solution = board.rows();
      return board;
    }
    // iterate through row param
    var rowArr = board.get(row);
    for (var i = 0; i < rowArr.length; i++) {
      // if value at index in row, has no conflicts. Set value to 1 "Placing Rook"
      board.togglePiece(row, i);
      if (!board.hasAnyRooksConflicts()) {
        // place rook into board
        // recurse onto the NEXT row
        var result = rooksSolver(row + 1, placedRookCount + 1);
      } else {
        board.togglePiece(row, i);
      }
    }
    // If no valid placment exists- go up one branch and try again._
    return result;
  };

  // Matrix format
  rooksSolver(0, 0);

  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
