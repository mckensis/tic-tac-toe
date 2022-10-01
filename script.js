const gameBoard = (() => {
    
    const boardContainer = document.querySelector(".boardContainer");
    const board = [];

    for (let i = 0; i < 9; i++) {
        let cell = document.createElement("div");
        cell.id = i;
        cell.classList.add("boardCell");
        boardContainer.appendChild(cell);
        board.push(cell);
    }
    return { board };

})();

const Player = (name, token) => {

    this.name = name;
    this.token = token;
    this.cells = [];

    return { name, token, cells };
};

const displayController = (() => {
    
    const playerOne = Player("player one", "X");
    const playerTwo = Player("player two", "O");
    let turn = 1;
    let currentPlayer = playerOne;

    for (const cell of gameBoard.board) {
            cell.addEventListener("click", takeTurn);
    }

    function checkWinner(player) {

        // Check for matches from middle cell
        if (player.cells.includes("4")) {
            if (player.cells.includes("0")) {
                if (player.cells.includes("8")) {
                    return player.name;
                }
            } else if (player.cells.includes("1")) {
                if (player.cells.includes("7")) {
                    return player.name;
                }
            } else if (player.cells.includes("2")) {
                if (player.cells.includes("6")) {
                    return player.name;
                }
            } else if (player.cells.includes("3")) {
                if (player.cells.includes("5")) {
                    return player.name;
                }
            }
        // Check for matches from top left corner
        } else if (player.cells.includes("0")) {
            if (player.cells.includes("1")) {
                if (player.cells.includes("2")) {
                    return player.name;
                }
            } else if (player.cells.includes("3")) {
                if (player.cells.includes("6")) {
                    return player.name;
                }
            }
        // Check for matches from bottom right corner
        } else if (player.cells.includes("8")) {
            if (player.cells.includes("7")) {
                if (player.cells.includes("6")) {
                    return player.name;
                }
            } else if (player.cells.includes("5")) {
                if (player.cells.includes("2")) {
                    return player.name;
                }
            }
        }
    }

    function displayWinner(winner) {
        
        const test = document.createElement("div");
        test.classList.add("popup");
        
        if (winner === undefined) {
            test.textContent = "tie game";
        } else {   
            test.textContent = `${winner} wins!`;
        }
        document.body.appendChild(test);
        return;
    }

    function takeTurn(e) {
        const cell = e.target;
        const id = cell.id;
        
        // Can only play on the selected cell if it's empty
        if (!cell.textContent) {
            cell.textContent = gameBoard.board[id] = currentPlayer.token;
            currentPlayer.cells.push(id);
            turn++;
            if (currentPlayer.cells.length >= 3) {
                let winner = checkWinner(currentPlayer);
                console.log(winner);
                if (winner !== undefined) {
                    displayWinner(winner);
                    return;
                }
            }

            if (turn === 10) {
                displayWinner();
                return;
            }

            // Alternate player turns
            if (currentPlayer === playerOne) {
                currentPlayer = playerTwo;
            } else {
                currentPlayer = playerOne;
            }
        }
    }

})();