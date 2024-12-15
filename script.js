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
        this.connectAddBookButton();
    }

    fetchBook() {
        const title = document.querySelector("input[name='title']").value;
        const author = document.querySelector("input[name='author']").value;
        const haveRead = document.querySelector("input[name='have-read']").checked;

        if (title === "" || author === "") {
            alert("Invalid Input");
            return false;
        } else {
            return new Book(title, author, haveRead);
        }
    }

    connectAddBookButton() {
        const addBookButton = document.getElementById("confirm-modal");

        addBookButton.addEventListener("click", () => {
            const book = this.fetchBook();
            if (book) {
                this.library.push(book);
                console.log(this.library);
                Modal.closeModal();
            }
        });
    }
}

class App {
    static init() {
        const library = new Library();

        App.openNewBookModal();
        App.closeNewBookModal();
    }

    static openNewBookModal() {
        const newBookButton = document.getElementById("new-book-button");
        newBookButton.addEventListener("click", Modal.toggleModal);
    }

    static closeNewBookModal() {
        const cancelButton = document.getElementById("cancel-modal");
        const backdropElement = document.getElementById("backdrop");

        cancelButton.addEventListener("click", Modal.closeModal);
        backdropElement.addEventListener("click", Modal.closeModal);
    }
}

App.init();