import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";
import CreatorReqModal from "./modal/CreatorReqModal";
import { axiosSecure } from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const { user, logOut } = useContext(AuthContext);
  console.log("got user: ",user);

  //For Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = ()=>{
    setIsModalOpen(false);
  }
  const modalHandler = async () => {
    console.log('I want to be a Creator')
    closeModal()
    try {
      const currentUser = {
        email: user?.email,
        role: 'user',
        status: 'Requested',
      }
      const { data } = await axiosSecure.put(`/user`, currentUser)
      console.log(data)
      if (data.modifiedCount > 0) {
        toast.success('Success! Please wait for admin to accept')
      } else {
        toast.success('Please!, Wait for the admin to accept your request')
      }
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    } finally {
      closeModal()
    }
  }

  //Theme toggle
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="navbar bg-[#41A5D2] font-mulish text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#41A5D2] rounded-box w-52"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              
              <li>
                <Link to="/allContests">All Contests</Link>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Conformz</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/allContests">All Contests</Link>
            </li>
          </ul>
        </div>
        {!user && (
          <div className="navbar-end">
            <input
              type="checkbox"
              onChange={handleToggle}
              checked={theme === "light" ? false : true}
              className="toggle mr-5"
            />
            <Link
              to="/login"
              className="btn px-8 bg-[#FBBF77] border-none text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn px-8 ml-4 bg-[#B7410e] border-none text-white"
            >
              Register
            </Link>
          </div>
        )}

        {user && (
          <div className="navbar-end">
            <button className="btn btn-secondary mr-5"
            onClick={()=>{
              setIsModalOpen(true)
            }}>
              Become A Creator
            </button>
            {/* Modal */}
            <CreatorReqModal 
            isOpen={isModalOpen}
            closeModal={closeModal}
            modalHandler={modalHandler}
            >
            </CreatorReqModal>

            <input
              type="checkbox"
              onChange={handleToggle}
              checked={theme === "light" ? false : true}
              className="toggle mr-5"
            />
            <div className="dropdown dropdown-end mr-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div title={user?.displayName} className="w-16 rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm bg-[#41A5D2] dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52"
              >
                <li className="text-black font-semibold text-lg text-center">
                  {user.displayName}
                </li>
                <div className="divider"></div>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="text-red-700 font-bold">
                  <Link onClick={logOut}><IoIosLogOut className="text-lg"></IoIosLogOut> Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
