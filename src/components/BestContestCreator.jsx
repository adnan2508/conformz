import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

const BestContestCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestCreators = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/creators/best');
        setCreators(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching best contest creators:', error);
        setLoading(false);
      }
    };

    fetchBestCreators();
  }, []);

  if (loading) return <LoadingSpinner />;
  if(creators){
    console.log("contest creator: ", creators);
  }

  return (
    <div className="my-10">
      <h2 className="text-3xl text-white font-bold my-5 py-10 bg-[#41A5D2] text-center">Best Contest Creator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {creators.map((creator, index) => (
          <div key={index} className="card bg-white shadow-md p-4 rounded-lg">
            <img src={creator.creatorImage} className="w-full h-48 object-cover rounded-lg mb-4" alt="Creator" />
            <h3 className="text-xl font-bold">{creator.creatorName}</h3>
            <p className="text-gray-600 mb-2">Total Participants: {creator.totalParticipants}</p>
            <div>
              {creator.contests.map((contest, idx) => (
                <div key={idx} className="mb-2">
                  <h4 className="text-lg font-semibold">{contest.contestName}</h4>
                  <p className="text-gray-600">{contest.contestDescription.split(' ').slice(0, 20).join(' ')}...</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestContestCreators;
