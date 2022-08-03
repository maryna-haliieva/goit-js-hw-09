import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
startBtn.setAttribute('disabled', 'disabled');

const textInput = document.querySelector('#datetime-picker');

const timer = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let chosenDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDate = selectedDates[0].getTime();
    const deltaDate = chosenDate - Date.now();

    if (deltaDate <= 0) {
      startBtn.setAttribute('disabled', 'disabled');
      Notify.failure('Please, choose a date in the future');
    } else if (deltaDate > 0) {
      return startBtn.removeAttribute('disabled', 'disabled');
    }
  },
};

flatpickr(textInput, options);

startBtn.addEventListener('click', onClick);

function onClick() {
  // startBtn.hasAttribute('disabled', 'disabled') = true;

  // startBtn.hasAttribute.disabled = true;

  let timerId = null;

  timerId = setInterval(() => {
    startBtn.removeAttribute('disabled', 'disabled');
    const deltaDate = chosenDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(deltaDate);
    timer.days.textContent = days;
    timer.hours.textContent = hours;
    timer.minutes.textContent = minutes;
    timer.seconds.textContent = seconds;

    startBtn.disabled = true;

    if (deltaDate <= 0) {
      clearInterval(timerId);
    }
  }, 1000);
}

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
