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

window.findNRooksSolution = function(n) {
  var board = new Board({n:n});

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (!board.hasAnyRooksConflicts()) {
        board.togglePiece(i, j);
        if (board.hasAnyRooksConflicts()) {
          board.togglePiece(i, j);
        }
      }
    }
  }

  var solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
 
  /* Recursive Answer

  var board = new Board({n:n});
  var rows = board.rows();
  var count = 0;
  var solution = [];
  for (var i = 0; i < n; i++) {
    solution.push([]);
  }

  var addRow = function(row) {
    if (row === n) {
      for (var i = 0; i < n; i++) {
        solution[i] = rows[i].slice();
      }
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(row, i); // put a piece on the board.
        if (board.hasColConflictAt(i)) { // check for any conflicts.
          board.togglePiece(row, i); // take a piece back from the board.
        } else {
          addRow(row + 1); // move to the next row.
          board.togglePiece(row, i); // put a piece on the board.
        }
      }
    }
  };

  addRow(0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
  
  */

};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n:n});
  var rows = board.rows();
  var count = 0;

  var addRow = function(row) {
    if (row === n) {
      count++;
      return;
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(row, i); // put a piece on the board.
        if (board.hasColConflictAt(i)) { // check for any conflicts.
          board.togglePiece(row, i); // take a piece back from the board.
        } else {
          addRow(row + 1); // move to the next row.
          board.togglePiece(row, i); // put a piece on the board.
        }
      }
    }
  };

  addRow(0);

  console.log('Number of solutions for ' + n + ' rooks:', count);
  return count;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});
  var rows = board.rows();
  var solution = [];
  for (var i = 0; i < n; i++) { // set up storage
    solution.push([]);
  }

  var addRow = function(row) {
    if (row === n) { // base-case
      for (var i = 0; i < rows.length; i++) {
        solution[i] = rows[i].slice(); // copying each row to our storage.
      }
    } else {
      for (var c = 0; c < n; c++) { // iterating over columns.
        board.togglePiece(row, c); // put a piece on board.
        if (board.hasAnyQueenConflictsOn(row, c)) { // check for any conflicts.
          board.togglePiece(row, c); // take a piece back from the board.
        } else {
          addRow(row + 1); // move on to next row.
          board.togglePiece(row, c); // removing a piece after testing.
        }
      }
    }
  };

  addRow(0); // start adding pieces at rows.
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n:n});
  var rows = board.rows();
  var n = rows.length;
  var count = 0;

  var addRow = function(row) {
    if (row === n) { // base-case
      count++;
    } else {
      for (var c = 0; c < n; c++) { // iterating over columns.
        board.togglePiece(row, c); // put a piece on board.
        if (board.hasAnyQueenConflictsOn(row, c)) { // check for any conflicts.
          board.togglePiece(row, c); // take a piece back from the board.
        } else {
          addRow(row + 1); // move on to next row.
          board.togglePiece(row, c); // removing a piece after testing.
        }
      }
    }
  };

  addRow(0); // start adding pieces at rows.
  console.log('Number of solutions for ' + n + ' queens:', count);
  return count;
};
