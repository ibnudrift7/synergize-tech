import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const BookDetail = () => {
    const { query } = useRouter()
    const slug = query.slug as string
    const [bookData, setBookData] = useState(null);

    console.log(slug, "slugs");

    useEffect(() => {
        if (slug) {
            const apiUrl = `https://www.googleapis.com/books/v1/volumes/${slug}`;
            console.log(apiUrl, "apiUrl");
            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    setBookData(data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [slug]);

    return (
        <div>
            <h1>Book Detail Page</h1>
            <p>Slug: {slug}</p>
            {bookData && (
                <div>
                    {/* <h2>{bookData.volumeInfo.title}</h2>
                    <p>{bookData.volumeInfo.description}</p> */}
                </div>
            )}
        </div>
    );
};

export default BookDetail;
