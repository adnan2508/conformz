import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FiSearch } from "react-icons/fi";

const SearchBanner = ({ setSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) {
      Swal.fire({
        icon: 'warning',
        title: 'Search Term Required',
        text: 'Please enter a search term.',
      });
      return;
    }

    try {
      const { data } = await axios.get(`http://localhost:5000/search?query=${searchTerm}`);
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching contests:', error);
      Swal.fire({
        icon: 'error',
        title: 'Search Failed',
        text: 'There was an error searching for contests. Please try again.',
      });
    }
  };

  return (
    <div className="relative  bg-cover bg-center h-64 flex items-center justify-center"
         style={{ backgroundImage: 'url(https://i.ibb.co/5KcxzZm/search-Banner.jpg)' }}>
      <div className="bg-white w-[800px] bg-opacity-70 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSearch} className='flex justify-center items-center'>
          <input
            type="text"
            placeholder="Search by contest name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className=" w-full bg-blue-500 text-white ms-5 p-2 w-32 rounded-lg hover:bg-blue-700 flex justify-center items-center"> <FiSearch className='text-3xl '></FiSearch>
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBanner;
