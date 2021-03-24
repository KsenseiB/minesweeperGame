'use strict';
const FLAG = '🚩';
const MINE = '💣';
const IMOJI = '🤓';

var minesAroundCount;
var gBoard; // model
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

function initGame()
{
    // board needs to be created only after first click
    
    var gBoard = buildBoard(4);
    console.log(board);
    renderBoard(board, '.board-container');
}

function buildBoard(size)
{
    // Set mines at random locations Call setMinesNegsCount() Return the created board
    var mineCount = 0;
    var SIZE = size;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[ i ][ j ] = '';
        }
    }
    // if (mineCount < 2) board[ randInt(0, 15) ][ randInt(0, 15) ] = MINE;
    return board;
}

function setMinesNegsCount(board)
{
    // Count mines around each cell and set the cell's minesAroundCount.

}

function renderBoard(board, selector)
{
    // Render the board as a <table> to the page
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[ 0 ].length; j++) {
            var cell = board[ i ][ j ];
            var className = 'cell cell' + i + '-' + j;
            strHTML += '<td class="' + className + '" onclick="check()"><span> ' + cell + '</span> </td>';
        }
        strHTML += '</tr>'
        // console.log(strHTML);
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

function cellClicked(elCell, i, j)
{
    // Called when a cell(td) is clicked
    if (gGame.markedCount === 0) {
        gBoard[ i ][ j ] = '';
        //start counter
    };
    if (gBoard[ i ][ j ] === '') 
}

function cellMarked(elCell)
{
    // Called on right click to mark a cell (suspected to be a mine) Search the web (and implement) how to hide the context menu on right click
    const noRightClick = document.getElementId("td");
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
}


// function openModal()
// {
//     // show the modal and schedule its closing
//     var elModal = document.querySelector('.modal');
//     elModal.style.display = 'block';
//     setTimeout(closeModal, 5000);

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