const addBookButton = document.getElementById("new-book-button");
const backdrop = document.getElementById("backdrop");
const modalCard = document.getElementById("add-book-modal");

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

const addBookHandler = function() {
    toggleBackdrop();
    toggleModalCard();
}

const closeModalHandler = function() {
    toggleBackdrop();
    toggleModalCard();
}

addBookButton.addEventListener("click", addBookHandler);
backdrop.addEventListener("click", closeModalHandler);