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

class App {
    constructor() {
        this.connectNewBookButton();
        this.connectCloseModalButtons();
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
}

const app = new App();