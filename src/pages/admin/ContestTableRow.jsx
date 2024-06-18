import { useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import CommentModal from './CommentModal'; // Import the CommentModal component

const ContestTableRow = ({ contest, refetch }) => {
  // Modal states
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const handleStatus = (contest, status) => {
    fetch(`http://localhost:5000/admin/contest-approval/${contest._id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Contest has been approved successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleCommentSubmit = (comment) => {
    fetch(`http://localhost:5000/admin/contest-comment/${contest._id}`, {
      method: 'PATCH',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Comment added successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };


  const handleContestDelete = (contest) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/admin/contest-delete/${contest._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.deletedCount) {
              refetch();
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `The contest has been deleted successfully.`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch(error => {
            console.error('Error:', error);
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Failed to delete contest.',
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });


  }

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={contest?.image}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{contest?.contestName}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {contest?.status === 'accepted' ? (
          <p className="text-green-500 whitespace-no-wrap">Confirmed</p>
        ) : (
          <p className="text-red-500 whitespace-no-wrap">
            Pending{' '}
            <button
              className="btn btn-sm btn-success text-white ms-2"
              onClick={() => handleStatus(contest, 'accepted')}
            >
              Confirm
            </button>
          </p>
        )}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${contest?.contestPrice}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{format(new Date(contest?.to), 'P')}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => handleContestDelete(contest)}
          className="btn btn-sm bg-red-400 text-white hover:bg-red-200 hover:text-black "
        >Delete
        </button>
        {/* Delete modal */}
        {/* <DeleteModal
          isOpen={isDeleteOpen}
          closeModal={() => setIsDeleteOpen(false)}
          handleDelete={handleDelete}
          id={contest?._id}
        /> */}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {
          contest?.comments ==""?<button className="btn btn-sm bg-warning" onClick={() => setIsCommentOpen(true)}>
          Comment
        </button>
        : <p><div className='bg-slate-200 p-1 rounded text-center'>Commented</div>&quot; {contest.comments} &quot;</p>
        }
        {/* Comment modal */}
        <CommentModal
          isOpen={isCommentOpen}
          closeModal={() => setIsCommentOpen(false)}
          submitComment={handleCommentSubmit}
        />
      </td>
    </tr>
  );
};

ContestTableRow.propTypes = {
  contest: PropTypes.object,
  refetch: PropTypes.func,
};

export default ContestTableRow;
