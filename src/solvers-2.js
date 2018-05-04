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
  var solution = undefined; //fixme
  
  var board = new Board({n:n});
  for (var row = 0; row < n; row++) {
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
        board.togglePiece(row, col);
      }
    }
  }

  solution = board.rows();

  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var tried = {}; // row:col
  var row = 0;
  var size = n;
// debugger;  
  var addToTried = function(row,col) {
    if(tried.hasOwnProperty([row,col])) {
      tried[row,col] = tried[row,col] + 1;
    } else {
      tried[row,col] = 1;
    }
  }
  var alreadyTried = function(row, col) {
    if (tried.hasOwnProperty([row,col]) && tried[[row,col]] === n) {
      return true;
    }
    else {
      return false;
    }
  }
debugger;
  // need to recurse n times
  // for(var i = 0; i < n; i++) {
    var recurse = function(board, row) {
      if(n === 1) {
        solutionCount = solutionCount + 1;
        return;
      }
      if (row === n) {
        solutionCount = solutionCount + 1;
        return;
      }
      for (var col = 0; col < n; col++) {
        if(board._isInBounds(row, col)) {
          board.togglePiece(row, col);
          //if (!board.hasAnyRooksConflicts() || !alreadyTried(row, col)) {
          if (!board.hasAnyRooksConflicts()) {  
             // tried[row] = col;
             addToTried(row,col);
             // recurse(board, row = row + 1);
             // recurse(board, row);
          } else if(alreadyTried(row, col)) {
             recurse(board, ++row);
          } else {
            board.togglePiece(row, col); // & continue w/ for loop
            if(col === n - 1) {
              recurse(board, ++row); 
            }
          }
        } else {
          return;
        }
      }
    }
    
    var board = new Board({n:size});
    recurse(board, row);
    
    // return solutionCount;
  // }

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
