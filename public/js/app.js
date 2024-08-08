const form = document.getElementById('form');
const row = document.querySelector('#buku');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const keyword = form.query.value;
    const config = {
        params: {
            q: keyword
        },
    };
    try {
        const res = await axios.get('https://www.googleapis.com/books/v1/volumes', config);
        getImages(res.data.items);
        form.elements.query.value = '';

    } catch (error) {
        console.log(error);
    }
});

const getImages = (books) => {
    // Clear previous results
    row.innerHTML = '';

    for (let book of books) {
        if (book.volumeInfo.imageLinks) {
            const container = document.createElement('div');
            container.classList.add('col-lg-6','col-md-6', 'mb-4', 'card');

            // Wrapper for image and text
            const wrapper = document.createElement('div');
            wrapper.classList.add('d-flex', 'align-items-start');

            // Image container
            const image = document.createElement('div');
            image.classList.add('me-3'); // Margin end for spacing

            const img = document.createElement('img');
            img.src = book.volumeInfo.imageLinks.smallThumbnail;
            img.alt = book.volumeInfo.title;
            img.classList.add('img-fluid'); // Ensure images are responsive

            // Text container
            const text = document.createElement('div');

            const title = document.createElement('h5');
            title.textContent = book.volumeInfo.title;

            const author = document.createElement('p');
            author.textContent = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown author';

            const pages = document.createElement('p');
            pages.textContent = `Jumlah Hal: ${book.volumeInfo.pageCount || 'Tidak tersedia'}`;


            image.appendChild(img);
            text.appendChild(title);
            text.appendChild(author);
            text.appendChild(pages)
        

            wrapper.appendChild(image);
            wrapper.appendChild(text);
            container.appendChild(wrapper);

            row.appendChild(container); // Append directly to the row
        }
    }
}
