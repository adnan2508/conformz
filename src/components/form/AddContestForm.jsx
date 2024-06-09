import { useState } from "react";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';

const AddContestForm = ({dates, handleDates}) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    }
  ]);

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50 p-5">
      <form>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="location" className="block text-gray-600">
                Contest Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-[#41A5D2] focus:outline-[#2e7495] rounded-md"
                name="contestName"
                id="contestName"
                type="text"
                placeholder="Contest Name"
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
              >
                <option>Image Design</option>
                <option>Article Writing</option>
                <option>Marketing Strategy</option>
                <option>Digital advertisement</option>
                <option>Gaming Review</option>
                <option>Business Idea</option>
                {/* {categories.map(category => (
                  <option value={category.label} key={category.label}>
                    {category.label}
                  </option>
                ))} */}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="location" className="block text-gray-600">
                Select Availability Range
              </label>
              {/* Calender */}
              <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                  handleDates(item);
                  setState([item.selection]
                  )}}
                moveRangeOnFirstSelection={false}
                ranges={state}/>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="title" className="block text-gray-600">
                Task Submission text instruction
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-[#41A5D2] focus:outline-[#2e7495] rounded-md "
                name="taskSubmission"
                id="taskSubmission"
                type="text"
                placeholder="Task Submission"
                required
              />
            </div>

            <div className=" p-4 bg-white w-full  m-auto rounded-lg">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-[#41A5D2] text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-[#035479]">
                      Upload Image
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600">
                  Contest Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-[#41A5D2] focus:outline-[#2e7495] rounded-md "
                  name="contestPrice"
                  id="contestPrice"
                  type="number"
                  placeholder="Contest Price"
                  required
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="guest" className="block text-gray-600">
                  Prize Money
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-[#41A5D2] focus:outline-[#2e7495] rounded-md"
                  name="prize"
                  id="guest"
                  type="number"
                  placeholder="Prize Money"
                  required
                />
              </div>
            </div>

            {/* <div className='flex justify-between gap-2'>
              <div className='space-y-1 text-sm'>
                <label htmlFor='bedrooms' className='block text-gray-600'>
                  Bedrooms
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-[#41A5D2] focus:outline-[#2e7495] rounded-md '
                  name='bedrooms'
                  id='bedrooms'
                  type='number'
                  placeholder='Bedrooms'
                  required
                />
              </div>

              <div className='space-y-1 text-sm'>
                <label htmlFor='bathrooms' className='block text-gray-600'>
                  Bathrooms
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-[#41A5D2] focus:outline-[#2e7495] rounded-md'
                  name='bathrooms'
                  id='bathrooms'
                  type='number'
                  placeholder='Bathrooms'
                  required
                />
              </div>
            </div> */}

            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Contest Description
              </label>

              <textarea
                id="contestDescription"
                className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-[#41A5D2] focus:outline-[#2e7495]"
                name="contestDescription"
              ></textarea>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-[#41A5D2]"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
};

export default AddContestForm;
