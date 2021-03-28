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
    // debugger;
    return board;
}

// console.log(gBoard)

function renderBoard(board)
{
    // debugger;
    var strHTML = '<table border="1"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[ 0 ].length; j++) {
            var cell = board[ i ][ j ];
            var cellId = `${ i }-${ j }`;
            console.log(renderCell(cell))
            strHTML += `<td class="cell" id="${ cellId }" onclick="cellClicked(this)"><span>${ renderCell(cell) }</span></td>`;
        }
        strHTML += '</tr>'
        // console.log(strHTML);
    }
    strHTML += '</tbody></table>';
    // debugger;
    var elContainer = document.querySelector('.board-container');
    elContainer.innerHTML = strHTML;
}

function renderCell(elCell)
{

    if (elCell.isMine && elCell.isShown) return MINE;
    if (elCell.isMarked) return FLAG;
    if (elCell.isShown) {

        if (elCell.minesAroundCount > 0) {
            return elCell.minesAroundCount;
        }
        return EMPTY;
    } else {
        return EMPTY;
    }
}


function randomCellMine()
{
    //board[row][column]
    gBoard[ randInt(0, gBoard.length) ][ randInt(0, gBoard[ 0 ].length) ].isMine = true;
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
        while (placeMinesCounter > 0) {
            randomCellMine();
            placeMinesCounter--;
        }
        // gBoard[ 2 ][ 0 ].isMine = true;
        // gBoard[ 1 ][ 1 ].isMine = true;
    }
    if (!clickedCell.isShown) {
        clickedCell.isShown = true;
        gGame.shownCount++;
        document.getElementById(`${ elCell.id }`).classList.add('clicked-shadow');
        if ((!clickedCell.isMarked) && (!clickedCell.isMine)) {
            expendShown(clickedCell.i, clickedCell.j);
            //renderBoard(gBoard);
        }
        if (clickedCell.isMine) {
            lives--;
            updateLives();
            if (lives === 0) endGame('lose');
        };
    }
    elCell.innerHTML = renderCell(clickedCell);
    checkGameOver();
    console.log('clicked cell is:', cellIdx)
}

const updateLives = () => document.querySelector('.lives').innerHTML = lives;

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

function findNegs(cellI, cellJ)
{
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ)
                continue;
            if (j < 0 || j >= gBoard[ i ].length)
                continue;
            if (gBoard[ i ][ j ].minesAroundCount >= 0 && !gBoard[ i ][ j ].isShown) {
                var neighborCell = [ i, j ]
                expendShown(neighborCell)
            }
        }
    }
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

// function expandShown(i, j)
// {
//     // When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors.NOTE: start with a basic implementation that only opens the non - mine 1st degree neighbors 
//     // Check all neighboring fields
//     const cellsAround = neighborCells(i, j);

//     for (var k = 0; k < cellsAround.length; k++) {
//         const x = cellsAround[ k ][ 0 ];
//         const y = cellsAround[ k ][ 1 ];
//         const cell = getCell(x, y);
//         if ((cell !== null) &&
//             (cell !== undefined) &&
//             (!cell.isMarked) &&
//             (!cell.isShown) &&
//             (!cell.isMine)) {
//             cell.isShown;
//             cell.minesAroundCount = countMines(x, y, gBoard)
//             if (cell.minesAroundCount === 0) {

//                 expandShown(x, y)
//             }
//         }
//     }
// }



function expendShown(i, j)
{
    const cell = gBoard[ i ][ j ];
    const countMines = cell.minesAroundCount;
    if (!cell.isMine && !cell.isMarked && (countMines === 0)) {
        cell.isShown = true;
        renderCell(cell);
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

var elSmiley = document.querySelector('.smiley');
var elTable = document.querySelector('table');
var elTd = document.querySelectorAll('td');

function endGame(state)
{
    gGame.isOn = false;
    stopTimer();
    if (state === 'win') {
        alert('win')
        elSmiley.innerHTML = WIN;
    };

    // openModal('you win')
    if (state === 'lose') {
        // openModal('you lose');
        alert('lose')
        elSmiley.innerHTML = DEAD;
        elTable.classList.add('lose')
        elTd.classList.add('td-lose')
    }
    // openModal();
}



//     const elModal = document.querySelector('.modal');

// function openModal(msg)
// {

//     elModal.style.display = 'block';
//     elModal.innerText = msg;
// }

// function closeModal()
// {
//     // hide the modal -set interval to dissapear after 3 sec
//     var elModal = document.querySelector('.modal');
//     elModal.style.display = 'none';
// }


// <div class="modal">
//     <button onclick="closeModal()">x</button>
//     <h3><span></span></h3>
// </div>