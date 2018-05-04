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
      //for (let k = 0; k < this.rows()[k].length; k++) {
      for (let k = 0; k < this.get('n'); k++) {
        if (this.rows()[k][colIndex] === 1) {
          count++;
          if (count === 2) {
            return true;
          }
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var count;

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
      
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var foundCoordinates = {};

      // input: 'row' = row -1 since want to start looking for row above
      //        current row
      var hasPrevLocationInDiagonal = function(row, col) {
        if (row < 0 || col < 0) {
          return false;
        }
        do {
          if(foundCoordinates.hasOwnProperty(row + "-" + col)) {
            return true;
          }
        } while (row >= 0 && col >= 0, row--, col--);

        return false;
      };

      var firstFound = false;
      var count = 0;

      for (var row = 0; row < this.get('n'); row++) {
        for (var col = 0; col < this.get('n'); col++) {
          if (this.rows()[row][col] === 1) {
            if (!firstFound) {
              foundCoordinates[row + "-" + col] = this.rows()[row][col];
              count++;
              firstFound = true;
            } else {
              if (hasPrevLocationInDiagonal(row-1, col-1)) {
                return true;
              } else {
                foundCoordinates[row + "-" + col] = this.rows()[row][col];
              }
            }
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
      var count = 0;
      // loop through the major diagonal and count the queens that exist
      for ( var i = this.get('n'); i >= 0; i-- ){

        //current major diagonal is board[i][majorDiagonalColumnIndexAtFirstRow]
        // if queen found, increment queens
        if(this._isInBounds(i,minorDiagonalColumnIndexAtFirstRow)){
          if ( this.rows()[i][minorDiagonalColumnIndexAtFirstRow] === 1 ) {
            count++; 
        
            // move to next major diagonal element
            minorDiagonalColumnIndexAtFirstRow--;
          }
        }
      }

      // return if conflict is found, return true
      if ( count > 1 ) {
        return true;
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var found = {};
      var context = this;
      var existsDuplicate = function(row, col) {
        var value = context._getFirstRowColumnIndexForMinorDiagonalOn(row, col);
        for(var key in found) {
          if(found[key] === value) {
            return true;
          }
        }
        found[[row, col]] = value;
        return false;
      };

      var foundFirst = false;
      for(var row = this.get('n') -1; row >=0; row--) {
        for(var col = this.get('n') -1; col >=0; col --) {
          if(this.rows()[row][col] === 1) {
            if(!foundFirst) {
              existsDuplicate(row, col);
              foundFirst = true; 
            } else {
              if(existsDuplicate(row, col)) {
                return true;
              }
            }
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
