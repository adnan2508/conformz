import { useState } from "react";
import AddContestForm from "../../components/form/AddContestForm";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddContest = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: null,
    key: "selection",
  });

  //Date range handler
  const handleDates = (item) => {
    console.log(item);
    setDates(item.selection);
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (roomData) => {
      const { data } = await axiosSecure.post(`/contests`, roomData);
      return data;
    },
    onSuccess: () => {
      console.log("Data Saved Successfully");
      toast.success("Contest Added Successfully!");
      navigate("/dashboard/my-created-contest");
      setLoading(false);
    },
  });

  return (
    <div className="">
      <AddContestForm
        dates={dates}
        handleDates={handleDates}
        // handleSubmit={handleSubmit}
        // setImagePreview={setImagePreview}
        // imagePreview={imagePreview}
        // handleImage={handleImage}
        // imageText={imageText}
        loading={loading}
      />
    </div>
  );
};

export default AddContest;
