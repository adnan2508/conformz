import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import SearchBanner from './SearchBanner';
import PopularContests from './PopularContests';
import BestContestCreators from '../components/BestContestCreator';

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);

  // Truncate function to limit the description to 50 words
  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  return (
    <div>
      <Helmet>
        <title>Conformz | Home</title>
      </Helmet>

      <SearchBanner setSearchResults={setSearchResults} />

      <div className="container mx-auto my-5">
        <h2 className="text-2xl font-bold mb-4">Search Results: </h2>
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((contest) => (
              <div key={contest._id} className="card bg-white shadow-md p-4 rounded-lg">
                <img src={contest.image} className="w-full h-48 object-cover rounded-lg mb-4" alt="Contest" />
                <h3 className="text-xl font-bold">{contest.contestName}</h3>
                <p className="text-gray-600">
                  {truncateText(contest.contestDescription, 50)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p></p>
        )}
      </div>
      <PopularContests />
      <BestContestCreators/>
    </div>
  );
};

export default Home;
