import { quotesApi } from './utils/api-quotes.js';

const quoteEl = document.querySelector('#quote');
const authorEl = document.querySelector('#author');
const btnNewQuote = document.querySelector('.button-new-quote');
const btnCopyToClipboard = document.querySelector('.button-copy');

const state = {
  quote:
    'Try not to become a man of success, but rather try to become a man of value.',
  author: 'Albert Einstein',
};

const getNewQuote = async () => {
  const { apiUrl } = quotesApi;
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
    });
    console.log(response);
    const quoteObj = await response.json();
    console.log(quoteObj);
    const { q, a } = quoteObj;
    state.quote = q;
    state.author = a;
    displayQuote();
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

const displayQuote = () => {
  const { quote, author } = state;
  quoteEl.textContent = quote;
  authorEl.textContent = author;
};

const copyToClipboard = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(state.quote);
  }
};

displayQuote();

btnNewQuote.addEventListener('click', function () {
  getNewQuote();
});

btnCopyToClipboard.addEventListener('click', function () {
  copyToClipboard();
});
