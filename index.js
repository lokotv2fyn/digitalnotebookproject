// Select elements
const form = document.querySelector('form');
const titleInput = document.querySelector('#title');
const linkInput = document.querySelector('#link');
const summaryInput = document.querySelector('#summary');
const linksList = document.querySelector('#links-list');
const toggleArchivedBtn = document.querySelector('#toggle-archived');
const categoryCheckboxes = document.querySelectorAll('input[name="category"]');

// Create an empty array to hold entries
let entries = [];

// Check if there are entries in localStorage
if (localStorage.getItem('entries')) {
  entries = JSON.parse(localStorage.getItem('entries'));
  entries = entries.map(entry => ({ ...entry, archived: entry.archived || false }));
}

// Display entries without archived items
displayEntries(false);

// Function to add entry
function addEntry(event) {
  event.preventDefault();

  const title = titleInput.value;
  const link = linkInput.value;
  const summary = summaryInput.value;
  const categories = Array.from(categoryCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  if (!title || !link || !summary || categories.length === 0) {
    return;
  }

  const entry = { title, link, summary, categories, archived: false };

  entries.push(entry);
  entries.sort((a, b) => a.title.localeCompare(b.title));

  titleInput.value = '';
  linkInput.value = '';
  summaryInput.value = '';
  categoryCheckboxes.forEach(checkbox => (checkbox.checked = false));

  displayEntries(false);

  localStorage.setItem('entries', JSON.stringify(entries));
}

function archiveEntry(entryToArchive) {
  const index = entries.findIndex(entry => entry === entryToArchive);
  entries[index].archived = !entries[index].archived;
  localStorage.setItem('entries', JSON.stringify(entries));
  displayEntries(toggleArchivedBtn.textContent === 'Hide Archived Entries');
}

function displayEntries(showArchived) {
  const filteredEntries = entries.filter(entry => entry.archived === showArchived);
  linksList.innerHTML = '';

  if (filteredEntries.length === 0) {
    return;
  }

  filteredEntries.forEach((entry, index) => {
    const listItem = document.createElement('li');
    const linkTitle = document.createElement('h3');
    const linkLink = document.createElement('a');
    const linkSummary = document.createElement('p');
    const archiveButton = document.createElement('button');

    linkTitle.textContent = entry.title;
    linkTitle.classList.add('text-lg', 'font-bold', 'mb-1');
    linkLink.textContent = entry.link;
    linkLink.href = entry.link;
    linkLink.target = '_blank';
    linkLink.classList.add('text-blue-500', 'underline', 'hover:text-blue-700');
    linkSummary.textContent = entry.summary;
    linkSummary.classList.add('text-gray-400');
    archiveButton.textContent = entry.archived ? 'Unarchive' : 'Archive';
    archiveButton.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-1', 'px-2', 'rounded', 'focus:outline-none', 'focus:shadow-outline', 'ml-2');

    // Add a closure for the archiveButton.onclick function
    archiveButton.onclick = (function(entry) {
      return function() {
        archiveEntry(entry);
      };
    })(entry);

    const categoryList = document.createElement('ul');
    categoryList.classList.add('list-disc', 'list-inside', 'mt-2');
    entry.categories.forEach(category => {
      const categoryItem = document.createElement('li');
      categoryItem.textContent = category;
      categoryList.appendChild(categoryItem);
    });

    listItem.appendChild(linkTitle);
    listItem.appendChild(linkLink);
    listItem.appendChild(linkSummary);
    listItem.appendChild(archiveButton);
    listItem.appendChild(categoryList); // Add the categoryList to the listItem

    linksList.appendChild(listItem);
  });
}

function archiveEntry(entryToArchive) {
  const index = entries.findIndex(entry => entry === entryToArchive);
  entries[index].archived = !entries[index].archived;
  localStorage.setItem('entries', JSON.stringify(entries));
  displayEntries(toggleArchivedBtn.textContent === 'Hide Archived Entries');
}


function toggleArchivedEntries() {
  const showingArchived = toggleArchivedBtn.textContent === 'Hide Archived Entries';
  toggleArchivedBtn.textContent = showingArchived ? 'Show Archived Entries' : 'Hide Archived Entries';
  displayEntries(!showingArchived);
}

form.addEventListener('submit', addEntry);

// Add the clearEntries function
function clearEntries() {
  entries = [];
  localStorage.removeItem('entries');
  displayEntries(false);
}

// Add an event listener for the Clear Entries button
const clearEntriesBtn = document.querySelector('#clear-entries');
clearEntriesBtn.addEventListener('click', clearEntries);