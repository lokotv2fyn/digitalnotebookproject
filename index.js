// Select elements
const form = document.querySelector('form');
const titleInput = document.querySelector('#title');
const linkInput = document.querySelector('#link');
const summaryInput = document.querySelector('#summary');
const linksList = document.querySelector('#links-list');

// Create an empty array to hold entries
let entries = [];

// Check if there are entries in localStorage
if (localStorage.getItem('entries')) {
  entries = JSON.parse(localStorage.getItem('entries'));
}

// Function to add entry
function addEntry(event) {
  // Prevent the form from submitting and reloading the page
  event.preventDefault();

  // Get the input values and create an entry object
  const title = titleInput.value;
  const link = linkInput.value;
  const summary = summaryInput.value;
  const entry = { title, link, summary };

  // Add the entry to the entries array
  entries.push(entry);

  // Sort the entries array alphabetically by title
  entries.sort((a, b) => a.title.localeCompare(b.title));

  // Clear the form inputs
  titleInput.value = '';
  linkInput.value = '';
  summaryInput.value = '';

  // Clear the links list
  linksList.innerHTML = '';

  // Add each entry to the links list
  entries.forEach(entry => {
    const listItem = document.createElement('li');
    const linkTitle = document.createElement('h3');
    const linkLink = document.createElement('a');
    const linkSummary = document.createElement('p');

    linkTitle.textContent = entry.title;
    linkTitle.classList.add('text-lg', 'font-bold', 'mb-1');
    linkLink.textContent = entry.link;
    linkLink.href = entry.link;
    linkLink.target = '_blank';
    linkLink.classList.add('text-blue-500', 'underline', 'hover:text-blue-700');
    linkSummary.textContent = entry.summary;
    linkSummary.classList.add('text-gray-400');

    listItem.appendChild(linkTitle);
    listItem.appendChild(linkLink);
    listItem.appendChild(linkSummary);

    linksList.appendChild(listItem);
  });

  // Save the entries array to localStorage
  localStorage.setItem('entries', JSON.stringify(entries));
}

// Add an event listener to the form
form.addEventListener('submit', addEntry);

// Show the entries from local storage on page load
window.addEventListener('load', () => {
  entries = JSON.parse(localStorage.getItem('entries')) || [];
  entries.forEach(entry => {
    const listItem = document.createElement('li');
    const linkTitle = document.createElement('h3');
    const linkLink = document.createElement('a');
    const linkSummary = document.createElement('p');

    linkTitle.textContent = entry.title;
    linkTitle.classList.add('text-lg', 'font-bold', 'mb-1');
    linkLink.textContent = entry.link;
    linkLink.href = entry.link;
    linkLink.target = '_blank';
    linkLink.classList.add('text-blue-500', 'underline', 'hover:text-blue-700');
    linkSummary.textContent = entry.summary;
    linkSummary.classList.add('text-gray-400');

    listItem.appendChild(linkTitle);
    listItem.appendChild(linkLink);
    listItem.appendChild(linkSummary);

    linksList.appendChild(listItem);
  });
});