import { Helmet } from 'react-helmet';
import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { AuthContext } from '../../providers/AuthProviders'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import LoadingSpinner from '../../components/LoadingSpinner'
import ContestTableRow from './ContestTableRow';


const ManageContest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  //   Fetch Contests Data
  const { data: contests = [], isLoading, refetch } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/contests`);
      return data;
    },
  });
  if(!isLoading){
    console.log("all contest: ", contests);
  }

  // console.log(contests);

  //   delete
  const { mutateAsync } = useMutation({
    mutationFn: async id => {
      const { data } = await axiosSecure.delete(`/contest/${id}`)
      return data
    },
    onSuccess: data => {
      console.log(data)
      refetch()
      toast.success('Successfully deleted.')
    },
    
  })

  //  Handle Delete
  const handleDelete = async id => {
    console.log(id)
    try {
      await mutateAsync(id)
    } catch (err) {
      console.log(err)
    }
  }

 if (isLoading) return <LoadingSpinner />

  return (
    <div>
      <Helmet>
        <title>My created contest</title>
      </Helmet>

      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Status
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Price
                    </th>
                    {/* <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      From
                    </th> */}
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Deadline
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Delete
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Comment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Contest row data */}
                  {
                    contests?.map(contest=>(
                      <ContestTableRow 
                      key={contest._id}
                      contest={contest}
                      refetch={refetch}
                      />
                    ))
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageContest;