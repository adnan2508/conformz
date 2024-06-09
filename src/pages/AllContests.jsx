import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import Contest from "../components/Contest";
import UseAxiosCommon from "../hooks/UseAxiosCommon";

const AllContests = () => {
  const axiosCommon = UseAxiosCommon();
  const [loading, setLoading] = useState(false);

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/contests`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;


  return (
    <div>
      <Helmet>
        <title>Conformz | All Contests</title>
      </Helmet>
      <h2 className="text-center text-4xl my-5 font-bold">All contests</h2>

      {contests && contests.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {contests.map((contest) => (
            <Contest key={contest._id} contest={contest} />
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-center">No Contests available</h2>
        </div>
      )}

    </div>
  );
};

export default AllContests;
