const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
// Book.prototype.info = function() {
//     return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
// }

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook);
}

function displayBooks() {
    const libraryContainer = document.querySelector("#libraryContainer");
    for (let book of myLibrary) {
        const bookContainer = document.createElement("div");
        bookContainer.classList.add("book");
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
        pages.textContent = book.pages;
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
    }
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Harry Potter and the Philosopher's Stone", "J. K. Rowling", 223, true);

displayBooks();