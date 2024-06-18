import React, { useContext, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../providers/AuthProviders";
import UseRole from "../../hooks/useRole";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomActiveShapePieChart from "./CustomActiveShapePieChart";
import ProfileUpdateModal from "./ProfileUpdateModal";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [role, isLoading] = UseRole();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: userData = {}, refetch } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/${user?.email}`);
      return data;
    },
  });

  if (isLoading || !userData) return <LoadingSpinner />;

  const chartData = [
    { name: 'Winning', value: userData.totalWinning },
    { name: 'Unsuccessful', value: userData.totalParticipation - userData.totalWinning },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col justify-center items-center">
      {/* <Helmet>
        <title>Profile</title>
      </Helmet> */}
      <div className="bg-white shadow-lg rounded-2xl w-3/5">
        <img
          alt="profile"
          src="https://wallpapercave.com/wp/wp10784415.jpg"
          className="w-full mb-4 rounded-t-lg h-36"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white "
            />
          </a>

          <p className="p-2 px-4 uppercase text-xs text-white bg-pink-500 rounded-full">
            {role}
          </p>
          <p className="mt-2 text-xl font-medium text-gray-800 ">
            User Id: {user?.uid}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-black ">
                  {user?.displayName}
                </span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black ">{user?.email}</span>
              </p>

              <div>
                <button onClick={openModal} className="bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[400px] w-[500px] border rounded-lg my-10">
        <h1 className="text-center font-bold text-3xl mt-5">Winning Ratio Charts</h1>
        <CustomActiveShapePieChart data={chartData} />
      </div>

      <ProfileUpdateModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        userData={userData}
        refetch={refetch}
      />
    </div>
  );
};

export default MyProfile;
