const library = [];

function Book(title, author, haveRead) {
    this.title = title;
    this.author = author;
    this.haveRead = haveRead; 
}

function addBookToLibrary(title, author, haveRead) {
    const book = new Book(title, author, haveRead);

    library.push(book);
}