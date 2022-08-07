import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const btnRef = document.querySelector('[type="submit"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(ev) {
  ev.preventDefault();

  btnRef.disabled = true;

  let delay = Number(ev.currentTarget.elements.delay.value);
  const step = Number(ev.currentTarget.elements.step.value);
  const amount = Number(ev.currentTarget.elements.amount.value);

  setTimeout(() => {
    btnRef.disabled = false;
  }, amount * step + delay);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
