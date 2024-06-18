import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { format, differenceInSeconds } from 'date-fns';
import LoadingSpinner from '../components/LoadingSpinner';
import UseAxiosCommon from '../hooks/UseAxiosCommon';
import UseRole from '../hooks/useRole';
import UseBlock from '../hooks/useBlock';
import { AuthContext } from '../providers/AuthProviders';

const ContestDetails = () => {
  const { id } = useParams();
  const [role] = UseRole();
  const { user } = useContext(AuthContext);
  const [blockStatus, isLoading] = UseBlock();
  const axiosCommon = UseAxiosCommon();
  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        const { data } = await axiosCommon.get(`/contest/${id}`);
        setContest(data);
        setLoading(false);

        const contestDeadline = new Date(data.to);
        const now = new Date();
        if (contestDeadline > now) {
          setTimeRemaining(differenceInSeconds(contestDeadline, now));
        }

        // Check if the user is already registered for the contest
        const registrationCheck = await axiosCommon.get(`/contest/${id}/isRegistered`, {
          params: { email: user?.email }
        });
        setIsRegistered(registrationCheck.data.isRegistered);
      } catch (error) {
        console.error('Error fetching contest details:', error);
        setLoading(false);
      }
    };

    fetchContestDetails();
  }, [axiosCommon, id, user]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timerId = setInterval(() => {
        setTimeRemaining((prevTimeRemaining) => {
          const newTimeRemaining = prevTimeRemaining - 1;
          if (newTimeRemaining <= 0) {
            clearInterval(timerId);
          }
          return newTimeRemaining;
        });
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeRemaining]);

  if (loading) return <LoadingSpinner />;

  const isContestAvailable = timeRemaining > 0;

  const formatTime = (seconds) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    return `${d}d ${h}h ${m}m ${s}s`;
  };

  const deadline = isContestAvailable
    ? format(new Date(contest.to), "MMM dd, yyyy 'at' hh:mm:ss a")
    : 'Not Available';

  const handleRegistration = () => {
    const paymentData = {
      contestId: contest?._id,
      participantName: user?.displayName,
      participantEmail: user?.email,
      participantPhotoURL: user?.photoURL,
      contestName: contest?.contestName,
      contestType: contest?.contestType,
      contestImage: contest?.image,
      creatorEmail: contest?.creatorEmail,
      contestPrice: contest?.contestPrice,
      deadline: contest?.to,
    };
    console.log(paymentData);
    fetch('http://localhost:5000/contest-registration/payment', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(paymentData)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        window.location.replace(data.url);
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="bg-base-200 my-5">
      <div className="container mx-auto p-5 lg:grid grid-cols-3 border border-2 rounded-lg">
        <div className="w-full col-span-2 pe-5">
          <img src={contest.image} className="max-w-full rounded-lg shadow-2xl" alt="Contest Banner" />
        </div>
        <div className="w-full py-10">
          <h1 className="text-2xl font-bold">{contest.contestName}</h1>
          <p className=""><span>Participant: </span>{contest.totalParticipant}</p>
          <p className=""><span className='font-bold'>Prize:</span> ${contest.prize}</p>
          <p className=""><span className='font-bold'>Deadline:</span> {deadline}</p>
          {isContestAvailable ? (
            <p className="my-2"><span className='font-bold '>Time Remaining : </span> {formatTime(timeRemaining)}</p>
          ) : (
            <p className="text-red-600">Contest Registration Closed</p>
          )}
          {role !== "user" || blockStatus === "blocked" ? (
            <span className='text-red-400 font-bold bg-red-100 rounded-lg px-2 py-1'>
              You don&apos;t have registration permission!
            </span>
          ) : (
            isContestAvailable && !isRegistered && (
              <button onClick={handleRegistration} className="btn btn-primary text-white">Register</button>
            )
          )}
          {isRegistered && (
            <span className='text-green-400 font-bold bg-green-100 rounded-lg px-2 py-1'>
              You are already registered for this contest.
            </span>
          )}
        </div>
      </div>
      <div className='p-10'>
        <p className='text-center text-2xl font-bold'>Task Description</p>
        <div className='divider'></div>
        <div className='text-sm'>{contest.contestDescription}</div>
        <div className='py-2 px-3 border rounded-lg bg-slate-100 mt-5'>
          <p className='text-xl font-bold'>Task Submission</p>
          <div>{contest.taskSubmission}</div>
        </div>
      </div>
      {contest?.winnerId && (
        <div className='w-full my-5'>
          <h1 className='text-center text-2xl font-bold'>Winner of the contest</h1>
          <div className='divider'></div>
          <div className='flex justify-center items-center mt-5'>
            <div className="card w-96 bg-base-100 shadow-xl">
              <h2 className="font-bold text-center text-xl p-2 bg-success rounded-lg text-white">{contest?.winnerName}</h2>
              <figure><img src={contest.winnerImage} alt="Winner" /></figure>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestDetails;
