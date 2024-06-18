import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import UseAxiosCommon from '../../hooks/UseAxiosCommon';
import LoadingSpinner from '../../components/LoadingSpinner';


const WinningContest = () => {
  const { user } = useContext(AuthContext);
  const axiosCommon = UseAxiosCommon();
  const [winningContests, setWinningContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWinningContests = async () => {
      try {
        const { data } = await axiosCommon.get(`/user/${user.email}/winning-contests`);
        setWinningContests(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching winning contests:', error);
        setLoading(false);
      }
    };

    fetchWinningContests();
  }, [axiosCommon, user]);

  if (loading) return <LoadingSpinner />;
  else console.log("data: ", winningContests);

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">My Winning Contests</h2>
      {winningContests.length === 0 ? (
        <p>No winning contests found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {winningContests.map((contest) => (
            <div key={contest._id} className="bg-white shadow-md p-4 rounded-lg">
              <img src={contest.image} className="w-full h-48 object-cover rounded-lg mb-4" alt="Contest" />
              <h2 className="text-xl font-bold">{contest.contestName}</h2>
              <p className="text-gray-600"><span className="font-bold">Host:</span> {contest.creatorEmail}</p>
              <p className="text-gray-600"><span className="font-bold">Prize:</span> ${contest.prize}</p>
              {/* <p className="bg-green-200"><span className='bg-green-700 text-white px-2 font-bold rounded'>Congratulations!</span> You have won the contest.</p> */}
              <div className='bg-green-200 p-2'>
                <p className='text-white bg-green-700 font-bold px-2 inline-block rounded'>Congratulations!</p>
                <p className='font-bold'>You have won the contest.</p>
              </div>
              {/* Additional details or actions can be added here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WinningContest;
