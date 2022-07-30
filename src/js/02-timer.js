import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('[data-start]');
btnStart.setAttribute('disabled', 'disabled');

const textInput = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let delta = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    delta = selectedDates[0] - options.defaultDate;

    if (delta < 0) {
      btnStart.setAttribute('disabled', 'disabled');
      Notify.failure('Please, choose a date in the future');
    } else if (delta > 0) {
      return btnStart.removeAttribute('disabled', 'disabled');
    }
  },
};

flatpickr(textInput, options);
// -------------------------------------------------------------
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
// --------------------------------------------------------------------

btnStart.addEventListener('click', onClick);

let timerId = null;

function onClick() {
  timerId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(delta);
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
    if (delta <= 0) {
      clearInterval(timerId);
    }
  }, options.minuteIncrement);
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
// ---------------------------------------------------
function start() {
  if (!options.enableTime) {
    return;
  }
  options.enableTime = false;
  //  startBtn.setAttribute('disabled', 'disabled');
  onClick(convertMs(delta));
}

function interval() {
  delta -= options.minuteIncrement;
  onClick(convertMs(delta));
}

interval();
// start();
// ------------------------------------------------
