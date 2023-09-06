"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { detailBook } from '../../api/books';
import { Book } from '../../../models/book';

interface DetailBooksProps {
	params: { slug: string };
}

const DetailBooks = ({ params }: { params: { slug: string } }) => {
	const [book, setBook] = useState<Book | null>(null);
	const { slug } = params

	useEffect(() => {
		if (slug) {
			detailBook(slug)
				.then((data) => {
					setBook(data);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
				});
		}
	}, [slug]);

	if (!book) {
		return <p>Loading...</p>;
	}

	return (
		<>
			{
				(book && book.volumeInfo) ? (
					<div className="p-4 border border-gray-300 rounded-lg shadow-md">
						<h3 className="text-lg font-semibold mb-2">Detail Book</h3>
						<h1 className="text-2xl font-bold mb-2">{book.volumeInfo.title}</h1>
						<div className="flex items-center mb-2">
							<img
								src={book.volumeInfo.imageLinks?.thumbnail || '/placeholder-image.jpg'} // Provide a placeholder image URL
								alt={book.volumeInfo.title}
								className="w-16 h-24 rounded-md mr-4"
							/>
							<div>
								<p className="text-sm">Author(s): {book.volumeInfo.authors?.join(', ') || 'Unknown'}</p>
								<p className="text-sm">Published Date: {book.volumeInfo.publishedDate || 'N/A'}</p>
							</div>
						</div>
						<p className="text-sm">{book.volumeInfo.description || 'No description available.'}</p>
					</div>
				) : (
					<div className="p-4 border border-gray-300 rounded-lg shadow-md">
						<h3 className="text-lg font-semibold mb-2">Books is not Defined</h3>
					</div>
				)
			}
		</>
	);
};

export default DetailBooks;
