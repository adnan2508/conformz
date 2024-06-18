import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProviders';
import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../components/LoadingSpinner';

const ContestSubmitted = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  //   Fetch Contests Data
  const { data: contests = [], isLoading, refetch } = useQuery({
    queryKey: ["my-accepted-contest", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-created-contest/accepted/${user?.email}`);
      return data;
    },
  });


  return (
    <div>
      <h2 className='my-5 text-center text-3xl font-bold'>Submitted Contest</h2>
      {contests.length === 0 ? (
        <p>No contests submitted yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {contests.map((contest) => (
            <div key={contest._id} className="border rounded p-4">
              <Link to={`/dashboard/contest-details-submissions/${contest._id}`} className="font-bold hover:underline">{contest.contestName}</Link>
              <img src={contest.image} alt="Contest Banner" className="mt-2 mb-4 rounded-lg" />
              <p>Prize: ${contest.prize}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContestSubmitted;
