let myLibrary = []

const addBook = document.getElementById('addBook');
const bookTitle = document.getElementById('bookTitle');
const bookAuthor = document.getElementById('bookAuthor');
const bookPages = document.getElementById('bookPages');
const bookRead = document.getElementById('bookRead');

  const bookTable = document.querySelector('#bookTable > tbody');

addBook.addEventListener('submit', function (e) {
  e.preventDefault();
  let title = bookTitle.value;
  let author = bookAuthor.value;
  let pages = bookPages.value;
  let read = bookRead.checked;

  if( title == '' || author == '' || pages == ''){
    return
  }
  let newBook = new Book(title,author,pages,read);
  addBookToLibrary(newBook);
  addBookToTable(newBook);

  bookTitle.value = '' ;
  bookAuthor.value = '' ;
  bookPages.value = '' ;
  bookRead.checked = false;

})

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function(){
    return title + " by " + author + ", " + pages + " pages," + (read ? "read" : "not read yes");
  }
}

function addBookToLibrary(book){
  myLibrary.push(book);
}


function renderBooks(library){
  library.forEach(addBookToTable);
}

function addBookToTable(book){
  let row = document.createElement('tr');
    let title = document.createElement('td')
    let author = document.createElement('td')
    let pages = document.createElement('td')
    let read = document.createElement('td')
      let readButton = document.createElement('button')
    let deleteRow = document.createElement('td')
      let deleteButton = document.createElement('button')

    title.textContent = book.title
    author.textContent = book.author
    pages.textContent = book.pages
      readButton.textContent = book.read ? "Read" : "Not Read"
      readButton.classList.add("btn"); //= book.read ? "Read" : "Not Read"
      readButton.classList.add(book.read ? "btn-success" : "btn-dark");
      readButton.addEventListener("click", function(){
                                              book.read = !book.read;
                                              readButton.textContent = book.read ? "Read" : "Not Read"
                                              readButton.classList.toggle("btn-success");
                                              readButton.classList.toggle("btn-dark");
                                            });
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("btn")
      deleteButton.classList.add("btn-danger")
      deleteButton.addEventListener("click", function(){
                                              row.remove();
                                              let index = myLibrary.findIndex(function(libraryBook){return libraryBook == book })
                                              myLibrary.splice( index,1);
                                            })
    row.appendChild(title);
    row.appendChild(author);
    row.appendChild(pages);
    row.appendChild(read);
      read.appendChild(readButton);
    row.appendChild(deleteRow);
      deleteRow.appendChild(deleteButton);
    bookTable.appendChild(row);
  // tbody.appendChild(row);
}

const WfE = new Book("Waiting for Eden", " Elliot Ackerman", 192, false)
const GoT = new Book("Game of Thrones", "George R. R. Martin", 694, true);
const WoR = new Book("Words of Radiance", "Brandon Sanderson", 1087, true);
addBookToLibrary(GoT);
addBookToLibrary(WoR);
addBookToLibrary(WfE);

renderBooks(myLibrary);
