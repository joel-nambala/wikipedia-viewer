'use strict';

const form = document.querySelector('.form');
const resultsDOM = document.querySelector('.search-results');
const formInput = document.querySelector('.form-input');

const api =
  'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';

const curId = 'https://en.wikipedia.org/?curid=';

const getSearchResult = async function (query) {
  resultsDOM.innerHTML = '';

  const response = await fetch(
    `https://api.codetabs.com/v1/proxy/?quest=${api}${query}`
  );
  const data = await response.json();
  const result = data.query.pages;

  // Loop over the object
  for (const [id, { extract, pageid, title }] of Object.entries(result)) {
    const html = `
        <div class="results">
        <a href="${curId}${pageid}" class="results-title" target="_blank">${title}</a>
        <p class="results-text">${extract}</p>
        </div>
        `;

    resultsDOM.insertAdjacentHTML('beforeend', html);
  }
};

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const input = formInput.value;
  if (!input) return;
  getSearchResult(input);

  formInput.value = '';
});
