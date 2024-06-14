import PropTypes from "prop-types";
import { useState } from "react";
import UpdateUserModal from "../modal/UpdateUserModal";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

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
      refetch(); // Call refetch to update the data
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
      status: 'Verified',
    };

    try {
      await mutateAsync(updatedUser);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.role}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {user?.role === "admin" ? (
          <p>already admin</p>
        ) : (
          <button onClick={() => setIsOpen(true)} className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">Update Role</span>
          </button>
        )}
        {/* Update User Modal */}
        <UpdateUserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalHandler={modalHandler}
          user={user} />
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default UserDataRow;
