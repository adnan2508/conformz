import React, { useContext } from "react";
import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { BsFillHouseAddFill, BsFingerprint } from "react-icons/bs";
import { IoIosAddCircle } from "react-icons/io";
import { GrUserAdmin } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProviders";
import { MdHomeWork } from "react-icons/md";
import { HiClipboardList } from "react-icons/hi";
import { IoListCircle } from "react-icons/io5";
import UseRole from "../../../hooks/useRole";
import MenuItem from "./menu/MenuItem";
import { FaUserCog } from "react-icons/fa";
import { FaAlignLeft } from "react-icons/fa6";
import { FaAward } from "react-icons/fa6";
import { FaBookOpenReader } from "react-icons/fa6";
import UserMenu from "./menu/UserMenu";
import CreatorMenu from "./menu/CreatorMenu";
import AdminMenu from "./menu/AdminMenu";


const Sidebar = () => {
  const { logOut } = useContext(AuthContext);
  const [isActive, setActive] = useState(false);
  const [role, isLoading] = UseRole();
  console.log(role);
  const navigate = useNavigate();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleLogout=()=>{
    logOut();
    navigate('/');
  }
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-[#41A5D2] font-mulish text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <h2 className="text-[#ffffff] text-3xl">Conformz</h2>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#41A5D2] w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-[#ffffff] mx-auto">
              <Link to="/">
                <h2 className="text-[#41A5D2] text-3xl">Conformz</h2>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {/* Statistics */}
              {/* <NavLink
                to='statistics'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-[#0c80b6]   hover:text-white ${
                    isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <BsGraphUp className='w-5 h-5' />

                <span className='mx-4 font-medium'>Statistics</span>
              </NavLink> */}

              {/* Creator menu */}
              {/* Add Contest */}
              {/* <MenuItem
                label={"Add Contest"}
                address="/dashboard/add-contest"
                icon={IoIosAddCircle}
              /> */}
              {/* <NavLink
                to='add-contest'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-[#0c80b6]   hover:text-white ${
                    isActive ? 'bg-[#0c80b6]  text-white' : 'text-gray-600'
                  }`
                }
              >
                <IoIosAddCircle className='w-5 h-5' />
                <span className='mx-4 font-medium'>Add Contest</span>
              </NavLink> */}
              {/* My Created Contest */}
              {/* <MenuItem
                label={"My Created Contest"}
                address="/dashboard/my-created-contest"
                icon={HiClipboardList}
              /> */}
              {/* <NavLink
                to='my-created-contest'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-[#0c80b6]   hover:text-white ${
                    isActive ? 'bg-[#0c80b6]  text-white' : 'text-gray-600'
                  }`
                }
              >
                <HiClipboardList className='w-5 h-5' />
                <span className='mx-4 font-medium'>My Created Contest</span>
              </NavLink> */}

              {/*Contest Submitted*/}
              {/* <MenuItem
                label={"Contest Submitted"}
                address="/dashboard/contest-submitted"
                icon={IoListCircle}
              /> */}

              {/* <NavLink
                to='contest-submitted'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-[#0c80b6]   hover:text-white ${
                    isActive ? 'bg-[#0c80b6]  text-white' : 'text-gray-600'
                  }`
                }
              >
                <IoListCircle  className='w-5 h-5' />
                <span className='mx-4 font-medium'>Contest Submitted</span>
              </NavLink> */}

              {/* <MenuItem
                icon={FaUserCog}
                label="Manage Users"
                address="manage-users"
              />

              <MenuItem
                icon={FaAlignLeft}
                label="Manage Contest"
                address="manage-contest"
              /> */}
              {/* user section */}
              {role === 'user' && <UserMenu/>}
              {role === 'creator' && <CreatorMenu/>}
              {role === 'admin' && <AdminMenu/>}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          {/* <NavLink
            to='/dashboard/my-profile'
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-[#0c80b6]   hover:text-white ${
                isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
              }`
            }
          >
            <FcSettings className='w-5 h-5' />

            <span className='mx-4 font-medium'>Profile</span>
          </NavLink> */}

          <button
            onClick={()=>handleLogout()}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-[#0c80b6]   hover:text-white transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
