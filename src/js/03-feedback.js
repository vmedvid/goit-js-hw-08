import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const inputEl = formEl.elements.email;
const textareaEl = formEl.elements.message;

const LOCALSTORAGE_KEY = 'feedback-form-state';

inputEl.value = load(LOCALSTORAGE_KEY).email || '';
textareaEl.value = load(LOCALSTORAGE_KEY).message || '';

const inputedData = {
  email: inputEl.value,
  message: textareaEl.value,
};

function save(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function load(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? '' : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

function remove(key) {
  localStorage.removeItem(key);
}

formEl.addEventListener('input', throttle(saveMessage, 500));

function saveMessage(evt) {
  inputedData.email = inputEl.value;
  inputedData.message = textareaEl.value;

  save(LOCALSTORAGE_KEY, inputedData);
}

formEl.addEventListener('submit', submitForm);

function submitForm(evt) {
  evt.preventDefault();

  if (load(LOCALSTORAGE_KEY)) {
    console.log('inputed+submit data:', load(LOCALSTORAGE_KEY));
  } else {
    console.log('inputed+submit data:', { email: '', message: '' });
  }

  remove(LOCALSTORAGE_KEY);

  evt.currentTarget.reset();
}
