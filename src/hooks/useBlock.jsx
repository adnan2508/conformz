import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UseBlock = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: blockStatus = '', isLoading } = useQuery({
    queryKey: ["blockStatus"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`);
      return data.blockStatus;
    },
  });

  //Fetch user info using logged in user email

  return [blockStatus, isLoading];
};

export default UseBlock;
