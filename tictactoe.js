//module to create gameboard array
const gameBoard = (() => {
    board = [];
    board[0] = ''
    board[1] = ''
    board[2] = ''
    board[3] = ''
    board[4] = ''
    board[5] = ''
    board[6] = ''
    board[7] = ''
    board[8] = ''
    const move = (mark, position) => board[position] = mark;
    const log = () => console.log(board);
    const check = (number) => {
        return board[number]
    }
    //reset board
    const resetBoard = () => {
        board[0] = ''
        board[1] = ''
        board[2] = ''
        board[3] = ''
        board[4] = ''
        board[5] = ''
        board[6] = ''
        board[7] = ''
        board[8] = ''
        gameBoard.move('', 0)
        gameBoard.move('', 1)
        gameBoard.move('', 2)
        gameBoard.move('', 3)
        gameBoard.move('', 4)
        gameBoard.move('', 5)
        gameBoard.move('', 6)
        gameBoard.move('', 7)
        gameBoard.move('', 8)
    }
    return {
        move,
        log,
        check,
        resetBoard
    }
})();

//factory function for player
const Player = (name, playerNumber) => {
    let symbol = 'o';
    if (playerNumber === 1) {
        symbol = 'x'
    }
    const getName = () => name;
    const mark = () => symbol;
    return {
        getName,
        mark
    }
}

const gameFlow = (() => { 
    let turn = 1;  
    const determineWhosTurn = () => {
        if (turn % 2 == 0) {
            takeTurn();
            return 'o';
        } else {
            takeTurn();
            return 'x';
        }
    }
    const takeTurn = () => turn++;
    const playRound = (box) => {
        player = determineWhosTurn()
        gameBoard.move(player, box)
        winState(player)
        if (opponent == 'easyAI' && turn < 9) {
            let aiMark = determineWhosTurn();
            let aiMove = aiEasy.makeMove()
            gameBoard.move(aiMark, aiMove);
            winState(aiMark)
        }
    }
    const checkWin = (p1, p2, p3, mark) => {
        let check1 = gameBoard.check(p1)
        let check2 = gameBoard.check(p2)
        let check3 = gameBoard.check(p3)
        if (check1 == mark && check2 == mark && check3 == mark) {
            return mark
        } else {
            return '?'
        }
    }
    const winState = (mark) => {
        player = mark;
        //all horizontal win checks
        state = checkWin (0, 1, 2, player)
        if (state == player && player == 'o') {
            return displayController.openModal('lose')
        }
        if (state == player) {
            return displayController.openModal('win')
        }
        state = checkWin (3, 4, 5, player)
        if (state == player && player == 'o') {
            return displayController.openModal('lose')
        }
        if (state == player) {
            return displayController.openModal('win')
        }
        state = checkWin (6, 7, 8, player)
        if (state == player && player == 'o') {
            return displayController.openModal('lose')
        }
        if (state == player) {
            return displayController.openModal('win')
        }
        //all vertical checks
        state = checkWin (0, 3, 6, player)
        if (state == player && player == 'o') {
            return displayController.openModal('lose')
        }
        if (state == player) {
            return displayController.openModal('win')
        }
        state = checkWin (1, 4, 7, player)
        if (state == player && player == 'o') {
            return displayController.openModal('lose')
        }
        if (state == player) {
            return displayController.openModal('win')
        }
        state = checkWin (2, 5, 8, player)
        if (state == player && player == 'o') {
            return displayController.openModal('lose')
        }
        if (state == player) {
            return displayController.openModal('win')
        }
        //both diagonal checks
        state = checkWin (0, 4, 8, player)
        if (state == player && player == 'o') {
            return displayController.openModal('lose')
        }
        if (state == player) {
            return displayController.openModal('win')
        }
        state = checkWin (2, 4, 6, player)
        if (state == player && player == 'o') {
            return displayController.openModal('lose')
        }
        if (state == player) {
            return displayController.openModal('win')
        }
        if (turn == 10) {
            return displayController.openModal('draw')
        }
    }
    //playRound stuff dealing with easy AI
    let opponent = 'player'
    const chooseOpponent = (arg) => {
        opponent = arg
    }
    //reset turns
    const resetTurn = () => {
        turn = 1;
    }
    return {
        determineWhosTurn,
        playRound,
        checkWin,
        winState,
        chooseOpponent,
        resetTurn
    }
})();

//display board module
const displayController = (() => {
    let boardDom = document.querySelector('.gameboard')
    const displayBoard = () => {
        clearBoard()
        for (let i = 0; i < 9; i++) {
        let box = document.createElement('div');
        box.classList.add('box');
        box.innerText = gameBoard.check(i);
        box.setAttribute('id', i)
        //Button for clicking boxes
        box.addEventListener('click', e => {
            let repeatCheck = gameBoard.check(box.id)
            if (repeatCheck != '') {
                return console.log('repeat')
            }
            gameFlow.playRound(box.id)
            displayBoard()
        })
        boardDom.appendChild(box);
        }
    }
    const clearBoard = () => {
        let boxes = boardDom.querySelectorAll('div');
        boxes.forEach((div) => div.remove())
    }
    //everything in here has to do with the pop up win or tie modal
    const modal = document.querySelector('#modal')
    const overlay = document.querySelector('#overlay')
    const openModal = (winner) => {
        if (modal == null) return
        if (winner == "win") {
            let pText = document.querySelector('#end-p')
            pText.innerText = 'You Win'
            pText.setAttribute('class', 'win')
            let returnButton = document.querySelector('#end-button')
            returnButton.innerText = 'Return';
            returnButton.addEventListener('click', () => {
                displayController.closeModal()
                gameBoard.resetBoard()
                displayController.displayBoard()
                gameFlow.resetTurn()
                gameFlow.chooseOpponent('player')
                startScreen.setAttribute('class', "active")
            })
            returnButton.setAttribute('class', 'return')
            modal.classList.add('active');
            overlay.classList.add('active');
        }
        if (winner == 'draw') {
            let pText = document.querySelector('#end-p')
            pText.innerText = 'Draw'
            pText.setAttribute('class', 'draw')
            let returnButton = document.querySelector('#end-button')
            returnButton.innerText = 'Return';
            returnButton.addEventListener('click', () => {
                displayController.closeModal()
                gameBoard.resetBoard()
                displayController.displayBoard()
                gameFlow.resetTurn()
                gameFlow.chooseOpponent('player')
                startScreen.setAttribute('class', "active")
            })
            returnButton.setAttribute('class', 'return')
            modal.classList.add('active');
            overlay.classList.add('active');
        }
        if (winner == 'lose') {
            let pText = document.querySelector('#end-p')
            pText.innerText = 'You Lose'
            pText.setAttribute('class', 'lose')
            let returnButton = document.querySelector('#end-button')
            returnButton.innerText = 'Return';
            returnButton.addEventListener('click', () => {
                displayController.closeModal()
                gameBoard.resetBoard()
                displayController.displayBoard()
                gameFlow.resetTurn()
                gameFlow.chooseOpponent('player')
                startScreen.setAttribute('class', "active")
            })
            returnButton.setAttribute('class', 'return')
            modal.classList.add('active');
            overlay.classList.add('active');
        }
    }
    const closeModal = () => {
        if (modal == null) return
        modal.classList.remove('active');
        overlay.classList.remove('active')
    }
    //end
    //everything in here is to do with start screen
    const startScreen = document.querySelector('#start')
    const playerButton = document.querySelector('#player')
    playerButton.addEventListener('click', () => {
        displayController.displayBoard()
        startScreen.classList.remove('active')
    });
    const easyAIButton = document.querySelector('#easy-AI')
    easyAIButton.addEventListener('click', () => {
        gameFlow.chooseOpponent('easyAI');
        displayController.displayBoard()
        startScreen.classList.remove('active')
    })
    return {
        displayBoard,
        openModal,
        closeModal
    }
})();

const playerOne = Player('Me', 1);
const playerTwo = Player('Computer', 2);


const returnButton = document.createElement('button')
returnButton.addEventListener('click', () => {
    displayController.closeModal()
})

const aiEasy = (() => {
    let backUpMove = 0;
    const generateMove = () => {
        return Math.floor(Math.random() * 9)
    };
    const makeMove = () => {
        let move = generateMove();
        console.log(move)
        if (gameBoard.check(move) === '') {
            console.log("move")
            return move
        } else {
            if (gameBoard.check(backUpMove) === '') {
                return backUpMove
            } else {
                backUpMove++
                return makeMove()
            }
        }
    }
    return {
        makeMove
    }
})();