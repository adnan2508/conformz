import React, { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { imageUpload } from '../../api/utils/index.js';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';

const UpdateMyContest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState('Upload Image');
  const [loading, setLoading] = useState(false);

  // Fetch Contest Data
  const { data: contest, isLoading, refetch } = useQuery({
    queryKey: ['contest', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-contest/update/${id}`);
      return data;
    },
    onSuccess: (data) => {
      setState([
        {
          startDate: new Date(data.from),
          endDate: new Date(data.to),
          key: 'selection',
        },
      ]);
      setImagePreview(data.image);
      setImageText(data.image ? 'Change Image' : 'Upload Image');
    },
  });

  useEffect(() => {
    if (!isLoading && contest) {
      setState([
        {
          startDate: new Date(contest.from),
          endDate: new Date(contest.to),
          key: 'selection',
        },
      ]);
      setImagePreview(contest.image);
      setImageText(contest.image ? 'Change Image' : 'Upload Image');
    }
  }, [contest, isLoading]);

  const handleDates = (item) => {
    setState([item.selection]);
  };

  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };

  const { mutateAsync: updateContest } = useMutation({
    mutationFn: async (contestData) => {
      const { data } = await axiosSecure.put(`/contest/${id}`, contestData);
      return data;
    },
    onSuccess: () => {
      toast.success('Contest Updated Successfully!');
      navigate('/dashboard/my-created-contest');
      setLoading(false);
    },
    onError: (error) => {
      toast.error(`Update failed: ${error.message}`);
      setLoading(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const contestName = form.contestName.value;
    const contestType = form.contestType.value;
    const taskSubmission = form.taskSubmission.value;
    const to = state[0].endDate;
    const from = state[0].startDate;
    const contestPrice = form.contestPrice.value;
    const prize = form.prize.value;
    const contestDescription = form.contestDescription.value;
    const image = form.image.files[0];

    try {
      const image_url = image ? await imageUpload(image) : contest.image;
      const updatedContestData = {
        creatorImage: contest.creatorImage,
        creatorEmail: contest.creatorEmail,
        contestName,
        contestType,
        taskSubmission,
        to,
        from,
        contestPrice,
        prize,
        contestDescription,
        image: image_url,
        totalParticipant: contest.totalParticipant,
        status: contest.status,
        comments: contest.comments,
        winnerId: contest.winnerId,
        winnerName: contest.winnerName,
        winnerEmail: contest.winnerEmail,
        winnerImage: contest.winnerImage,
      };

      await updateContest(updatedContestData);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50 p-5">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="contestName" className="block text-gray-600">
                Contest Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-[#41A5D2] focus:outline-[#2e7495] rounded-md"
                name="contestName"
                id="contestName"
                type="text"
                placeholder="Contest Name"
                defaultValue={contest.contestName}
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="contestType" className="block text-gray-600">
                Contest Type
              </label>
              <select
                required
                className="w-full px-4 py-3 border border-[#41A5D2] focus:outline-[#2e7495] rounded-md"
                name="contestType"
                placeholder="Contest Type"
                defaultValue={contest.contestType}
              >
                <option>Image Design</option>
                <option>Article Writing</option>
                <option>Marketing Strategy</option>
                <option>Digital advertisement</option>
                <option>Gaming Review</option>
                <option>Business Idea</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="location" className="block text-gray-600">
                Select Availability Range
              </label>
              <DateRange
                editableDateInputs={true}
                onChange={(item) => handleDates(item)}
                moveRangeOnFirstSelection={false}
                ranges={state}
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="taskSubmission" className="block text-gray-600">
                Task Submission text instruction
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-[#41A5D2] focus:outline-[#2e7495] rounded-md"
                name="taskSubmission"
                id="taskSubmission"
                type="text"
                placeholder="Task Submission"
                defaultValue={contest.taskSubmission}
                required
              />
            </div>

            <div className="p-4 bg-white w-full m-auto rounded-lg flex justify-between items-center">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      onChange={(e) => handleImage(e.target.files[0])}
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-[#41A5D2] text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-[#035479]">
                      {imageText.length > 20
                        ? imageText.split('.')[0].slice(0, 15) + '.....' + imageText.split('.')[1]
                        : imageText}
                    </div>
                  </label>
                </div>
              </div>
              <div>
                <div className="h-16 w-16 object-cover overflow-hidden flex items-center">
                  {imagePreview && <img src={imagePreview} alt="Preview" />}
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="contestPrice" className="block text-gray-600">
                  Contest Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-[#41A5D2] focus:outline-[#2e7495] rounded-md"
                  name="contestPrice"
                  id="contestPrice"
                  type="number"
                  placeholder="Contest Price"
                  defaultValue={contest.contestPrice}
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="prize" className="block text-gray-600">
                  Prize Money
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-[#41A5D2] focus:outline-[#2e7495] rounded-md"
                  name="prize"
                  id="prize"
                  type="number"
                  placeholder="Prize Money"
                  defaultValue={contest.prize}
                  required
                />
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="contestDescription" className="block text-gray-600">
                Contest Description
              </label>
              <textarea
                id="contestDescription"
                className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800 border border-[#41A5D2] focus:outline-[#2e7495]"
                name="contestDescription"
                placeholder="Contest Description"
                defaultValue={contest.contestDescription}
              ></textarea>
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-[#41A5D2]"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
};

export default UpdateMyContest;
