// Select elements
const form = document.querySelector('form');
const titleInput = document.querySelector('#title');
const linkInput = document.querySelector('#link');
const summaryInput = document.querySelector('#summary');
const linksList = document.querySelector('#links-list');
const toggleArchivedBtn = document.querySelector('#toggle-archived');
const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
const entriesTitle = document.querySelector('h2');
const sidebarCategories = document.querySelector('#sidebar-categories');
const burgerMenu = document.querySelector('#burger-menu');
const closeMenu = document.querySelector('#close-menu');


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
  if (isEditMode) {
    return;
  }
  const title = titleInput.value;
  const link = linkInput.value;
  const summary = summaryInput.value;
  const categories = Array.from(categoryCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  if (!title || !link || !summary) {
    return;
  }

  const entry = { title, link, summary, categories, archived: false, read: false };


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
    const readToggleButton = document.createElement('button');

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
    readToggleButton.textContent = entry.read ? 'Read: Yes' : 'Read: No';
    readToggleButton.classList.add('bg-green-500', 'hover:bg-green-700', 'text-white', 'font-bold', 'py-1', 'px-2', 'rounded', 'focus:outline-none', 'focus:shadow-outline', 'ml-2');


    // Add a closure for the archiveButton.onclick function
    archiveButton.onclick = (function(entry) {
      return function() {
        archiveEntry(entry);
      };
    })(entry);

    readToggleButton.onclick = (function (entry) {
      return function () {
        toggleReadStatus(entry);
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
    listItem.appendChild(readToggleButton);

    linksList.appendChild(listItem);
  });
}

function toggleReadStatus(entryToToggle) {
  const index = entries.findIndex((entry) => entry === entryToToggle);
  entries[index].read = !entries[index].read;
  localStorage.setItem('entries', JSON.stringify(entries));
  displayEntries(toggleArchivedBtn.textContent === 'Hide Archived Entries');
}


function toggleArchivedEntries() {
  const showingArchived = toggleArchivedBtn.textContent === 'Hide Archived Entries';
  toggleArchivedBtn.textContent = showingArchived ? 'Show Archived Entries' : 'Hide Archived Entries';
  entriesTitle.textContent = showingArchived ? 'Links to Read' : 'Archived Entries';
  displayEntries(!showingArchived);
}

function clearEntries() {
  entries = [];
  localStorage.removeItem('entries');
  displayEntries(false);
}

// Add an event listener for the Clear Entries button
const clearEntriesBtn = document.querySelector('#clear-entries');
clearEntriesBtn.addEventListener('click', clearEntries);

// Add an event listener for the form's submit event
form.addEventListener('submit', handleSubmit);


// Function to handle the form's submit event
function handleSubmit(event) {
  event.preventDefault();

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

  if (entryIndex !== -1) {
    entries[entryIndex] = entry;
  } else {
    entries.push(entry);
  }

  entries.sort((a, b) => a.title.localeCompare(b.title));

  // Reset the state
  entryIndex = -1;
  isEditMode = false; // Add this line
  form.querySelector('[type="submit"]').textContent = 'Add Entry';

  // Reset the form and display the entries
  form.reset();
  localStorage.setItem('entries', JSON.stringify(entries));
  displayEntries(toggleArchivedBtn.textContent === 'Hide Archived Entries');
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
}

// Function to save edited entry
function saveEntry() {
  // Update the entry with the new values from the input fields
  entries[entryIndex].title = titleInput.value;
  entries[entryIndex].link = linkInput.value;
  entries[entryIndex].summary = summaryInput.value;
  entries[entryIndex].categories = Array.from(categoryCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

    if (!title || !link || !summary) {
      return;
    }

  // Reset the state
  isEditMode = false;
  

  // Update localStorage and display the entries
  localStorage.setItem('entries', JSON.stringify(entries));
  displayEntries(toggleArchivedBtn.textContent === 'Hide Archived Entries');
}

function populateSidebarCategories() {
  const categories = Array.from(categoryCheckboxes).map((checkbox) => checkbox.value);
  categories.forEach((category) => {
    const listItem = document.createElement('li');
    listItem.textContent = category;
    listItem.classList.add('text-white', 'mb-2');
    sidebarCategories.appendChild(listItem);
  });
}
populateSidebarCategories();

// Add this code to the bottom of your JavaScript, after the populateSidebarCategories function
burgerMenu.addEventListener('click', () => {
  const nav = document.querySelector('nav');
  nav.classList.toggle('hidden');
  nav.classList.toggle('menu-open');
});

// Add this function to your JavaScript, after the existing burgerMenu event listener
function closeMenuOnOutsideClick(e) {
  const nav = document.querySelector('nav');
  if (
    !nav.classList.contains('hidden') &&
    e.target !== burgerMenu &&
    e.target !== closeMenu &&
    !nav.contains(e.target)
  ) {
    nav.classList.add('hidden');
    nav.classList.remove('menu-open');
  }
}

// Add this code to the bottom of your JavaScript, after the closeMenuOnOutsideClick function
closeMenu.addEventListener('click', () => {
  const nav = document.querySelector('nav');
  nav.classList.add('hidden');
  nav.classList.remove('menu-open');
});

document.addEventListener('click', closeMenuOnOutsideClick);

