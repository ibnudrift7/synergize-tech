import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { detailBook } from '../../api/books';

const DetailBooks = () => {
    const { query } = useRouter()
    const slug = query.slug as string
    const [book, setBook] = useState([]);
    console.log(slug, "slug");

    useEffect(() => {
        if (slug) {
            detailBook(slug).then((data) => {
                setBook(data);
            })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, []);

    if (!book) {
        return <p>Loading...</p>;
    }

    // Render book details here
    return (
        <div>
            {/* <h1>{book.volumeInfo.title}</h1>
            <p>Author: {book.volumeInfo.authors.join(', ')}</p>
            <p>Published Date: {book.volumeInfo.publishedDate}</p>
            <p>Description: {book.volumeInfo.description}</p> */}
        </div>
    );
};

export default DetailBooks;
