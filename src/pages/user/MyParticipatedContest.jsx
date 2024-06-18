import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { AuthContext } from '../../providers/AuthProviders';
import UseAxiosCommon from '../../hooks/UseAxiosCommon';
import LoadingSpinner from '../../components/LoadingSpinner';

const MyParticipatedContest = () => {
  const { user } = useContext(AuthContext);
  const axiosCommon = UseAxiosCommon();
  const [participatedContests, setParticipatedContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('upcoming');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParticipatedContests = async () => {
      try {
        const { data } = await axiosCommon.get(`/user/${user.email}/participated-contests`);
        setParticipatedContests(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching participated contests:', error);
        setLoading(false);
      }
    };

    fetchParticipatedContests();
  }, [axiosCommon, user]);

  const sortContests = (contests, order) => {
    const now = new Date();
    if (order === 'upcoming') {
      return contests.filter(contest => new Date(contest.deadline) > now).sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else {
      return contests.filter(contest => new Date(contest.deadline) <= now).sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
    }
  };

  if (loading) return <LoadingSpinner />;

  const sortedContests = sortContests(participatedContests, sortOrder);

  return (
    <div className="bg-base-200 my-5">
      <div className="container mx-auto p-5">
        <h1 className="text-2xl font-bold mb-5">My Participated Contests</h1>
        <div className="flex justify-end mb-4">
          <label className="mr-2">Sort by:</label>
          <select
            className="select select-bordered"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="upcoming">Upcoming Contests</option>
            <option value="past">Past Contests</option>
          </select>
        </div>
        {sortedContests.length === 0 ? (
          <p>No participated contests found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedContests.map((contest) => (
              <div key={contest._id} className="card bg-white shadow-md p-4 rounded-lg">
                <img src={contest.contestImage} className="w-full h-48 object-cover rounded-lg mb-4" alt="Contest" />
                <h2 className="text-xl font-bold">{contest.contestName}</h2>
                <p className="text-gray-600"><span className="font-bold">Type:</span> {contest.contestType}</p>
                <p className="text-gray-600"><span className="font-bold">Creator:</span> {contest.creatorEmail}</p>
                <p className="text-gray-600"><span className="font-bold">Price:</span> ${contest.contestPrice}</p>
                <p className="text-gray-600"><span className="font-bold">Payment Status:</span> {contest.paidStatus ? 'Completed' : 'Pending'}</p>
                <p className="text-gray-600"><span className="font-bold">Deadline:</span> {format(new Date(contest.deadline), "MMM dd, yyyy 'at' hh:mm:ss a")}</p>
                {sortOrder === 'upcoming' && (
                  <button onClick={() => navigate(`/dashboard/contest/submit/${contest.contestId}`)} className="btn btn-primary mt-4">Submit Answer</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyParticipatedContest;
