import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InputSearch = ({ callback }: any) => {
	const [searchText, setSearchText] = React.useState('')
	const [selectedDate, setSelectedDate] = useState(null);

	const handleDateChange = (date: any) => {
		setSelectedDate(date);
	};

	const handleSearch = () => {
		callback(searchText, selectedDate);
	};

	return (
		<>
			<div className="flex flex-col md:flex-row items-center space-x-2 box-search">
				<DatePicker
					selected={selectedDate}
					onChange={handleDateChange}
					dateFormat="yyyy-MM-dd"
					showYearDropdown={true}
					className="border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-blue-400"
					placeholderText="Pilih tanggal"
				/>
				<input
					type="text"
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					placeholder="Cari judul..."
					className="border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:border-blue-400"
				/>
				<button
					type="button"
					onClick={handleSearch}
					className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
				>
					Cari
				</button>
			</div>
		</>
	)
}

export default InputSearch
