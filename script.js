'use strict';
const FLAG = '🚩';
const MINE = '💣';
const IMOJI = '🤓';
const DEAD = '💀'
const EMPTY = '';
var gInterval;
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


function initGame()
{
    // board needs to be created only after first click
    gBoard = buildBoard(gLevel.SIZE);
    renderBoard(gBoard, '.board-container');
    // console.log(gBoard);
}


function setDiff(num)
{
    if (num === 4) gLevel.SIZE = 4;
    if (num === 8) gLevel.SIZE = 8;
    if (num === 12) gLevel.SIZE = 12;
}

console.log(gBoard)

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

function renderBoard(board)
{
    // debugger;
    // Render the board as a <table> to the page 
    var strHTML = '<table border="1"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[ 0 ].length; j++) {
            var cell = EMPTY;

            if (cell.isMine && cell.isShown) {
                cell = MINE;
            } else if (cell.isMarked && cell.isShown) {
                cell = !FLAG;
            }
            var cellId = `${ i }-${ j }`;
            // var className = `cell cell${ i }-${ j }`;
            strHTML += `<td class="cell" id="${ cellId }" onclick="cellClicked(this)"><span>${ cell }</span></td>`;
            // strHTML += '<td class="' + className + '" onclick="check()"><span> ' + cell + '</span> </td>';
        }
        strHTML += '</tr>'
        // console.log(strHTML);
    }
    strHTML += '</tbody></table>';
    // debugger;
    var elContainer = document.querySelector('.board-container');
    elContainer.innerHTML = strHTML;
}


function cellClicked(elCell)
{
    // debugger;
    var cellIdx = elCell.id.split('-'); //[i, j]
    // debugger;
    var clickedCell = gBoard[ cellIdx[ 0 ] ][ cellIdx[ 1 ] ];
    if (gGame.shownCount === 0 && gGame.markedCount === 0) {
        gGame.isOn = true;
        startTimer();
        gBoard[ 2 ][ 0 ].isMine = true;
        gBoard[ 1 ][ 1 ].isMine = true;
    };
    if (clickedCell.isMine) endGame();
    clickedCell.minesAroundCount = setMinesNegsCount(cellIdx[ 0 ], cellIdx[ 1 ], gBoard);
    clickedCell.isShown = true;
    console.log('clicked cell is:', cellIdx)
    renderBoard(gBoard);
}

function renderCell(location, value)
{
    // Select the elCell and set the value
    var strHTML = '';
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr class="" >`
        for (var j = 0; j < gBoard[ i ].length; j++) {
        }
    }
    var elCell = document.querySelector(`.cell${ location.i }-${ location.j }`);
    elCell.innerHTML = value;
};

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
    return count;
}

function setMinesNegsCount()
{
    // Count mines around each cell and set the cell's minesAroundCount.
    // should run everytime a new cell is clicked
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[ i ].length; j++) {
            gBoard[ i ][ j ].minesAroundCount = countMines(i, j, gBoard);
        }
    }
}


function randomCellMine()
{
    //board[row][column]
    board[ randInt(0, gBoard.length) ][ randInt(0, gBoard[ 0 ].length) ].isMine = true;
}



function cellMarked(elCell)
{
    // https://www.w3schools.com/jsref/event_oncontextmenu.asp
    // Called on right click to mark a cell (suspected to be a mine) Search the web (and implement) how to hide the context menu on right click
    const noRightClick = document.querySelector("td");
    noRightClick.addEventListener("contextmenu", e => e.preventDefault());
    if (elCell === '') elCell.innerText = FLAG;
}

function expandShown(board, elCell, i, j)
{
    // When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors.NOTE: start with a basic implementation that only opens the non - mine 1st degree neighbors 

}

function checkGameOver()
{
    // Game ends when all mines are marked, and all the other cells are shown
    var cell = gBoard[ i ][ j ];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[ i ].length; j++) {

        }
    }
    gGame.isOn = false;
    stopTimer()
}

function endGame()
{
    console.log('you lose')
    stopTimer();
    // openModal('You lose');
}

function reset()
{
    renderBoard();
    timer.innerText = '00:00';
    startTimer();

}

// function openModal(msg)
// {

    //     var elModal = document.querySelector('.modal');
    //     elModal.style.display = 'block';
    // elModal.innerText = msg;
    // }

    // function closeModal()
    // {
        //     // hide the modal
        //     var elModal = document.querySelector('.modal');
        //     elModal.style.display = 'none';
        // }


// <div class="modal">
//     <button onclick="closeModal()">x</button>
//     <h3><span></span></h3>
// </div>