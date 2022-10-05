//Gameboard module which can create a board array,
//And also buildS the board on the DOM.
const gameBoard = (() => {
    
    const board = [];
    const boardContainer = document.querySelector(".boardContainer");

    //Takes in the board from newBoard function
    //And creates a board on the DOM
    const buildBoard = (board) => {

        for (let cellNumber = 0; cellNumber < 9; cellNumber++) {
            let cell = document.createElement("div");
            cell.id = cellNumber;
            cell.classList.add("boardCell");
            boardContainer.appendChild(cell);
            board.push(cell);
        }
        return board;
    }

    //Creates a new board. Or if called during reset,
    //takes in the previous array and empties it,
    //also empties the board on the DOM
    const newBoard = (board) => {
        board = board || [];

        //Empty old array
        for (let index = board.length -1; index >= 0; index--) {
            board.pop(index);
        }

        //Clear DOM
        while (boardContainer.firstChild) {
            boardContainer.removeChild(boardContainer.lastChild);
        }

        buildBoard(board);
        return board;
    }

    return { newBoard, board };

})();

//Player object
const Player = (name, token) => {

    this.name = name;
    this.token = token;
    //Where the player's active placements will be stored
    this.cells = [];
    this.winner = false;

    return { name, token, cells, winner };
};

//This module will control the game flow
const displayController = (() => {
   
    let turn;
    let currentPlayer;

    //Create two new players for the game
    const playerOne = Player("player one", "X");
    const playerTwo = Player("player two", "O");

    //Event listener for taking a turn
    const listen = () => {
        const cells = document.querySelectorAll(".boardCell");        
        
        for (const cell of cells) {
            cell.addEventListener("click", takeTurn);
        }
    }

    //Removes the game over popup when resetting
    const removePopup = () => {
        if (document.body.contains(document.querySelector(".popup"))) {
            const popup = document.querySelector(".popup");
            document.body.removeChild(popup);
        }
    }
    
    //Resets variables back to default,
    //and calls setupGame() to set everything back up;
    const resetGame = () => {

        playerOne.winner = false;
        playerTwo.winner = false;
        playerOne.cells = [];
        playerTwo.cells = [];
        removePopup();
        setupGame();
    }

    //Sets turn to one to begin the game,
    //Creates a board to play on,
    //Activates event listeners
    const setupGame = () => {
        turn = 1;
        gameBoard.newBoard(gameBoard.board);
        listen();
        return;
    }

    //Checks for any matches for the current player
    //Takes in the current player's cells array
    const checkMatches = (cells) => {

        // Check for matches from middle cell
        if (cells.includes("4")) {
            if (cells.includes("0") && (cells.includes("8"))) {
                return true;
            } else if (cells.includes("1") && (cells.includes("7"))) {
                return true;
            } else if (cells.includes("2") && (cells.includes("6"))) {
                return true;
            } else if (cells.includes("3") && (cells.includes("5"))) {
                return true;
            }
        // Check for matches from top left corner
        } else if (cells.includes("0")) {
            if (cells.includes("1") && (cells.includes("2"))) {
                return true;
            } else if (cells.includes("3") && (cells.includes("6"))) {
                return true;
            }
        // Check for matches from bottom right corner
        } else if (cells.includes("8")) {
            if (cells.includes("7") && (cells.includes("6"))) {
                return true;
            } else if (cells.includes("5") && (cells.includes("2"))) {
                return true;
            }
        }
    }

    //Displays the winner after a match has been found,
    //Takes the currentPlayer and displays their name
    const displayWinner = (name) => {

        winner = name;
        
        //Creating the winner popup on the DOM
        const winnerPopup = document.createElement("div");
        winnerPopup.classList.add("popup");
        
        //Declare a tie as default
        winnerPopup.textContent = "tie game!";
        
        //If there is a winner then declare it
        if (winner !== undefined) {
            winnerPopup.textContent = `${winner} wins!`;
        }
        
        //Creating the reset button on the popup
        const resetButton = document.createElement("button");
        resetButton.textContent = "play again?";
        resetButton.classList.add("resetButton");
        
        winnerPopup.appendChild(resetButton);
        document.body.appendChild(winnerPopup);

        resetButton.addEventListener("click", resetGame);
    }

    const takeTurn = (e) => {
        
        //If it's the first turn then set the currentPlayer
        //To playerOne
        if (turn === 1) {
            currentPlayer = playerOne;
        }

        //If the current player has won immediately return
        if (currentPlayer.winner) {
            return;
        }
        
        //Setting the cell to be where the player has clicked
        const cell = e.target;
        const id = cell.id;
        
        // Can only play on the selected cell if it's empty
        if (cell.textContent !== "X" && cell.textContent !== "O") {
            //Styling color based on playerOne or playerTwo
            cell.classList.add(currentPlayer.token);
            //Adding the player's token to the cell,
            //And to the gameBoard.board at the correct id
            cell.textContent = gameBoard.board[id] = currentPlayer.token;
            currentPlayer.cells.push(id);
            turn++;
            
            //Check for matches after player's turn
            if (checkMatches(currentPlayer.cells)) {
                currentPlayer.winner = true;
                displayWinner(currentPlayer.name);
                return;
            }
            
            // Alternate player turns after first turn
            if (currentPlayer == playerOne) {
                currentPlayer = playerTwo;
            } else {
                currentPlayer = playerOne;
            }

            if (turn === 10) {
                displayWinner();
                return;
            }
        }
    }
       
    setupGame();

})();