var assert = require('assert');
const Board = require('../lib/board')

describe('Board init', function() {
  describe('check init', function() {
    it('Should create an array of length 9', function() {
      let board = new Board();
      let array = board.array;
      assert.equal(9, array.length);
    });
  });
});


describe('Board move', function() {
  describe('should allow placing moves on the board', function() {
    it('Array[3] should be = X', function() {
      let board = new Board();
      let array = board.array;
      board.move(3, 'X');
      assert.equal('X', array[3]);
    });
  });
});

describe('Board checkWinner', function() {
  describe('1st row', function() {
    it('Winner should be X', function() {
      let board = new Board();
      let array = board.array;
      board.move(0, 'X');
      board.move(1, 'X');
      board.move(2, 'X');
      let x = board.checkWinner();
      assert.equal('X', x);
    });
  });
});

describe('Board checkWinner', function() {
  describe('1st Column', function() {
    it('Winner should be X', function() {
      let board = new Board();
      let array = board.array;
      board.move(0, 'X');
      board.move(3, 'X');
      board.move(6, 'X');
      let x = board.checkWinner();
      assert.equal('X', x);
    });
  });
});

describe('Board checkWinner', function() {
  describe('Check diagonal', function() {
    it('Winner should be X', function() {
      let board = new Board();
      let array = board.array;
      board.move(0, 'X');
      board.move(4, 'X');
      board.move(8, 'X');
      let x = board.checkWinner();
      assert.equal('X', x);
    });
  });
});

describe('Board Game Tied', function() {
  describe('Is it a tie', function() {
    it('Tied should be D', function() {
      let board = new Board();
      let array = board.array;
      board.move(0, 'X');
      board.move(1, 'O');
      board.move(2, 'X');
      board.move(3, 'O');
      board.move(4, 'O');
      board.move(5, 'X');
      board.move(6, 'X');
      board.move(7, 'X');
      board.move(8, 'O');
      let x = board.checkWinner();
      assert.equal('D', x);
    });
  });
});

describe('Board is filled', function() {
  describe('should be a tie', function() {
    it('check isfilled function', function() {
      let board = new Board();
      let array = board.array;
      board.move(0, 'X');
      board.move(1, 'O');
      board.move(2, 'X');
      board.move(3, 'O');
      board.move(4, 'O');
      board.move(5, 'X');
      board.move(6, 'X');
      board.move(7, 'X');
      board.move(8, 'O');
      let x = board.isFilled();
      assert.equal(true, x);
    });
  });
});



