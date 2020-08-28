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
  // Initialize empty board
  var board = new Board({n: n});

  // Helper Function with input for row:
  var rookSolver = function(row) {
    // BASE CASE if reach the end of the board
    if (row === n) {
      // .rows returns all the rows in the matrix
      return board.rows();
    }
    // iterate through length of row (n)
    for (var i = 0; i < n; i++) {
      // if column at row has no conflicts, toggle piece onto board
      board.togglePiece(row, i);
      if (!board.hasAnyRooksConflicts()) {
        // recurse onto the NEXT row
        var result = rookSolver(row + 1);
      } else {
        // if theres a conflict, remove the piece
        board.togglePiece(row, i);
      }
    }
    // if no valid placment exists, backtrack
    return result;
  };

  // Matrix format
  var solution = rookSolver(0, 0);

  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // Initialize empty board
  var board = new Board({n: n});
  var solutionCount = 0;

  // Helper Function with input for row:
  var rookCountSolver = function(row) {
    // BASE CASE if we get to the end of the board
    if (row === n) {
      // found a valid solution, increment
      solutionCount ++;
      return;
    }
    // iterate through length of row
    for (var i = 0; i < n; i++) {
      // toggle piece onto board
      board.togglePiece(row, i);
      // if there are no conflicts once placed
      if (!board.hasAnyRooksConflicts()) {
        // recurse onto the next row
        rookCountSolver(row + 1);
      }
      // if theres a conflict, remove the piece
      board.togglePiece(row, i);
    }
  };
  // call the helper fcn
  rookCountSolver(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // initialize new board
  var board = new Board({n: n});
  var result;

  // if n is 0, then return the empty matrix
  if (n === 0) {
    return board.rows();
  }
  // helper fcn
  var queenSolver = function(row) {
    // Base Case: if we reach end of board and if there are no conflicts, return the rows
    if (row === n && !board.hasAnyQueensConflicts()) {
      return board.rows();
    }
    // loop through each position
    for (let col = 0; col < n; col++) {
      // toggle piece onto board
      board.togglePiece(row, col);
      // check if constraints are satisfied
      if (!board.hasAnyQueenConflictsOn(row, col)) {
        // set variable result (travel back up the stack) and recurse on next row
        result = queenSolver(row + 1);
        // if none are valid in the row, backtrack and remove the prev row piece
        if (result === undefined) {
          board.togglePiece(row, col);
        }
      } else {
        // toggle piece out if not satisfied
        board.togglePiece(row, col);
      }
    }
    // return result
    return result;
  };
  // set solution to result of call to helper fcn, if no solution was found return the empty board
  var solution = queenSolver(0) || board.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // initialize new board
  var board = new Board({n: n});
  var solutionCount = 0;
  // if n is 0, then return an empty matrix
  if (n === 0) {
    solutionCount ++;
    return solutionCount;
  }
  var queenCountSolver = function(row) {
    // Base Case: if we reach end of board and if there are no conflicts, a solution is found
    if (row === n && !board.hasAnyQueensConflicts()) {
      solutionCount ++;
      return;
    }
    // loop through each position
    for (let col = 0; col < n; col++) {
      // toggle piece onto board
      board.togglePiece(row, col);
      // check if constraints are satisfied
      if (!board.hasAnyQueenConflictsOn(row, col)) {
        // set variable result (travel back up the stack) and recurse on next row
        result = queenCountSolver(row + 1);
        // if none are valid in the row, backtrack and remove the prev row piece
        if (result === undefined) {
          board.togglePiece(row, col);
        }
      } else {
        // toggle piece out if not satisfied
        board.togglePiece(row, col);
      }
    }
  };

  queenCountSolver(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
