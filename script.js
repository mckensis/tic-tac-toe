const gameBoard = (() => {
    
    const boardContainer = document.querySelector(".boardContainer");
    const board = [];

    const buildBoard = (board) => {
        board = board || [];
        for (let cellNumber = 0; cellNumber < 9; cellNumber++) {
            let cell = document.createElement("div");
            cell.id = cellNumber;

            cell.classList.add("boardCell");
            boardContainer.appendChild(cell);
            board.push(cell);
        }
        return board;
    }

    const newBoard = (board) => {
        board = board || [];
        for (let index = 0; index < board.length; index++) {
            board.unshift(index);
        }

        while (boardContainer.firstChild) {
            boardContainer.removeChild(boardContainer.lastChild);
        }

        buildBoard(board);
        return board;
    }

    return { newBoard, board, boardContainer };

})();

const Player = (name, token) => {

    this.name = name;

    this.token = token;
    this.cells = [];
    this.winner = false;

    console.log(`setting ${this.name}...`)

    return { name, token, cells, winner };
};

const displayController = (() => {
   
    let turn;
    let currentPlayer;

    const playerOne = Player("player one", "X");
    const playerTwo = Player("player two", "O");

    const listen = () => {
        const cells = document.querySelectorAll(".boardCell");        
        
        for (const cell of cells) {
            cell.addEventListener("click", takeTurn);
        }
    }

    const removePopup = () => {
        if (document.body.contains(document.querySelector(".popup"))) {
            const popup = document.querySelector(".popup");
            document.body.removeChild(popup);
        }
    }
    
    const resetGame = () => {
        console.log("resetting...");
        playerOne.winner = false;
        playerTwo.winner = false;
        playerOne.cells = [];
        playerTwo.cells = [];
        removePopup();
        setupGame();
    }

    const setupGame = () => {
        turn = 1;
        console.log("setting...");
        
        gameBoard.newBoard();
        listen();
        return;
    }

    const checkMatches = (cells) => {

        console.log("checking matches...");

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

    const displayWinner = (currentPlayer) => {

        winner = currentPlayer;
        const winnerPopup = document.createElement("div");
        winnerPopup.textContent = "tie game!";
        winnerPopup.classList.add("popup");
        
        if (winner !== undefined) {
            winnerPopup.textContent = `${winner.name} wins!`;
        }
        
        const resetButton = document.createElement("button");
        resetButton.textContent = "play again?";
        resetButton.classList.add("resetButton");
        winnerPopup.appendChild(resetButton);
        document.body.appendChild(winnerPopup);

        resetButton.addEventListener("click", resetGame);
    }

    const takeTurn = (e) => {

        if (playerOne.winner || playerTwo.winner) {
            return;
        }

        if (turn === 1) {
            currentPlayer = playerOne;
        }

        const cell = e.target;
        const id = cell.id;
        
        // Can only play on the selected cell if it's empty
        if (cell.textContent !== "X" && cell.textContent !== "O") {
            cell.classList.add(currentPlayer.token);
            cell.textContent = gameBoard.board[id] = currentPlayer.token;
            currentPlayer.cells.push(id);
            turn++;
            
            if (checkMatches(currentPlayer.cells)) {
                currentPlayer.winner = true;
                displayWinner(currentPlayer);
                return;
            }
            
            // Alternate player turns
            if (currentPlayer === playerOne) {
                currentPlayer = playerTwo;
            } else {
                currentPlayer = playerOne;
            }
        }

        if (turn === 10) {
            displayWinner();
            return;
        }
    }
       
    setupGame();

})();