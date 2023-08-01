const ByIsbn=(isbn)=>{
    axios(`http://localhost:2000/api/book/isbn/${isbn}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
            // "Authorization": cookies.get("token"),
        },
    })
    .then((res) => {
       
        const data = res.data
        const tableBody = document.querySelector('#bookTable tbody');

        // Clear existing table data
        tableBody.innerHTML = '';
        data.forEach(book => {
            const row = document.createElement('tr');


            const isbnCell = document.createElement('td');
            isbnCell.textContent = book.isbn;
            row.appendChild(isbnCell);

            const titleCell = document.createElement('td');
            titleCell.textContent = book.title;
            row.appendChild(titleCell);

            const authorCell = document.createElement('td');
            authorCell.textContent = book.author;
            row.appendChild(authorCell);

            const reviewCell = document.createElement('td');
            const reviewContent = book.reviews.map(review => review.username + ": " + review.review);
            
            reviewCell.textContent = reviewContent;
            row.appendChild(reviewCell);
            tableBody.appendChild(row);
            tableBody.appendChild(row);
        })

    })
    .catch((err) => {
        console.log(err)

    })

}
const ByTitle=(title)=>{
    axios(`http://localhost:2000/api/book/isbn/${title}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
            // "Authorization": cookies.get("token"),
        },
    })
    .then((res) => {
       
        const data = res.data
        const tableBody = document.querySelector('#bookTable tbody');

        // Clear existing table data
        tableBody.innerHTML = '';
        data.forEach(book => {
            const row = document.createElement('tr');
            const isbnCell = document.createElement('td');
            isbnCell.textContent = book.isbn;
            row.appendChild(isbnCell);
            const titleCell = document.createElement('td');
            titleCell.textContent = book.title;
            row.appendChild(titleCell);
            const authorCell = document.createElement('td');
            authorCell.textContent = book.author;
            row.appendChild(authorCell);

            const reviewCell = document.createElement('td');
            const reviewContent = book.reviews.map(review => review.username + ": " + review.review);
            
            reviewCell.textContent = reviewContent;
            row.appendChild(reviewCell);
            tableBody.appendChild(row);
            tableBody.appendChild(row);
        })

    })
    .catch((err) => {
        console.log(err)

    })

}
const ByAuthor=(author)=>{
    axios(`http://localhost:2000/api/book/isbn/${author}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
            // "Authorization": cookies.get("token"),
        },
    })
    .then((res) => {
       
        const data = res.data
        const tableBody = document.querySelector('#bookTable tbody');

        // Clear existing table data
        tableBody.innerHTML = '';
        data.forEach(book => {
            const row = document.createElement('tr');
            const isbnCell = document.createElement('td');
            isbnCell.textContent = book.isbn;
            row.appendChild(isbnCell);
            const titleCell = document.createElement('td');
            titleCell.textContent = book.title;
            row.appendChild(titleCell);
            const authorCell = document.createElement('td');
            authorCell.textContent = book.author;
            row.appendChild(authorCell);

            const reviewCell = document.createElement('td');
            const reviewContent = book.reviews.map(review => review.username + ": " + review.review);
            
            reviewCell.textContent = reviewContent;
            row.appendChild(reviewCell);
            tableBody.appendChild(row);
            tableBody.appendChild(row);
        })

    })
    .catch((err) => {
        console.log(err)

    })

}


const GetAll = () => {
    axios("http://localhost:2000/api/book", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
            // "Authorization": cookies.get("token"),
        },
    })



        .then((res) => {
            console.log("*11111111111111********1111111111((((((")
            const data = res.data
            const tableBody = document.querySelector('#bookTable tbody');

            // Clear existing table data
            tableBody.innerHTML = '';
            data.forEach(book => {
                const row = document.createElement('tr');


                const isbnCell = document.createElement('td');
                isbnCell.textContent = book.isbn;
                row.appendChild(isbnCell);

                const titleCell = document.createElement('td');
                titleCell.textContent = book.title;
                row.appendChild(titleCell);

                const authorCell = document.createElement('td');
                authorCell.textContent = book.author;
                row.appendChild(authorCell);

                // const reviewCell = document.createElement('td');
                // if (book.reviews && book.reviews.length > 0) {
                //     const reviewData = book.reviews[0];
                //     reviewCell.textContent = reviewData.review;
                // } else {
                //     reviewCell.textContent = 'No reviews available';
                // }
                // row.appendChild(reviewCell);



                const reviewCell = document.createElement('td');
                const reviewContent = book.reviews.map(review => review.username + ": " + review.review);
                
                reviewCell.textContent = reviewContent;
                row.appendChild(reviewCell);

                // const reviewCell = document.createElement('td');
                // reviewCell.textContent = book.reviews.review; // Display each review in the review cell
                // row.appendChild(reviewCell);

                // Add the row to the table body
                tableBody.appendChild(row);

                // Add the rowb to the table body
                tableBody.appendChild(row);
            })

        })
        .catch((err) => {
            console.log(err)

        })
}

// GetAll()

const getAllBtn = document.getElementById('getAll');
getAllBtn.addEventListener('click', () => {
    console.log("Click")
    GetAll();
});

const byIsbnBtn = document.getElementById('byIsbn');
byIsbnBtn.addEventListener('click', () => {
    console.log("Click")
    var inputElement = document.getElementById("searchInput");
    
    // Get the value from the input element
    var inputValue = inputElement.value;
    ByIsbn(inputValue);
});

const byAuthorBtn = document.getElementById('byAuthor');
byAuthorBtn.addEventListener('click', () => {
    console.log("Click")
    var inputElement = document.getElementById("searchInput");
    
    // Get the value from the input element
    var inputValue = inputElement.value;
    ByAuthor(inputValue);
});

const byTitleBtn = document.getElementById('byTitle');
byTitleBtn.addEventListener('click', () => {
    console.log("Click")
    var inputElement = document.getElementById("searchInput");
    
    // Get the value from the input element
    var inputValue = inputElement.value;
    ByTitle(inputValue);
});
