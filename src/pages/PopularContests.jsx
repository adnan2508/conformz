import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProviders';
import LoadingSpinner from '../components/LoadingSpinner';

const PopularContests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularContests = async () => {
      try {
        const { data } = await axios.get('https://conformz-server.vercel.app/contests/popular');
        setContests(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching popular contests:', error);
        setLoading(false);
      }
    };

    fetchPopularContests();
  }, []);

  const handleViewDetails = (contestId) => {
    if (user) {
      navigate(`/contest/${contestId}`);
    } else {
      navigate('/login');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="my-10">
      <h2 className="text-3xl text-white font-bold my-5 py-10 bg-[#41A5D2] text-center">Popular Contests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contests.map((contest) => (
          <div key={contest._id} className="card bg-white shadow-md p-4 rounded-lg">
            <img src={contest.image} className="w-full h-48 object-cover rounded-lg mb-4" alt="Contest" />
            <h3 className="text-xl font-bold">{contest.contestName}</h3>
            <p className="text-gray-600 mb-2">
              {contest.contestDescription.split(' ').slice(0, 20).join(' ')}...
            </p>
            <p className="text-gray-600 mb-2">Participants: {contest.totalParticipant}</p>
            <button
              onClick={() => handleViewDetails(contest._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={() => navigate('/allContests')}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Show All
        </button>
      </div>
    </div>
  );
};

export default PopularContests;
