const bookTitle = document.querySelector('#book-title');
const bookAuthor = document.querySelector('#book-author');
const addButton = document.querySelector('.add-btn');
const container = document.querySelector('.book-list');

function setLocalStorage(books) {
  const updateBooks = JSON.stringify(books);
  localStorage.setItem('Books', updateBooks);
}

function getLocalslStorage() {
  const storedBooks = localStorage.getItem('Books');
  if (storedBooks !== null) {
    return JSON.parse(storedBooks);
  }
  return [];
}

const bookList = getLocalslStorage();

function displayBook() {
  container.innerHTML = '';
  for (let i = 0; i < bookList.length; i += 1) {
    const book = bookList[i];
    const maindiv = document.createElement('div');
    const h2 = document.createElement('p');
    const p = document.createElement('p');
    const removeButton = document.createElement('button');
    removeButton.addEventListener('click', () => {
      bookList.splice(i, 1);
      setLocalStorage(bookList);
      displayBook(bookList);
    });
    const bar = document.createElement('hr');
    h2.innerHTML = book.title;
    p.innerHTML = book.author;
    removeButton.innerHTML = 'remove';
    maindiv.appendChild(h2);
    maindiv.appendChild(p);
    maindiv.appendChild(removeButton);
    maindiv.appendChild(bar);
    container.appendChild(maindiv);
  }
}

displayBook();

function addBook(e) {
  e.preventDefault();
  if (bookTitle.value.trim() !== '' && bookAuthor.value.trim() !== '') {
    const list = {
      title: bookTitle.value,
      author: bookAuthor.value,
    };

    bookList.push(list);
    setLocalStorage(bookList);
    displayBook(bookList);
  }
}
addButton.addEventListener('click', addBook);
