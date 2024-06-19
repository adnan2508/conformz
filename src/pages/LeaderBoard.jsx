import React, { useState, useEffect, useContext } from 'react';
import { IoDiamondSharp } from 'react-icons/io5';
import { AuthContext } from '../providers/AuthProviders';
import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from '../hooks/useAxiosSecure';

const LeaderBoard = () => {
    const { user } = useContext(AuthContext);
    const [myPosition, setMyPosition] = useState(0);
    const [myData, setMyData] = useState([]);
    let sortedLeaderBoardData;



    const { data: leaderBoardData = [], refetch } = useQuery({
        queryKey: ["userData", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/leader-board/all-user`);
            return data;
        },
    });

    if (leaderBoardData) {
        console.log("leaderboard data: ", leaderBoardData);
    }

    const [currentUserPosition, setCurrentUserPosition] = useState(null);


    if (leaderBoardData) {
        sortedLeaderBoardData = [...leaderBoardData].sort((a, b) => b.totalWinning - a.totalWinning);
    }

    useEffect(() => {
        if (sortedLeaderBoardData) {
            const currentUserEmail = user?.email;
            const userPosition = sortedLeaderBoardData.findIndex(user => user.email === currentUserEmail);

            setCurrentUserPosition(userPosition + 1);

            const currentUserData = sortedLeaderBoardData.find(user => user.email === currentUserEmail);
            setMyData(currentUserData);
        }
    }, [leaderBoardData, user, sortedLeaderBoardData]);




    return (
        <div className='w-full bg-slate-200 p-10'>
            <div className='flex gap-5 justify-center items-center'>
                <div className='w-2/3 min-h-[500px] border border-black rounded-lg p-5'>
                    {/* <div className='border border-success mb-10 p-10 bg-purple-400'>
                        <div className='h-32 bg-base-200 flex items-center w-full rounded bg-gradient-to-r from-yellow-500 to-purple-700'>
                            <div className='w-1/6 text-center text-2xl'>{currentUserPosition}</div>
                            <div className='w-4/6 flex items-center gap-2'>
                                <img src={myData?.photoURL} alt='' className='h-[50px] w-[50px] rounded-full' /><p className='text-2xl font-bold'>{myData?.name}</p>
                            </div>
                            <div className='w-1/6 text-center text-3xl'>{myData?.totalWinning}<IoDiamondSharp className='inline text-5xl text-yellow-500' /></div>
                        </div>
                    </div> */}
                    <div className='mt-10   mb-10 p-10 bg-purple-400'>
                        {sortedLeaderBoardData?.map((data, index) => (
                            <div key={index} className=' bg-purple-200 h-32 bg-base-200 flex items-center w-full my-2 rounded'>
                                <div className='w-1/6 text-center text-2xl'>{index + 1}</div>
                                <div className='w-4/6  flex items-center gap-3'>
                                    <img src={data.photoURL} alt='' className='h-[50px] w-[50px] rounded-full' />
                                    <p className='text-2xl font-bold'>{data.name}</p>
                                </div>
                                <div className='w-1/6  text-center text-3xl'>{data.totalWinning} <IoDiamondSharp className='inline text-5xl text-yellow-500' /></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaderBoard;
