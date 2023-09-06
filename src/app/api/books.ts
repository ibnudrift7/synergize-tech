import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const fetchBooks = async (def: any, page: any, search: any) => {
    try {
        page = (page - 1) * 20;
        const response = await axios.get(BASE_URL, {
            params: {
                q: search ? search : def,
                startIndex: page,
                maxResults: 20,
            },
        });
        return response.data.items;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching books");
    }
};