const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    if (this.read === true) {
        this.read = false;
    }
    else {
        this.read = true;
    }
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook);
}

function displayBooks() {
    let indexCounter = 0;
    const libraryContainer = document.querySelector("#libraryContainer");
    libraryContainer.replaceChildren();
    for (let book of myLibrary) {
        const bookContainer = document.createElement("div");
        bookContainer.classList.add("book");
        bookContainer.setAttribute("ID", indexCounter);
        indexCounter++;
        libraryContainer.appendChild(bookContainer);

        const title = document.createElement("h2");
        title.classList.add("bookTitle");
        title.textContent = book.title;
        bookContainer.appendChild(title);

        const author = document.createElement("p");
        author.classList.add("bookAuthor");
        author.textContent = book.author;
        bookContainer.appendChild(author);

        const pages = document.createElement("p");
        pages.classList.add("bookPages");
        pages.textContent = book.pages + " pages";
        bookContainer.appendChild(pages);

        const readStatus = document.createElement("p");
        readStatus.classList.add("bookRead");
        if (book.read === true) {
            readStatus.textContent = "Have read";
        }
        else {
            readStatus.textContent = "Have not read";
        }
        bookContainer.appendChild(readStatus);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.textContent = "Delete Book";
        bookContainer.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", (e) => {
            myLibrary.splice(e.currentTarget.parentNode.id, 1);
            displayBooks();
        });

        const readBtn = document.createElement("button");
        readBtn.textContent = "Toggle Read";
        bookContainer.appendChild(readBtn);

        readBtn.addEventListener("click", (e) => {
            console.log(e.currentTarget.parentNode.id);
            myLibrary[e.currentTarget.parentNode.id].toggleRead();
            displayBooks();
        });
    }
}

const addBookBtn = document.querySelector("[data-open-modal]");
const dialogBox = document.querySelector("[data-modal]");
const submitBookBtn = document.querySelector("[data-close-modal]");

addBookBtn.addEventListener("click", () => {
    dialogBox.showModal();
});

submitBookBtn.addEventListener("click", () => {
    const valueTitle = document.getElementById("bookTitle").value;
    const valueAuthor = document.getElementById("bookAuthor").value;
    const valuePages = document.getElementById("bookPages").value;
    let valueRead = false;
    if (document.querySelector('#bookRead:checked')) {
        valueRead = true;
    }
    
    addBookToLibrary(valueTitle, valueAuthor, valuePages, valueRead);
    displayBooks();
    dialogBox.close();
});


addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Harry Potter and the Philosopher's Stone", "J. K. Rowling", 223, true);

displayBooks();