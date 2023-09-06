import Image from "next/image";
import Link from 'next/link';

const CardBook = ({ item }: any) => {

	let authorsInfo = null;
	if (item.volumeInfo.authors !== undefined) {
		authorsInfo = item.volumeInfo.authors.join(", ");
	}

	let thumbnail = '';
	if (item.volumeInfo.imageLinks !== undefined) {
		thumbnail = item.volumeInfo.imageLinks.thumbnail;
	} else {
		thumbnail = 'https://via.placeholder.com/250'
	}

	console.log(item.id, "item.id");


	return (
		<>
			<div data-id={item.id}
				key={item.id}
				className="bg-white rounded-lg shadow-md overflow-hidden">
				{/* <Link href={`/books/${item.id}`}> */}
				<Link href="/[slug]" as={`/books/${item.id}`}>
					<img
						src={thumbnail}
						alt={item.volumeInfo.title}
						className="w-full h-48 object-cover"
					/>
				</Link>
				<div className="p-4">
					<h2 className="text-base font-semibold">{item.volumeInfo.title}</h2>
					<p className="text-gray-600"><small>{authorsInfo}
						{
							item.volumeInfo.publishedDate !== undefined ?
								` - ${item.volumeInfo.publishedDate}` : ''
						}
					</small></p>
				</div>
			</div >
		</>
	)
}

export default CardBook
