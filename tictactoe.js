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
    return {
        move,
        log,
        check,
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
    }
    const checkWin = (p1, p2, p3, mark) => {
        let check1 = gameBoard.check(p1)
        let check2 = gameBoard.check(p2)
        let check3 = gameBoard.check(p3)
        if (check1 == mark && check2 == mark && check3 == mark) {
            console.log('winstate')
            return mark
        } else {
            console.log('losestate')
            return '?'
        }
    }
    const winState = (mark) => {
        player = mark;
        //all horizontal win checks
        state = checkWin (0, 1, 2, player)
        if (state == player) {
            return displayController.openModal('win')
        }
        state = checkWin (3, 4, 5, player)
        if (state == player) {
            return displayController.openModal('win')
        }
        state = checkWin (6, 7, 8, player)
        if (state == player) {
            return displayController.openModal('win')
        }
        //all vertical checks
        state = checkWin (0, 3, 6, player)
        if (state == player) {
            return displayController.openModal('win')
        }
        state = checkWin (1, 4, 7, player)
        if (state == player) {
            return displayController.openModal('win')
        }
        state = checkWin (2, 5, 8, player)
        if (state == player) {
            return displayController.openModal('win')
        }
        //both diagonal checks
        state = checkWin (0, 4, 8, player)
        if (state == player) {
            return displayController.openModal('win')
        }
        state = checkWin (2, 4, 6, player)
        if (state == player) {
            return displayController.openModal('win')
        }
        if (turn == 10) {
            return displayController.openModal('draw')
        }
    }
    return {
        determineWhosTurn,
        playRound,
        checkWin,
        winState
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
            let pText = document.createElement('p')
            pText.innerText = 'You Win'
            pText.setAttribute('class', 'win')
            modal.appendChild(pText)
            let returnButton = document.createElement('button')
            returnButton.innerText = 'Return';
            returnButton.addEventListener('click', () => {
                displayController.closeModal()
            })
            returnButton.setAttribute('class', 'return')
            modal.appendChild(returnButton)
            modal.classList.add('active');
            overlay.classList.add('active');
        }
        if (winner == 'draw') {
            let pText = document.createElement('p')
            pText.innerText = 'Draw'
            pText.setAttribute('class', 'draw')
            modal.appendChild(pText)
            let returnButton = document.createElement('button')
            returnButton.innerText = 'Return';
            returnButton.addEventListener('click', () => {
                displayController.closeModal()
            })
            returnButton.setAttribute('class', 'return')
            modal.appendChild(returnButton)
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
    return {
        displayBoard,
        openModal,
        closeModal
    }
})();

const playerOne = Player('Me', 1);
const playerTwo = Player('Computer', 2);

displayController.displayBoard()

const returnButton = document.createElement('button')
returnButton.addEventListener('click', () => {
    displayController.closeModal()
})