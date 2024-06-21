import PropTypes from "prop-types";
import { useState } from "react";
import UpdateUserModal from "../modal/UpdateUserModal";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { TiUserDelete } from "react-icons/ti";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaInfoCircle } from "react-icons/fa";

const UserDataRow = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync } = useMutation({
    mutationFn: async role => {
      const { data } = await axiosSecure.patch(
        `/users/update/${user?.email}`,
        role
      );
      return data;
    },
    onSuccess: data => {
      refetch();
      console.log(data);
      toast.success("User role updated successfully!");
      setIsOpen(false);
    },
  });

  // Modal Handler
  const modalHandler = async selected => {
    console.log('user role updated!', selected);
    const updatedUser = {
      role: selected,
    };

    try {
      await mutateAsync(updatedUser);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const blockStatusChange = (user, status) => {
    fetch(`https://conformz-server.vercel.app/admin/${user.email}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
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
            title: `User is now ${status}`,
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
  }


  const handleUserDelete = (user) => {
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
        fetch(`https://conformz-server.vercel.app/admin/user-delete/${user.email}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.deletedCount) {
              refetch(); // This function should reload the data from the server
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `User has been deleted successfully.`,
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
              title: 'Failed to delete user.',
              showConfirmButton: false,
              timer: 1500,
            });
          });
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success"
        // });
      }
    });


  }


  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.role}
          <span>{user?.status==="Requested" && 
          <span className="bg-yellow-500 text-sm px-3 py-1 rounded border ms-3 text-slate-100 font-bold"><FaInfoCircle className="inline-block"></FaInfoCircle> User requested to be a &apos;CREATOR&apos;</span>
            
            }</span>
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {
          <button onClick={() => setIsOpen(true)} className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">Update Role</span>
          </button>
        }
        {/* Update User Modal */}
        <UpdateUserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalHandler={modalHandler}
          user={user} />


      </td>
      <td className="py-5 border-b border-gray-200 bg-white text-sm">
        {
          user?.blockStatus == "unblocked" ? <div className="inline-block bg-slate-100 ms-3"> <span className="ms-1">User is Unblocked</span><button onClick={() => blockStatusChange(user, "blocked")} className="ms-1 btn bg-red-500 text-white">Block</button></div> : <div className="inline-block bg-slate-100 ms-3"> <span className="ms-1">User is Blocked</span><button onClick={() => blockStatusChange(user, "unblocked")} className="ms-1  btn text-white bg-success">Unblock</button></div>
        }
      </td>
      <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">

        <button onClick={() => handleUserDelete(user)} className=" btn border  bg-red-200  text-red-500"><RiDeleteBin6Fill className="text-2xl"></RiDeleteBin6Fill></button>

      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default UserDataRow;
