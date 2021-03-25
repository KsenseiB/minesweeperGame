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

window.addEventListener("contextmenu", e => e.preventDefault());

