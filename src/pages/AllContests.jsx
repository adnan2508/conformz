import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import Contest from "../components/Contest";
import UseAxiosCommon from "../hooks/UseAxiosCommon";

const categories = [
  "All",
  "Image Design",
  "Article Writing",
  "Marketing Strategy",
  "Digital Advertisement",
  "Gaming Review",
  "Business Idea",
];

const AllContests = () => {
  const axiosCommon = UseAxiosCommon();
  const [selectedTab, setSelectedTab] = useState(0);

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/contests/accepted`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if(contests){
    console.log("contest data from all contests page: ", contests);
  }

  const filterContests = (category) => {
    if (category === "All") {
      return contests;
    }
    return contests.filter((contest) => contest.contestType === category);
  };

  return (
    <div>
      <Helmet>
        <title>Conformz | All Contests</title>
      </Helmet>
      <h2 className="text-center text-4xl my-5 font-bold">All Contests</h2>

      <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
        <TabList>
          {categories.map((category, index) => (
            <Tab key={index}>{category}</Tab>
          ))}
        </TabList>

        {categories.map((category, index) => (
          <TabPanel key={index}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {filterContests(category).length > 0 ? (
                filterContests(category).map((contest) => (
                  <Contest key={contest._id} contest={contest} />
                ))
              ) : (
                <h2 className="text-center">No Contests available</h2>
              )}
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default AllContests;
