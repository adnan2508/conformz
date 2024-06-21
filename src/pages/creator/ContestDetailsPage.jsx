import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../components/LoadingSpinner';

const ContestDetailsPage = () => {
  const { id } = useParams();
  console.log("id: ", id);

  //   Fetch Contests Data
  const { data: contest = [], isLoading, refetch } = useQuery({
    queryKey: ["contest"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-contest/accepted/${id}`);
      return data;
    },
  });
  if(isLoading){
    <LoadingSpinner/>
  }


  const handleDeclareWinner = (contestId,participantEmail) => {
    console.log("contestId: ", contestId, "participantId: ", participantEmail);
    fetch(`https://conformz-server.vercel.app/creator/contest/${contestId}/declare-winner/${participantEmail}`, {
      method: 'PATCH',
      body: JSON.stringify({ participantEmail }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `winner has been declared successfully!`,
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
  };

  if (contest) {
    console.log("contest data: ", contest);
  }


  return (
    <div>
      <h2>Contest Details: {contest?.contestName}</h2>
      <img src={contest?.image} alt="Contest Banner" className="mb-4 rounded-lg" />
      <h3>Participants</h3>
      <table className="table-fixed border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Participant Name</th>
            <th className="border border-gray-300 px-4 py-2">Participant Email</th>
            <th className="border border-gray-300 px-4 py-2">Submission Link</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contest?.participants?.map((participant) => (
            <tr key={participant._id}>
              <td className="border border-gray-300 px-4 py-2">{participant.participantName}</td>
              <td className="border border-gray-300 px-4 py-2">{participant.participantEmail}</td>
              <td className="border border-gray-300 px-4 py-2">{participant.submissionLink}</td>
              <td className="border border-gray-300 px-4 py-2">
                {contest?.winnerEmail ? (
                  contest.winnerEmail === participant.participantEmail ? (
                    <span className="text-green-600">Winner</span>
                  ) : (
                    <span className="text-red-600">Unsuccessful</span>
                  )
                ) : (
                  <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleDeclareWinner(contest?._id,participant.participantEmail)}>Declare Winner</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContestDetailsPage;
