import { useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
// import {
//   Description,
//   Dialog,
//   DialogPanel,
//   DialogTitle,
// } from '@headlessui/react'
// import DeleteModal from "../modal/DeleteModal";

const TableRows = ({ contest, refetch }) => {
  

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
        fetch(`https://conformz-server.vercel.app/admin/contest-delete/${contest._id}`, {
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
            <p className="text-gray-900 whitespace-no-wrap">
              {contest?.contestName}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{contest.status}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          ${contest?.contestPrice}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {format(new Date(contest?.from), "P")}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {format(new Date(contest?.to), "P")}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {
          contest?.status =="pending" ? <button
          onClick={() => handleContestDelete(contest)}
          className="bg-red-400 text-white btn btn-sm"
        >Delete</button>
        :
        <button
          className="bg-red-200 hover:bg-red-200 hover:outline-none text-white btn btn-sm "
          disabled
        >Delete</button>
        }
      </td>
      <td className=" py-5 border-b border-blue-200 bg-white">
       {
        contest?.status =="pending" ? <Link to={`/dashboard/my-contest/update/${contest._id}`}><button className="btn btn-sm bg-teal-300"><FaEdit className=""></FaEdit> Edit</button></Link>
        :
        <Link><button className="btn btn-sm bg-teal-50 hover:bg-teal-50" disabled><FaEdit className=""></FaEdit> Edit</button></Link>
       }
      </td>
      <td className="py-5 border-b border-gray-200 bg-white text-sm">
       

        <Link to="/dashboard/contest-submitted">
          <button
            scope="col"
            className="btn btn-sm bg-blue-400 ml-8 text-white text-left text-sm uppercase font-normal"
          >
            See Submission
          </button>
        </Link>
      </td>
    </tr>
  );
};

TableRows.propTypes = {
  contest: PropTypes.object,
  refetch: PropTypes.func,
};

export default TableRows;
