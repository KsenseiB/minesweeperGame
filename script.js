'use strict';
const FLAG = '🚩';
const MINE = '💣';
const IMOJI = '🤓';
const DEAD = '💀'
const WIN = '😎'
const EMPTY = '';
var lives = 2;
var gTimer;
var gBoard;

var gLevel = {
    SIZE: 4,
    MINES: 2
};
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

// snnips:qs, qsa, frlp

window.addEventListener("contextmenu", e =>
{
    if (gGame.shownCount === 0) {
        initGame();
    } else {
        var eId = e.target.id;
        var eIdParsed = eId.split('-');

        if (eIdParsed.length === 2) {
            cellMarked(e);
        }
    }
    e.preventDefault()
    checkGameOver();
});

function initGame()
{
    // board needs to be created only after first click
    gBoard = buildBoard(gLevel.SIZE);
    renderBoard(gBoard);
    updateLives();
    timer.innerText = '00:00';
    // console.log(gBoard);
}

function setDiff(num)
{
    if (num === 4) {
        gLevel.SIZE = 4;
        gLevel.MINES = 2;
        lives = 2;
    };
    if (num === 8) {
        gLevel.SIZE = 8;
        gLevel.MINES = 12;
        lives = 3;
    };
    if (num === 12) {
        gLevel.SIZE = 12;
        gLevel.MINES = 30;
        lives = 3;
    };
    gGame.isOn = false;
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    initGame();
}

function buildBoard(size)
{
    // Set mines at random locations Call setMinesNegsCount() Return the created board
    var board = createMat(size);
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[ i ].length; j++) {
            board[ i ][ j ] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            };
        }
    }
    return board;
}

function renderBoard(board)
{
    var strHTML = '<table border="1"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[ 0 ].length; j++) {
            var cellId = `${ i }-${ j }`;
            strHTML += `<td class="cell" id="${ cellId }" onclick="cellClicked(this)"><span></span></td>`;
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector('.board-container');
    elContainer.innerHTML = strHTML;
}

function renderCell(elCell)
{
    var value = EMPTY;
    if (elCell.isMine) value = MINE;
    if (elCell.isMarked) value = FLAG;
    if (elCell.isShown) {

        if (elCell.minesAroundCount > 0) {
            value = elCell.minesAroundCount;
        }
    }

    const cell = document.getElementById(`${ elCell.id }`);
    cell.innerHTML = value;
    cell.classList.add('clicked-shadow');
}

function randomCellMine()
{
    //board[row][column]
    var mineLoc = gBoard[ randInt(0, gBoard.length) ][ randInt(0, gBoard[ 0 ].length) ];
    // mines.push(mineLoc);
    mineLoc.isMine = true;
}

function cellClicked(elCell)
{
    var cellIdx = elCell.id.split('-'); //[i, j]
    var clickedCell = getCell(cellIdx[ 0 ], cellIdx[ 1 ]);
    clickedCell.i = parseInt(cellIdx[ 0 ]);
    clickedCell.j = parseInt(cellIdx[ 1 ]);
    // var clickedCell = gBoard[ cellIdx[ 0 ] ][ cellIdx[ 1 ] ];
    clickedCell.minesAroundCount = setMinesNegsCount(clickedCell.i, clickedCell.j, gBoard);

    if (gGame.shownCount === 0 && gGame.markedCount === 0) {
        gGame.isOn = true;
        startTimer();
        var placeMinesCounter = gLevel.MINES;
        // var mines = []; need to make condition to check that they dont fall on each other;
        while ((placeMinesCounter > 0)) {
            randomCellMine();
            placeMinesCounter--;
        }
    }
    if (!clickedCell.isShown) {
        clickedCell.id = `${ clickedCell.i }-${ clickedCell.j }`
        document.getElementById(`${ elCell.id }`).classList.add('clicked-shadow');
        if (clickedCell.minesAroundCount === 0) expendShown(clickedCell.i, clickedCell.j);
        if (clickedCell.isMine) {
            // even if its last mine, first display on board then pop ' you lose'
            renderCell(clickedCell);
            lives--;
            if (lives <= 0) endGame('lose');
            updateLives();
        };
    }
    renderCell(clickedCell);
    checkGameOver();
    console.log('clicked cell is:', cellIdx)
}


function countMines(cellI, cellJ, mat)
{
    var count = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat[ i ].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (mat[ i ][ j ].isMine) count++;
        }
    }
    console.log('Mines count around this cell:', count)
    return count;
}

function setMinesNegsCount(rowIdx, colIdx, board)
{
    var countMinesAround = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[ 0 ].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            var mine = board[ i ][ j ].isMine;
            if (mine) countMinesAround++
        }
        console.log(countMinesAround)
    }
    return countMinesAround;
}

function cellMarked(elCell)
{
    // https://www.w3schools.com/jsref/event_oncontextmenu.asp
    // Called on right click to mark a cell (suspected to be a mine) Search the web (and implement) how to hide the context menu on right click
    var cellIdx = elCell.target.id.split('-'); //[i, j] // Can I just make this global?
    var clickedCell = getCell(cellIdx[ 0 ], cellIdx[ 1 ]);
    if (!clickedCell.isMarked) {
        clickedCell.isMarked = true;
        gGame.markedCount++;

    }
    renderBoard(gBoard);
}

function expendShown(cellI, cellJ)
{
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard.length) continue;
            if (i === cellI && j === cellJ) continue;
            const cell = gBoard[ i ][ j ];
            if (!cell.isMine && !cell.isShown && !cell.isMarked) {
                cell.isShown = true;
                gGame.shownCount++;
                cell.id = `${ i }-${ j }`;
                cell.minesAroundCount = setMinesNegsCount(i, j, gBoard);
                renderCell(cell)
                if (cell.minesAroundCount === 0) expendShown(i, j);
            }
        }
    }
}

function checkGameOver()
{
    // Game ends when all mines are marked, and all the other cells are shown
    if (gGame.markedCount === gLevel.MINES && gLevel.SIZE ** 2 === (gGame.shownCount + gGame.markedCount)) {
        console.log('win')
        alert('you win');
        endGame('win');
    }
    // else {
    //     alert('you lose');
    //     endGame(lose)
    // }
}

const elSmiley = document.querySelector('.smiley');
const elTable = document.querySelector('table');
const elTd = document.querySelectorAll('td');
const elModal = document.querySelector('.modal');

function endGame(state)
{
    gGame.isOn = false;
    stopTimer();
    if (state === 'win') {
        elSmiley.innerHTML = WIN;
        elModal.innerText = 'You win /n you da bomb🦾';
        openModal('You win /n you da bomb🦾')
    };

    if (state === 'lose') {
        openModal('you lose');

        elSmiley.innerHTML = DEAD;
        elTable.classList.add('lose');
        elTd.classList.add('td-lose');
        openModal('BOOM /n You lose')
    }
}
function openModal(msg)
{
    elModal.style.display = 'block';
    elModal.innerText = msg;
    // hide the modal -set interval to dissapear after 3 sec
    setTimeout(() => { elModal.style.display = 'none'; }, 3000);

}

// function closeModal()
// {
//     elModal.style.display = 'none';
//     var elModal = document.querySelector('.modal');
// }

