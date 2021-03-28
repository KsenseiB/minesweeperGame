var timer = document.querySelector('.time');
var timerInterval;

function startTimer()
{
    if (!gGame.isOn || (gGame.secsPassed !== 0)) return;

    var second = 0,
        minute = 0,

    timerInterval = setInterval(function ()
    {
        timer.innerHTML =
            (minute < 10 ? '0' + minute : minute) +
            ':' +
            (second < 10 ? '0' + second : second);

        second++;

        if (second == 60) {
            minute++;
            second = 0;
        }

    }, 1000);
};

const stopTimer = () => clearInterval(timerInterval);;