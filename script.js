import { quotesApi } from './utils/api-quotes.js';

const quoteEl = document.querySelector('#quote');
const quoteTextContainer = document.querySelector('.quote-text');
const authorEl = document.querySelector('#author');
const newQuoteBtn = document.querySelector('.button-new-quote');
const copyToClipboardBtn = document.querySelector('.button-copy');
const tweetBtn = document.querySelector('#twitter');

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
    const quoteObj = await response.json();
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
  // make font size smaller for longer quotes
  if (quote.length > 90) {
    quoteTextContainer.classList.add('quote-long');
  } else {
    quoteTextContainer.classList.remove('quote-long');
  }
  quoteEl.textContent = quote;
  authorEl.textContent = author;
};

const copyToClipboard = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(state.quote);
  }
};

const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${state.quote} - ${state.author}`;
  window.open(twitterUrl, '_blank');
};

// event listeners
newQuoteBtn.addEventListener('click', function () {
  getNewQuote();
});

copyToClipboardBtn.addEventListener('click', function () {
  copyToClipboard();
});

tweetBtn.addEventListener('click', function () {
  tweetQuote();
});

// on load
displayQuote();
