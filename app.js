const gameState = {
  players: ["x", "o"],
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
};

let playerNames = [];
let playerNamesSymbols = {};
//{x: playerNames[0], o: playerNames[1]}

let currentPlayer = gameState.players[0];
//gameState.players[0] is always a current player

function buildPlayer(player) {
  const playerListEl = $(`
      <li class="player"><span id="x-or-o">${
        gameState.players[playerNames.indexOf(player)]
      }</span>
        ${player}
      </li> 
    `).data("player", player);

  return playerListEl;
}

function renderPlayer() {
  $("#player-list").empty();

  playerNames.forEach(function (player) {
    $("#player-list").append(buildPlayer(player));
  });
}

function addPlayer(event) {
  event.preventDefault();

  const firstName = $("#player-1").val();
  const secondName = $("#player-2").val();

  $(this).trigger("reset");

  playerNames.push(firstName);
  playerNames.push(secondName);

  playerNames.reduce(function (obj, name, idx) {
    playerNamesSymbols[gameState.players[idx]] = name;
    return obj;
  }, {});
  // creates {x: playerNames[0], o: playerNames[1]}

  renderPlayer();
  $("#player-form").slideUp();

  createBoard();
  //invoke createBoard() here to create a board after getting players entered
}

//swap symbols x -> o or o -> x
function swapPlayer() {
  let swap;
  swap = gameState.players[0];
  gameState.players[0] = gameState.players[1];
  gameState.players[1] = swap;

  currentPlayer = gameState.players[0];
}

//displays whose turn it is
function whoIsPlaying() {
  if (currentPlayer === "x") {
    $("#display").text(`${playerNamesSymbols.x} is playing...`);
  } else {
    $("#display").text(`${playerNamesSymbols.o} is playing...`);
  }
}

function createBoard() {
  for (let i = 1; i < 10; i++) {
    $("#board").append(`<div class="cell" id="cell-${i}"></div>`);
  }

  $(".cell").click(startGame);
}

function startGame() {
  if ($(this).text() !== "") {
    alert("The cell is already clicked!");
    return;
  } //when a user clicks a cell already clicked, alret and discontinue startGame()

  $(this).text(currentPlayer);
  swapPlayer();
  whoIsPlaying();

  updateBoard($(this).attr("id"));
  //invoke updateBoard() to update x or o to the gameState.board array using cell's id

  if (whoIsWinning() || isBoardFull()) {
    startOver();
  }
  /*
  whoIsWinning() returns true 
  or
  isBoardFull() returns true
  then
  startOver
  */

  if (playerNamesSymbols.o === "Computer") {
    computerPlayer();
  }
}

function computerPlayer() {
  let emptyCells = [];
  //declares a array varible to collect empty cells' id

  $("#board")
    .children()
    .each(function () {
      const idName = $(this).attr("id");
      if ($(`#${idName}`).text() === "") {
        emptyCells.push(idName);
      }
    }); //push all the empty cells' id to the emptyCells array

  if (emptyCells.includes("cell-5")) {
    $("#cell-5")
      .text(currentPlayer)
      .animate({ opacity: "0.2" })
      .animate({ opacity: "1" });
    updateBoard("cell-5");
  } else if (emptyCells.includes("cell-1")) {
    $("#cell-1")
      .text(currentPlayer)
      .animate({ opacity: "0.2" })
      .animate({ opacity: "1" });
    updateBoard("cell-1");
  } else if (emptyCells.includes("cell-3")) {
    $("#cell-3")
      .text(currentPlayer)
      .animate({ opacity: "0.2" })
      .animate({ opacity: "1" });
    updateBoard("cell-3");
  } else if (emptyCells.includes("cell-7")) {
    $("#cell-7")
      .text(currentPlayer)
      .animate({ opacity: "0.2" })
      .animate({ opacity: "1" });
    updateBoard("cell-7");
  } else if (emptyCells.includes("cell-9")) {
    $("#cell-9")
      .text(currentPlayer)
      .animate({ opacity: "0.2" })
      .animate({ opacity: "1" });
    updateBoard("cell-9");
  } else {
    let randomCellNumber = Math.floor(Math.random() * emptyCells.length);

    $(`#${emptyCells[randomCellNumber]}`)
      .text(currentPlayer)
      .animate({ opacity: "0.2" })
      .animate({ opacity: "1" });

    updateBoard(emptyCells[randomCellNumber]);
  }
  
  swapPlayer();
  whoIsPlaying();

  if (whoIsWinning() || isBoardFull()) {
    startOver();
  }
}

function updateBoard(cellId) {
  gameState.board[hashMap[cellId][0]][hashMap[cellId][1]] = $(
    `#${cellId}`
  ).text();
  /*
  hashMap is in object.js

  if (cellId === "cell-9") {
  gameState.board[2][2] = $(`#${cellId}`).text();
  }
  */
}

function whoIsWinning() {
  /*
  check three rows 
  [0][0] == [0][1] == [0][2]
  [1][0] == [1][1] == [1][2]
  [2][0] == [2][1] == [2][2]
*/
  for (let i = 0; i < 3; i++) {
    if (
      gameState.board[i][0] === gameState.board[i][1] &&
      gameState.board[i][1] === gameState.board[i][2] &&
      gameState.board[i][0] !== null
    ) {
      alert(`${playerNamesSymbols[gameState.board[i][0]]} won!`);
      return true;
    }
  }

  /*
  check three columns
  [0][0] == [1][0] == [2][0]
  [0][1] == [1][1] == [2][1]
  [0][2] == [1][2] == [2][2]
*/
  for (let i = 0; i < 3; i++) {
    if (
      gameState.board[0][i] === gameState.board[1][i] &&
      gameState.board[1][i] === gameState.board[2][i] &&
      gameState.board[0][i] !== null
    ) {
      alert(`${playerNamesSymbols[gameState.board[0][i]]} won!`);
      return true;
    }
  }

  /*
  check two diagonals
  [0][0] == [1][1] == [2][2]
  [0][2] == [1][1] == [2][0]
*/
  if (
    gameState.board[0][0] === gameState.board[1][1] &&
    gameState.board[1][1] === gameState.board[2][2] &&
    gameState.board[0][0] !== null
  ) {
    alert(`${playerNamesSymbols[gameState.board[0][0]]} won!`);
    return true;
  } else if (
    gameState.board[0][2] === gameState.board[1][1] &&
    gameState.board[1][1] === gameState.board[2][0] &&
    gameState.board[0][2] !== null
  ) {
    alert(`${playerNamesSymbols[gameState.board[0][2]]} won!`);
    return true;
  }
  return false;
}

//check if the board is full
function isBoardFull() {
  for (let i = 0; i < gameState.board.length; i++) {
    for (let j = 0; j < gameState.board.length; j++) {
      if (gameState.board[i][j] === null) {
        return false;
      }
    }
  }
  alert("The game is a tie!");
  return true;
}

/*
invoked when the start over button is clicked
or
when somebody wins
or
when the board is full
*/
function startOver() {
  $("#player-form").slideDown();
  //so that a user can enter players again

  $(".cell").text("");
  //remove xo on the interface

  for (let i = 0; i < gameState.board.length; i++) {
    for (let j = 0; j < gameState.board.length; j++) {
      gameState.board[i][j] = null;
    }
  } //set null to each element of gameState.board array

  playerNames = [];
  playerNamesSymbols = {};
  $("#player-list").empty();
  //remove names (data, interface)

  $("#display").text("");
  //reset #display that shows whose turn it is (element, interface)

  if (gameState.players[0] === "o" && currentPlayer === "o") {
    swapPlayer();
  } //so that x player always goes first

  $("#board").empty();
  //remove all .cell div elements
}

$("#player-form").submit(addPlayer);
$("#start-over").click(startOver);

renderPlayer();
