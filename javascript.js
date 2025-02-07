// const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    toggleRead() {
        if (this.read === true) {
            this.read = false;
        }
        else {
            this.read = true;
        }
    }
}


class Library {
    constructor() {
        this.allBooks = [];
    }

    addBook(title, author, pages, read) {
        let newBook = new Book(title, author, pages, read);
        this.allBooks.push(newBook);
    }

    // Should be under UI
    displayBooks() {
        let indexCounter = 0;
        const libraryContainer = document.querySelector("#libraryContainer");
        libraryContainer.replaceChildren();
        for (let book of this.allBooks) {
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
                readStatus.textContent = "You have read this book";
            }
            else {
                readStatus.textContent = "You have not read this book";
            }
            bookContainer.appendChild(readStatus);

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("btnBook");
            deleteBtn.setAttribute("ID", "deleteBtn");
            deleteBtn.textContent = "Delete Book";
            bookContainer.appendChild(deleteBtn);

            deleteBtn.addEventListener("click", (e) => {
                this.allBooks.splice(e.currentTarget.parentNode.id, 1);
                this.displayBooks();
            });

            const readBtn = document.createElement("button");
            readBtn.classList.add("btnBook");
            readBtn.setAttribute("ID", "readBtn");
            readBtn.textContent = "Toggle Read";
            bookContainer.appendChild(readBtn);

            readBtn.addEventListener("click", (e) => {
                console.log(e.currentTarget.parentNode.id);
                this.allBooks[e.currentTarget.parentNode.id].toggleRead();
                this.displayBooks();
            });
        }   
    }
}

// UI
const addBookBtn = document.querySelector("[data-open-modal]");
const dialogBox = document.querySelector("[data-modal]");
const submitBookBtn = document.querySelector("[data-close-modal]");

addBookBtn.addEventListener("click", () => {
    dialogBox.showModal();
});

const newBookForm = document.querySelector("#newBookForm");

newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formdata = new FormData(newBookForm);
    const newBook = Object.fromEntries(formdata);
    
    myLibrary.addBook(newBook.title, newBook.author, newBook.pages, newBook.read);
    myLibrary.displayBooks();
    dialogBox.close();
    newBookForm.reset();
});


// Init
const myLibrary = new Library();

myLibrary.addBook("The Hobbit", "J.R.R. Tolkien", 295, false);
myLibrary.addBook("Harry Potter and the Philosopher's Stone", "J. K. Rowling", 223, true);

myLibrary.displayBooks();