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
// If n = 1 return [1]
// Helper Function takes these inputs:
//  Row
//  placedRookCount tracker
// BASE CASE
// if placedRookCount === n
//   return solved Matrix
//

  // iterate through row param
  //   if value at index in row, has no conflicts. Set value to 1 "Placing Rook"
  //   placedRookCount ++
  //      recurse onto the NEXT row
  //

  // If no valid placment exists- go up one branch and try again._



  // Matrix format
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return  format is : Matrix
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
