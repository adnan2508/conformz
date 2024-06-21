import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';
import LoadingSpinner from '../../components/LoadingSpinner';

const SubmitAnswer = () => {
  const { id } = useParams();
  const { user, loading } = useContext(AuthContext);
  const [submissionLink, setSubmissionLink] = useState('');
  const navigate = useNavigate();

  console.log("contest Id:", id);

  if (loading) return <LoadingSpinner />;

  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://conformz-server.vercel.app/contest/${id}/submit`, { // Update URL for deployment
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access-token')}`
        },
        body: JSON.stringify({
          participantName: user?.displayName,
          participantEmail: user?.email,
          submissionLink
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      const data = await response.json();
      console.log('Submission successful:', data);
      navigate('/dashboard/my-participated-contest');
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
