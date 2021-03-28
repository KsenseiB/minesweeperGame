var check = () => console.log('this is clicked all is good yo');

const randInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const updateLives = () => document.querySelector('.lives').innerHTML = lives;

const reset = () => initGame();

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

const getCell = (i, j) =>
{
    var cell = null;
    try {
        cell = gBoard[ i ][ j ];
    } catch (e) { }

    return cell;
}

// window.addEventListener("contextmenu", e => { e.preventDefault() };

