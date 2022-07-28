const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let timerId = null;

btnStart.addEventListener('click', onClickStart);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onClickStart() {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();

    btnStart.setAttribute('disabled', 'disabled');
    btnStop.removeAttribute('disabled', 'disabled');
  }, 1000);
}

btnStop.addEventListener('click', onClickStop);

function onClickStop() {
  btnStart.removeAttribute('disabled', 'disabled');
  btnStop.setAttribute('disabled', 'disabled');

  clearInterval(timerId);
}
