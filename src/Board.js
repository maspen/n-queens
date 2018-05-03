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
    hasRowConflictAt: function(rowIndex) {
      var count = 0;
      for (let k = 0; k < this.rows()[rowIndex].length; k++) {
        if (this.rows()[rowIndex][k] === 1) {
          count++;
          if (count === 2) {
            return true;
          }
        }
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var count;
// debugger;
      for (let i = 0; i < this.rows().length; i++) {
        count = 0;
        for (let k = 0; k < this.rows()[i].length; k++) {
          if (this.rows()[i][k] === 1) {
            count++;
            if (count === 2) {
              return true;
            }
          }
        }
      }
      
      return false;
    },

    //do we have to iterate twice?

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var count = 0;
      for (let k = 0; k < this.rows()[k].length; k++) {
        if (this.rows()[k][colIndex] === 1) {
          count++;
          if (count === 2) {
            return true;
          }
        }
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var count;
// debugger;
      for (let i = 0; i < this.rows().length; i++) {
        count = 0;
        for (let k = 0; k < this.rows()[i].length; k++) {
          if (this.rows()[k][i] === 1) {
            count++;
            if (count === 2) {
              return true;
            }
          }
        }
      }
      
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var count = 0;
      var k = majorDiagonalColumnIndexAtFirstRow;

      for (let i = 0; i < this.rows().length; i++) {
        if (this._isInBounds(i, k)) {
          if (this.rows()[i][k] === 1) {
            count++;
            if (count === 2) {
              return true;
            }
          }
          k++; 
        }
      }
      
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // var count;
      // var k = 0
      /*
        find 1st occurance of '1'
        iterate over columns(s)
          iterate over ros(s)
            if [col][row] === 1
              counter++
              
        var k = row+1
        // start at next row and column
        for col = col+1, col < (array.lenght - col); i++
          if( arr[i][k]) === 1
            return true
            
      */
      // var col;
      // var row;
      // for (col = 0; col < this.rows().length; col++) {
      //   for (row = 0; row < this.rows().length; row++) {
      //     if (this.rows()[col][row] === 1) {
            
      //       for (var i = col+1; i < (this.rows().length - col); i++) {
      //         for (var j = row+1; j < (this.rows().length - row); j++) {
      //           if (this.rows()[i][j] === 1) {
      //             return true;
      //           }
      //         } 
      //       }
      //     }
      //   }
      // }
  /*

debugger;
    var col;
      var row;
       for(row = 0; row < arr.length; row++) {
        for(col = 0; col < arr.length; col++) {
          if (arr[row][col] === 1) {
            
            for(var i = row+1; i < arr.length; i++) {
              for(var j = col+1; j < arr.length; j++) {
                if (arr[i][j] === 1) {
                  return true;
                }
              } 
            }
          }
        }
      }
      
      return false;
    };
  */    
      // Matt
/*      
var foundCoordinates = {};

    // input: 'row' = row -1 since want to start looking for row above
    //        current row
    var hasPrevLocationInDiagonal = function(row, col) {
        if(row < 0 || col < 0) {
            return false;
        }
        do {
            if(foundCoordinates.hasOwnProperty(row + "-" + col)) {
                console.log(' * found diag match at ' + row + ':' + col);
                return true;
            }
        } while(row >= 0 && col >= 0, row--, col--);

        return false;
    }

    var firstFound = false;
    var count = 0;

    for(var row = 0; row < array.length; row++) {
        for(var col = 0; col < array.length; col++) {
            if(array[row][col] == 1) {
                if(!firstFound) {
                    console.log('found 1st 1 row:col ' + row + ':' + col);
                  foundCoordinates[row + "-" + col] = array[row][col];
                  count++
                  firstFound = true;
                } else {
//                     console.log('row: col before 2nd \'1\' ' + row + ':' + col);
 console.log('hasPrevLocationInDiagonal for row:col value ' + row + ':' + col + ' = ' + array[row][col] + ' -> ' + hasPrevLocationInDiagonal(row - 1, col - 1));
                    if(hasPrevLocationInDiagonal(row-1, col-1)) {
                        console.log('true: prev. coord: ' + JSON.stringify(foundCoordinates));
                        return true
                    } else {
                        console.log('adding row:col NOT in diagonal ' + row + ':' + col);
                        foundCoordinates[row + "-" + col] = array[row][col];
                    }
                }
            }
        }
    }

    console.log('false: ' + JSON.stringify(foundCoordinates));

*/
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
// debugger;      
      return false; // fixme
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
