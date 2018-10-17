const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  const setName = newName => name = newName;
  return {getName, setName, getMarker};
};

const gameBoard = (() => {
  const board = [["","",""],["","",""],["","",""]]
  let turn = 1
  const player1 = Player("Player X", "X");
  const player2 = Player("Player O", "O");
  const getTurn = () => turn;
  const whosTurn = () =>  (turn % 2) == 1 ? player1 : player2 ;
  const nextTurn = () => ++turn;
  const gameWon = (rowIndex,columnIndex) => {
    let rowWin = board[rowIndex].every(function(position) {  return position == whosTurn().getMarker();  });
    let columnWin = board.every(function(position) {  return position[columnIndex] == whosTurn().getMarker();  });
    let downDiagonalWin = false;
    let upDiagonalWin = false;
    if (rowIndex == columnIndex){
      downDiagonalWin = board.every(function(position, index) {  return position[index] == whosTurn().getMarker();  });
    };
    if (rowIndex == (2 - columnIndex)){
      upDiagonalWin = board.every(function(position, index) {  return position[2-index] == whosTurn().getMarker();  });;
    };
    console.log(upDiagonalWin)
    return rowWin || columnWin || downDiagonalWin || upDiagonalWin;
  };
  const reset = () => {
    board.forEach(function(row, rowIndex){
      row.forEach(function(position, positionIndex){
        board[rowIndex][positionIndex] = "";
      });
    });
    turn = 1
  };
  return {board, whosTurn, nextTurn, reset, gameWon, getTurn};
})();

const displayController = (() => {
  const game = document.getElementById('game');
  const makeBoard = () => {
    let gameOver = false;
    if (game.hasChildNodes()) {
      while (game.hasChildNodes()) {
        game.firstChild.remove();
      }
      gameBoard.reset();
      // game.removeEventListener("click", reset());
    }
    let board = document.createElement('div');
    board.classList.add("board");
    game.appendChild(board);
    gameBoard.board.forEach(function(row, rowIndex){
      row.forEach(function(position, positionIndex){
        position = document.createElement('div');
        position.classList.add("position","position-empty");
        board.appendChild(position);
        position.addEventListener("click", function markGameBoard(){
          if (!gameOver && gameBoard.board[rowIndex][positionIndex] == "") {
            gameBoard.board[rowIndex][positionIndex] = gameBoard.whosTurn().getMarker();
            position.textContent = gameBoard.whosTurn().getMarker();
            position.classList.remove("position-empty");
            position.removeEventListener("click", markGameBoard());
            if (gameBoard.gameWon(rowIndex,positionIndex)){
              gameOver = `${gameBoard.whosTurn().getName()} Won the Game`;
              console.log("game over")
            } else if (gameBoard.getTurn() >= 9) {
              gameOver = "Tie Game";
              console.log("tie game")
            } else {
              gameBoard.nextTurn();
            };
            if (gameOver){
              let gameOverOverlay = document.createElement('div');
              gameOverOverlay.textContent = gameOver;
              gameOverOverlay.classList.add("gameOverOverlay");
              game.appendChild(gameOverOverlay);
            }
          };
        });
      });
    });
  }
  return {makeBoard};
})();


const resetButton = document.getElementById('resetButton')
resetButton.addEventListener("click", function(){
  displayController.makeBoard();
})

console.log(gameBoard.board);
displayController.makeBoard();
