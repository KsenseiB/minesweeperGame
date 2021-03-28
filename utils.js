var check = () => console.log('this is clicked all is good yo');

const randInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

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

const reset = () => initGame();

const getCell = (i, j) =>
{
    var cell = null;
    try {
        cell = gBoard[ i ][ j ];
    } catch (e) { }

    return cell;
}


// TODO: erase
// const neighborCells = (x, y) =>
// {
//     return [
//         [ x - 1, y - 1 ],
//         [ x, y - 1 ],
//         [ x + 1, y - 1 ],
//         [ x - 1, y ],
//         [ x + 1, y ],
//         [ x - 1, y + 1 ],
//         [ x, y + 1 ],
//         [ x + 1, y + 1 ]
//     ]
// }


// window.addEventListener("contextmenu", e => { e.preventDefault() };

