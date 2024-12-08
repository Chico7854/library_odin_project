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

const addBookToLibrary = function(title, author, haveRead) {
    const book = new Book(title, author, haveRead);

    library.push(book);
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
}

const checkUserInput = function() {
    const bookTitle = document.querySelector("input[name='title']").value;
    const bookAuthor = document.querySelector("input[name='author']").value;

    if (bookTitle === '' || bookAuthor === '') {
        return false;
    } else {
        return true;
    }
}

const addBookHandler = function() {
    const isInputValid = checkUserInput();
    if (!isInputValid) return;
    // updateLibraryUI();
}

openModalButton.addEventListener("click", openModalHandler);
backdrop.addEventListener("click", closeModalHandler);
cancelButton.addEventListener("click", closeModalHandler);
confirmButton.addEventListener("click", addBookHandler);