// Select elements
const form = document.querySelector('form');
const titleInput = document.querySelector('#title');
const linkInput = document.querySelector('#link');
const summaryInput = document.querySelector('#summary');
const linksList = document.querySelector('#links-list');
const toggleArchivedBtn = document.querySelector('#toggle-archived');
const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
const entriesTitle = document.querySelector('h2');


// Create an empty array to hold entries
let entries = [];
let isEditMode = false;
let entryIndex = -1;


// Check if there are entries in localStorage
if (localStorage.getItem('entries')) {
  entries = JSON.parse(localStorage.getItem('entries'));
  entries = entries.map(entry => ({ ...entry, archived: entry.archived || false }));
}

// Display entries without archived items
displayEntries(false);

// Function to add entry
function addEntry(event) {
  const title = titleInput.value;
  const link = linkInput.value;
  const summary = summaryInput.value;
  const categories = Array.from(categoryCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  if (!title || !link || !summary) {
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

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('bg-yellow-500', 'hover:bg-yellow-700', 'text-white', 'font-bold', 'py-1', 'px-2', 'rounded', 'focus:outline-none', 'focus:shadow-outline', 'ml-2');
    editButton.onclick = (function(entry) {
      return function() {
        editEntry(entry);
      };
    })(entry);

    listItem.appendChild(linkTitle);
    listItem.appendChild(linkLink);
    listItem.appendChild(linkSummary);
    listItem.appendChild(archiveButton);
    listItem.appendChild(editButton);
    listItem.appendChild(categoryList);

    linksList.appendChild(listItem);
  });
}

// Function to edit entry
function editEntry(entryToEdit) {
  isEditMode = true;
  entryIndex = entries.findIndex(entry => entry === entryToEdit);
  const entry = entries[entryIndex];
  titleInput.value = entry.title;
  linkInput.value = entry.link;
  summaryInput.value = entry.summary;
  categoryCheckboxes.forEach(checkbox => checkbox.checked = entry.categories.includes(checkbox.value));
  form.querySelector('[type="submit"]').textContent = 'Save Entry';
  // Remove the form's submit event listener to prevent multiple submissions
  form.removeEventListener('submit', handleSubmit);
  form.addEventListener('submit', saveEntry);
}

function saveEntry(event) {
    // Update the entry with the new values from the input fields
    entries[entryIndex].title = titleInput.value;
    entries[entryIndex].link = linkInput.value;
    entries[entryIndex].summary = summaryInput.value;
    entries[entryIndex].categories = Array.from(categoryCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
  
    // Reset the state
    isEditMode = false;
    form.querySelector('[type="submit"]').textContent = 'Add Entry';
    entryIndex = -1;
  
    // Update localStorage and display the entries
    localStorage.setItem('entries', JSON.stringify(entries));
    displayEntries(toggleArchivedBtn.textContent === 'Hide Archived Entries');
  
    // Reattach the form's submit event listener
    form.addEventListener('submit', handleSubmit);
  }
  
