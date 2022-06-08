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
    const determineTurn = () => {
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
        player = determineTurn()
        gameBoard.move(player, box)
    }
    const checkWin = (p1, p2, p3, mark) => {
        let check1 = gameBoard.check(p1)
        let check2 = gameBoard.check(p2)
        let check3 = gameBoard.check(p3)
        if (check1 == mark && check2 == mark && check3 == mark) {
            console.log('win')
        } else {
            console.log('lose')
        }
    }
    return {
        determineTurn,
        playRound,
        checkWin
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
        box.addEventListener('click', e => {
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
    return {
        displayBoard
    }
})();

const playerOne = Player('Me', 1);
const playerTwo = Player('Computer', 2);

displayController.displayBoard()