const openModalButton = document.getElementById("new-book-button");
const backdrop = document.getElementById("backdrop");
const modalCard = document.getElementById("add-book-modal");
const cancelButton = document.getElementById("cancel-modal");
const confirmButton = document.getElementById("confirm-modal");

const library = [];

const Book = function(title, author, haveRead) {
    this.title = title;
    this.author = author;
    this.haveRead = haveRead;
}

const updateLibraryUI = (title, author, haveRead) => {
    const libraryUI = document.getElementById("books");
    const bookElement = document.createElement('li');
    bookElement.classList.add("book");

    const titleElement = document.createElement('h2');
    titleElement.textContent = title;

    const byElement = document.createElement('p');
    byElement.textContent = "by";

    const authorElement = document.createElement('h2');
    authorElement.textContent = author;

    const haveReadElement = document.createElement('h2');
    haveReadElement.textContent = (haveRead) ? "Have Read" : "Didn't Read";

    bookElement.appendChild(titleElement);
    bookElement.appendChild(byElement);
    bookElement.appendChild(authorElement);
    bookElement.appendChild(haveReadElement);

    libraryUI.appendChild(bookElement);
}

const addBookToLibrary = (title, author, haveRead) => {
    const book = new Book(title, author, haveRead);

    library.push(book);

    updateLibraryUI(title, author, haveRead);
}

const toggleBackdrop = function() {
    backdrop.classList.toggle("visible");
}

const toggleModalCard = function() {
    modalCard.classList.toggle("visible");
}

const openModalHandler = function() {
    toggleBackdrop();
    toggleModalCard();
}

const closeModalHandler = function() {
    toggleBackdrop();
    toggleModalCard();
    clearInput();
}

const checkUserInput = function(bookTitle, bookAuthor) {
    if (bookTitle === '' || bookAuthor === '') {
        return false;
    } else {
        return true;
    }
}

const clearInput = function() {
    const bookTitleElement = document.querySelector("input[name='title']");
    const bookAuthorElement = document.querySelector("input[name='author']");
    const haveReadCheckboxElement = document.querySelector("input[name='have-read']");

    bookTitleElement.value = '';
    bookAuthorElement.value = '';
    haveReadCheckboxElement.checked = false;
}

const addBookHandler = function() {
    const bookTitle = document.querySelector("input[name='title']").value;
    const bookAuthor = document.querySelector("input[name='author']").value;
    const haveRead = document.querySelector("input[name='have-read']").checked;

    const isInputValid = checkUserInput(bookTitle, bookAuthor);
    
    if (!isInputValid) {
        alert("Invalid input");
        return;
    }

    closeModalHandler();

    addBookToLibrary(bookTitle, bookAuthor, haveRead);
}

openModalButton.addEventListener("click", openModalHandler);
backdrop.addEventListener("click", closeModalHandler);
cancelButton.addEventListener("click", closeModalHandler);
confirmButton.addEventListener("click", addBookHandler);