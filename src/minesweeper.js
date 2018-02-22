class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows,numberOfColumns,numberOfBombs);
  }

  get board() {
    return this._board;
  }

  playMove(rowIndex, columnIndex) {
    this.board.flipTile(rowIndex,columnIndex);
    if (this.board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('This game is finished.');
      this.board.print();
    } else if (this.board.hasSafeTiles() === false) {
      console.log('Congratulations! You\'ve won!');
      this.board.print();
    } else {
      console.log('Current Board:');
      this.board.print();
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows,numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs);
  }
  get numberOfBombs() {
    return this._numberOfBombs;
  }

  get numberOfTiles() {
    return this._numberOfTiles;
  }

  get playerBoard() {
    return this._playerBoard;
  }

  get bombBoard() {
    return this._bombBoard;
  }

  set numberOfTiles(value) {
    this._numberOfTiles = value;
  }

  flipTile(rowIndex, columnIndex) {
    if (this.playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    } else if (this.bombBoard[rowIndex][columnIndex] === 'B') {
      this.playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this.numberOfTiles--;
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [
      [-1,-1],
      [-1,0],
      [-1,1],
      [0,-1],
      [0,1],
      [1,-1],
      [1,-0],
      [1,-1]
    ];
    const numberOfRows = this.bombBoard.length;
    const numberOfColumns = this.bombBoard[0].length;
    let numberOfNeighborBombs = 0;

    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this.bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfNeighborBombs++;
        }
      }
    });
    return numberOfNeighborBombs;
  }

  hasSafeTiles() {
    return (this.numberOfTiles !== this.numberOfBombs);
  }

  print() {
    console.log(this.playerBoard.map(row => row.join(' | ')).join('\n'));
  };

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    const board = [];
    for (let rowIndex=0; rowIndex < numberOfRows; rowIndex++) {
      const row = [];
      for (let columnIndex=0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(' ');
      }
    board.push(row);
    }
    return board;
  };

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = [];
    for (let rowIndex=0; rowIndex < numberOfRows; rowIndex++) {
      const row = [];
      for (let columnIndex=0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(null);
      }
    board.push(row);
    }
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      const randomRowIndex = Math.floor(Math.random() * numberOfRows);
      const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }
    return board;
  };
}

const g = new Game(3,3,3);
g.playMove(0,0);

/*const playerBoard = generatePlayerBoard(3,3);
const bombBoard = generateBombBoard(3,3,2);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0,0);
console.log('Updated Player Board:');
printBoard(playerBoard);*/
