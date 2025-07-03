const ROLL_NUMBER = "27100398";  //6-digit roll number

const new_entry = document.querySelector("#bookForm");

new_entry.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const coverImageUrl = document.getElementById("cover").value;
    const price = parseInt(document.getElementById("price").value);

    const bookData = { title, author, coverImageUrl, price };

    fetch(`https://assignment3.rohanhussain.com/api/books/${ROLL_NUMBER}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData)
    })
        .then(response =>
            response.json().then(data => {
                if (!response.ok) {
                    throw new Error(data.message || "Failed to add book.");
                }
                return data;
            })
        )
        .then(data => {
            alert("Book added!");
            console.log(bookData)
            window.location.reload();  // Reload to show updated catalog
        })
        .then(data => {
            console.log("API data:", data);
        });

})
   

const List_of_books = document.querySelector("#bookList");

fetch(`https://assignment3.rohanhussain.com/api/books/${ROLL_NUMBER}`)
    .then(response =>
        response.json().then(data => {
            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch books.");
            }
            return data;
        })
    )
    .then(data => {

        const books = data.result?.books || [];

        if (!Array.isArray(books) || books.length === 0) {
            List_of_books.innerHTML = "<p>No books in catalog yet.</p>";
            return;
        }

        books.forEach(book => {
            const card = document.createElement("div");
            card.innerHTML = `
        <img src="${book.coverImageUrl}" alt="${book.title}" width="100">
        <h3>${book.title}</h3>
        <p>by ${book.author}</p>
        <p>PKR ${book.price}</p>
        <hr>
    `;
            List_of_books.appendChild(card);
        });

    })
    .catch(error => {
        console.error("Fetch error:", error.message);
        List_of_books.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    });

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
    const query = document.getElementById("searchInput").value;

    fetch(`https://assignment3.rohanhussain.com/api/books/${ROLL_NUMBER}/search?query=${encodeURIComponent(query)}`)
        .then(response =>
            response.json().then(data => {
                if (!response.ok) {
                    throw new Error(data.message || "Search failed.");
                }
                return data;
            })
        )
        .then(data => {
            List_of_books.innerHTML = "";

            const books = data.result?.books || [];

            if (!Array.isArray(books) || books.length === 0) {
                List_of_books.innerHTML = "<p>No matching books found.</p>";
                return;
            }

            books.forEach(book => {
                const card = document.createElement("div");
                card.innerHTML = `
            <img src="${book.coverImageUrl}" alt="${book.title}" width="100">
            <h3>${book.title}</h3>
            <p>by ${book.author}</p>
            <p>PKR ${book.price}</p>
            <hr>
        `;
                List_of_books.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Search error:", error.message);
            List_of_books.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
        });
});
