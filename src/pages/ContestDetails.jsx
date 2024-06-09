import React, { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import LoadingSpinner from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';
import UseAxiosCommon from '../hooks/UseAxiosCommon';


const ContestDetails = () => {
  const {id} = useParams();
  const axiosCommon = UseAxiosCommon();
  const [loading, setLoading] = useState(false);

  const { data: contest = {}, isLoading } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/contest/${id}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  console.log(contest);

  return (
    <div>
      <div className="hero min-h-screen bg-base-200 my-5">
  <div className="hero-content flex-col lg:flex-row">
    <img src={contest.image} className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">{contest.contestName}</h1>
      <p className="py-6">{contest.contestDescription}</p>
      <p className="py-6">{contest.prize}</p>
      <p className="my-2">{contest.contestDeadline}</p>
      <button className="btn btn-primary text-white">Register</button>
    </div>
  </div>
</div>
    </div>
  );
};

export default ContestDetails;