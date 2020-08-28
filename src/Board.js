// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    //I: rowIndex: Integer that relates to what row index  we are at
    //O Boolean True if more than 1 Q, false if 1 < Q
    hasRowConflictAt: function(rowIndex) {
    // Get the row in the Matrix
      var currentRow = this.get(rowIndex);
      // Create count variable
      var count = 0;
      // iterate through the row array
      for (var i = 0; i < currentRow.length; i++) {
        // If theres a rook in the row
        if (currentRow[i] === 1) {
          // Increase the count by 1
          count++;
        }
      }
      // If the count is greater than one there is a conflict, return TRUE
      return !!(count > 1);
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // Get the length of the board
      if (this.get('n') !== 0) {
        var boardLength = this.get(0).length;
        // iterate through the length
        for (var i = 0; i < boardLength; i++) {
          // If calling hasRow at any row, return true, because there is a conflict in the specific row
          if (this.hasRowConflictAt(i)) {
            return true;
          }
        }
      }
      return false;
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // Get the board length of the Matrix
      var boardLength = this.get(0).length;
      // Create count variable
      var count = 0;
      var row;
      // iterate through the length of the board
      for (var i = 0; i < boardLength; i++) {
        // get each row array
        row = this.get(i);
        // If Value in row@colIndex is 1
        if (row[colIndex] === 1) {
          // Increase the count by 1
          count++;
        }
      }
      // If the count is greater than one there is a conflict, return TRUE
      return !!(count > 1);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // Get the length of the board
      if (this.get('n') !== 0) {
        var boardLength = this.get(0).length;
        // iterate through the length
        for (var i = 0; i < boardLength; i++) {
          // If calling hasCol at any col, return true, because there is a conflict in the specific col
          if (this.hasColConflictAt(i)) {
            return true;
          }
        }
      }
      return false;
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict

    //I: Integer
    //O: Boolean
    //E: If input is NEGATIVE number
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // get length of board
      var n = this.get(0).length;
      // counter helper
      var counter = 0;
      var row;
      // If input is a negative number
      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        for (var i = 0; i < n; i++ ) {
          // Get each row
          row = this.get(i);
          // Check diagonal position at row
          if (row[majorDiagonalColumnIndexAtFirstRow + i] === 1) {
            // if 1 count ++
            counter++;
          }
        }
      } else {
        // Iterate over length of array - col
        for (var i = 0; i < n - majorDiagonalColumnIndexAtFirstRow; i++ ) {
          // Get current row
          var row = this.get(i);
          // Check current diagonal position at row
          if (row[majorDiagonalColumnIndexAtFirstRow + i] === 1) {
            // if theres a rook in that position, increment counter
            counter++;
          }
        }
      }
      //If counter > 1 return true;
      return !!(counter > 1);
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // Get Board length
      if (this.get('n') !== 0) {
        var n = this.get(0).length;
        // Iterate over matrix starting at i = 0-n/2
        for (var i = (0 - Math.ceil(n / 2)); i < n; i++) {
          // if hasMajorDiagonalConflictAt
          if (this.hasMajorDiagonalConflictAt(i)) {
            // return true;
            return true;
          }
        }
      }
      return false;
    },


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // var for length of matrix
      var boardLength = this.get(0).length;
      // var for counter
      var counter = 0;
      var row;
      // Iterate over board length
      for (var i = 0; i < boardLength; i++) {
        // get current row
        row = this.get(i);
        // check curr diagonal position at row
        if (row[minorDiagonalColumnIndexAtFirstRow - i] === 1) {
          // increment counter if theres a rook
          counter ++;
        }
      }
      // if counter > 1, return true
      return !!(counter > 1);
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // Get Board length
      if (this.get('n') !== 0) {
        var n = this.get(0).length;
        // reassign n to go beyond board for lower diagonals
        n = n + Math.ceil(n / 2);
        //Iterate over matrix
        for (var i = 1; i < n; i++) {
          // if hasMinorDiagonalConflictAt
          if (this.hasMinorDiagonalConflictAt(i)) {
            // return true;
            return true;
          }
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
