import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UseAxiosCommon from '../../hooks/UseAxiosCommon';
import { AuthContext } from '../../providers/AuthProviders';

const SubmitAnswer = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [submissionLink, setSubmissionLink] = useState('');
  const axiosCommon = UseAxiosCommon();
  const navigate = useNavigate();

  console.log("contest Id: ", id);

  const handleSubmit = async () => {
    try {
      await axiosCommon.post(`/contest/${id}/submit`, {
        participantEmail: user?.email, // Replace with the actual user email
        submissionLink
      });
      navigate('/dashboard/my-participated-contest'); // Navigate back to the contests page after submission
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Submit Your Answer</h1>
      <textarea
        className="textarea textarea-bordered w-full mb-4"
        placeholder="Enter your submission link here"
        value={submissionLink}
        onChange={(e) => setSubmissionLink(e.target.value)}
      />
      <button onClick={handleSubmit} className="btn btn-primary mr-2">Submit</button>
      <button onClick={() => navigate('/dashboard/my-participated-contest')} className="btn btn-secondary">Cancel</button>
    </div>
  );
};

export default SubmitAnswer;
