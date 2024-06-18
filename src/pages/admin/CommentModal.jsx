import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CommentModal = ({ isOpen, closeModal, submitComment }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    submitComment(comment);
    setComment(''); // Reset the comment field
    closeModal(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-xl mb-4">Add Comment</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

CommentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  submitComment: PropTypes.func.isRequired,
};

export default CommentModal;
