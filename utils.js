var check = () => console.log('this is clicked all is good yo');

// function printMat(mat, selector)
// {
//     var strHTML = '<table border="0"><tbody>';
//     for (var i = 0; i < mat.length; i++) {
//         strHTML += '<tr>';
//         for (var j = 0; j < mat[ 0 ].length; j++) {
//             var cell = mat[ i ][ j ];
//             var className = 'cell cell' + i + '-' + j;
//             strHTML += '<td class="' + className + '" onclick="check()"><span> ' + cell + '</span> </td>';
//         }
//         strHTML += '</tr>'
//         // console.log(strHTML);
//     }
//     strHTML += '</tbody></table>';
//     var elContainer = document.querySelector(selector);
//     elContainer.innerHTML = strHTML;
// };


function randInt(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
};


function renderCell(location, value)
{
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${ location.i }-${ location.j }`);
    elCell.innerHTML = value;
};

//timer
function getTime()
{
    return new Date().toString().split(' ')[ 4 ];
};
// function start()
// {
//     gInterval = setInterval(moveBalloons, 1000);
// }


// Neighbours
// for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
//     if (i < 0 || i > mat.length - 1) continue
//     for (var j = colIdx - 1; j <= colIdx + 1; j++) {
//         if (j < 0 || j > mat[ 0 ].length - 1) continue
//         if (i === rowIdx && j === colIdx) continue
//     }
// };


// function cellClicked(elCell, i, j)
// {
//     // if (elCell.innerText === LIFE)   // If elCell
//     // if (elCell.classList.contains('occupied')) 
//     if (gBoard[ i ][ j ] === LIFE) {
//         // Update the Model:
//         gBoard[ i ][ j ] = SUPER_LIFE;
//         // Update the DOM:
//         elCell.innerText = SUPER_LIFE;
//         blowUpNegs(i, j, gBoard)
//     }
// }

// function countNeighbors(cellI, cellJ, mat)
// {
//     var neighborsCount = 0;
//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= mat.length) continue;
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (i === cellI && j === cellJ) continue;
//             if (j < 0 || j >= mat[ i ].length) continue;
//             // if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE) neighborsCount++;
//             if (mat[ i ][ j ]) neighborsCount++;
//         }
//     }
//     return neighborsCount;
// }

//window.addEventListener("contextmenu", e => e.preventDefault());
