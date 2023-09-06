"use client"

import React, { useState, useEffect } from "react";
import Loading from '../../components/Loading'
import Error from '../../components/Error'
import { fetchBooks } from '../api/books';
import { useQuery, useQueryClient } from '@tanstack/react-query'
import CardBook from '@/components/CardBook'
import InputSearch from "@/components/InputSearch";
const moment = require('moment')
import { Icon } from '@iconify/react';

interface Books {
    id: number
    volumneInfo: {
        title: string
        authors: string
        publishedDate: string
        imageLinks: {
            thumbnail: string
        }
    }
}
interface Post {
    id: number
    name: string
    username: string
    email: string
}

interface BookSearhing {
    title: string;
    publishedDate: string;
}


const HomePage = () => {
    const [page, setPage] = useState(1)
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTanggal, setSearchTanggal] = useState('');
    const [isGridView, setIsGridView] = useState(true);
    const [isSortBy, setIsSortBy] = useState('');
    const queryClient = useQueryClient();

    const queryKey = ['all', page, searchQuery];

    const { data, isLoading, isSuccess, error, isPreviousData } = useQuery(
        queryKey,
        () => fetchBooks('all', page, searchQuery),
        {
            keepPreviousData: true,
        }
    );

    const search = async (query: string, tanggal: any) => {
        setSearchQuery(query);
        setSearchTanggal(tanggal);
        setPage(1);
        console.log(queryKey);
        queryClient.invalidateQueries(queryKey);
    }

    console.log(error);

    if (isLoading || !data) return <Loading />
    if (error || !isSuccess) return <Error />

    let dataFiltered = data;
    console.log(dataFiltered);

    if (searchTanggal) {
        const YearFilter = moment(searchTanggal).format('YYYY');
        dataFiltered = data.filter((item: any) => {
            if (item.volumeInfo && item.volumeInfo.publishedDate) {
                return item.volumeInfo.publishedDate.includes(YearFilter);
            }
        });
    }

    const sortByPublishedYear = (books: any[]) => {
        return books.sort((a, b) => {
            const yearA = new Date(a.volumeInfo.publishedDate).getFullYear();
            const yearB = new Date(b.volumeInfo.publishedDate).getFullYear();
            return yearA - yearB;
        });
    };

    const sortByTitle = (books: any[]) => {
        return books.sort((a, b) => {
            return a.volumeInfo.title.localeCompare(b.volumeInfo.title);
        });
    };



    if (isSortBy) {
        console.log(isSortBy);
        if (isSortBy === 'title') {
            dataFiltered = sortByTitle(dataFiltered);
        }
        if (isSortBy === 'dates') {
            dataFiltered = sortByPublishedYear(dataFiltered);
        }
    }

    return (
        <>
            <div className="wrapper p-4">
                <header className="text-center">
                    <h1 className="text-2xl font-bold">Google Books</h1>
                </header>
                <div className="contents">
                    <div className="container mx-auto p-4">
                        <div className="tops-box flex flex-col md:flex-row justify-between items-center gap-y-4 md:gap-y-0">
                            <InputSearch callback={search} />
                            <div className="flex flex-row box-filters-pain gap-x-4">
                                Sort By
                                <button className={
                                    `px-3 py-1 rounded-lg hover:bg-blue-500 ${isSortBy === 'title' ? 'bg-blue-500' : 'bg-gray-400'}`
                                }
                                    onClick={() => {
                                        setIsSortBy('title');
                                    }}
                                >
                                    <small>Judul</small>
                                </button>
                                <button className={
                                    `px-3 py-1 rounded-lg hover:bg-blue-500 ${isSortBy === 'dates' ? 'bg-blue-500' : 'bg-gray-400'}`
                                }
                                    onClick={() => {
                                        setIsSortBy('dates');
                                    }}
                                >
                                    <small>Tahun Terbit</small>
                                </button>
                            </div>
                            <div className="flex justify-end gap-x-5 items-center">
                                <div className="switch_box flex gap-x-2">
                                    <button className={`switch ${isGridView ? 'active' : ''}`} onClick={() => setIsGridView(true)}>
                                        <Icon icon="ic:baseline-grid-view" className={`text-3xl ${isGridView ? 'bg-blue-200 rounded-lg p-0.5' : ''}`} />
                                    </button>
                                    <button className={`switch ${!isGridView ? 'active' : ''}`} onClick={() => setIsGridView(false)}>
                                        <Icon icon="ic:baseline-view-list" className={`text-3xl ${!isGridView ? 'bg-blue-200 rounded-lg p-0.5' : ''}`} />
                                    </button>
                                </div>
                                <div className="flex justify-end gap-3 items-center">
                                    <button
                                        className={`px-3 py-1 rounded-lg bg-blue-400 ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-500'}`}
                                        onClick={() => {
                                            setPage((old) => Math.max(old - 1, 1));
                                            queryClient.prefetchQuery(queryKey, () => fetchBooks('all', page - 1, searchQuery));
                                        }}
                                        disabled={page === 1}
                                    >
                                        <small>Previous</small>
                                    </button>
                                    <span className="text-xl font-semibold">{page}</span>
                                    <button
                                        className={`px-3 py-1 rounded-lg bg-blue-400 ${isPreviousData || page === 7 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-500'}`}
                                        onClick={() => {
                                            if (!isPreviousData && data) {
                                                setPage((old) => old + 1);
                                                queryClient.prefetchQuery(queryKey, () => fetchBooks('all', page + 1, searchQuery));
                                            }
                                        }}
                                        disabled={isPreviousData || page === 7}
                                    >
                                        <small>Next</small>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="block-middle-books mt-8">
                            <div className={`${!isGridView ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'}`}>
                                {dataFiltered && dataFiltered.map((item: any) => (
                                    <div key={item.id}>
                                        <CardBook item={item} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;
