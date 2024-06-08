import { useContext, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProviders';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

const useAxiosSecure = () => {
  const {logOut} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      res => {
        return res;
      },
      async error => {
        console.log("error tracked", error.response)
        if(error.response.status === 401 || error.response.status === 403) {
          await logOut()
          navigate('/login')
        }
        return Promise.reject(error)
      }
    )
  }, [logOut, navigate])

  return axiosSecure
};

export default useAxiosSecure;