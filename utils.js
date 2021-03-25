var check = () => console.log('this is clicked all is good yo');

function createMat(SIZE)
{
    var mat = [];
    for (var i = 0; i < SIZE; i++) {
        var row = [];
        for (var j = 0; j < SIZE; j++) {
            row.push('');
        }
        mat.push(row);
    }
    return mat;
}


const randInt=(min, max) => Math.floor(Math.random() * (max - min)) + min;


// Neighbours
// for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
//     if (i < 0 || i > mat.length - 1) continue
//     for (var j = colIdx - 1; j <= colIdx + 1; j++) {
//         if (j < 0 || j > mat[ 0 ].length - 1) continue
//         if (i === rowIdx && j === colIdx) continue
//     }
// };

// function SumNeighbors(cellI, cellJ, mat)
// {
//     var neighborsSum = 0;
//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= mat.length) continue;
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (j < 0 || j >= mat[ i ].length) continue;
//             if (i === cellI && j === cellJ) continue;
//             if (mat[ i ][ j ] === LIFE || mat[ i ][ j ] === SUPER_LIFE) neighborsSum++;
//         }
//     }
//     return neighborsSum;
// }




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
