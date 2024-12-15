class Modal {
    static backdropElement = document.getElementById("backdrop");
    static modalElement = document.getElementById("add-book-modal");
    static titleInputElement = document.querySelector("input[name='title']");
    static authorInputElement = document.querySelector("input[name='author']");
    static haveReadCheckboxElement = document.querySelector("input[name='have-read']");

    static toggleModal() {
        Modal.modalElement.classList.toggle("visible");
        Modal.backdropElement.classList.toggle("visible");
    }

    static clearModalInputs() {
        Modal.titleInputElement.value = "";
        Modal.authorInputElement.value = "";
        Modal.haveReadCheckboxElement.checked = false;
    }

    static closeModal() {
        Modal.toggleModal();
        Modal.clearModalInputs();
    }
}

class Book {
    constructor(title, author, haveRead) {
        this.title = title;
        this.author = author;
        this.haveRead = haveRead;
    }
}

class Library {
    constructor() {
        this.library = [];
    }

    addBook(title, author, haveRead) {
        const book = new Book(title, author, haveRead);
        this.library.push(book);
        this.updateUI(book);
    }

    updateUI(book) {
        const libraryUI = document.getElementById("books");

        const bookElement = document.createElement("li");
        bookElement.classList.add("book");

        const titleElement = document.createElement("h2");
        titleElement.textContent = book.title;

        const byElement = document.createElement("p");
        byElement.textContent = "by";

        const authorElement = document.createElement("h2");
        authorElement.textContent = book.author;

        const haveReadElement = document.createElement("h2");
        haveReadElement.textContent = (book.haveRead) ? "Have Read" : "Didn't Read";

        bookElement.appendChild(titleElement);
        bookElement.appendChild(byElement);
        bookElement.appendChild(authorElement);
        bookElement.appendChild(haveReadElement);
        libraryUI.appendChild(bookElement);
    }
}

class App {
    constructor() {
        this.library = new Library();

        this.connectNewBookButton();
        this.connectCloseModalButtons();
        this.connectAddBookButton();
    }

    connectNewBookButton() {
        const newBookButton = document.getElementById("new-book-button");
        newBookButton.addEventListener("click", Modal.toggleModal);
    }

    connectCloseModalButtons() {
        const cancelButton = document.getElementById("cancel-modal");

        cancelButton.addEventListener("click", Modal.closeModal);
        Modal.backdropElement.addEventListener("click", Modal.closeModal);
    }

    connectAddBookButton() {
        const addBookButton = document.getElementById("confirm-modal");

        addBookButton.addEventListener("click", () => {
            const title = Modal.titleInputElement.value;
            const author = Modal.authorInputElement.value;
            const haveRead = Modal.haveReadCheckboxElement.checked;
    
            if (title === "" || author === "") {
                alert("Invalid Input");
            } else {
                this.library.addBook(title, author, haveRead);
                console.log(this.library);
                Modal.closeModal();
            }
        });
    }
}

const app = new App();