import { useContext, useState } from "react";
import AddContestForm from "../../components/form/AddContestForm";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import { imageUpload } from "../../api/utils/index.js";
import { Helmet } from "react-helmet";

const AddContest = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState("Upload Image");
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  //Date range handler
  const handleDates = (item) => {
    console.log(item);
    setDates(item.selection);
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (contestData) => {
      const { data } = await axiosSecure.post(`/contest`, contestData);
      return data;
    },
    onSuccess: () => {
      console.log("Data Saved Successfully");
      toast.success("Contest Added Successfully!");
      navigate("/dashboard/my-created-contest");
      setLoading(false);
    },
  });

  // Form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const contestName = form.contestName.value;
    const contestType = form.contestType.value;
    const taskSubmission = form.taskSubmission.value;
    const to = dates.endDate;
    const from = dates.startDate;
    const contestPrice = form.contestPrice.value;
    const prize = form.prize.value;
    const contestDescription = form.contestDescription.value;
    const image = form.image.files[0];

    const creator = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    try {
      const image_url = await imageUpload(image);
      const contestData = {
        contestName,
        contestType,
        taskSubmission,
        to,
        from,
        contestPrice,
        prize,
        creator,
        contestDescription,
        image: image_url,
      };
      console.table(contestData);

      //Post request on server
      await mutateAsync(contestData);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  // handle image change
  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | Add Contest</title>
      </Helmet>

      <AddContestForm
        dates={dates}
        handleDates={handleDates}
        handleSubmit={handleSubmit}
        setImagePreview={setImagePreview}
        imagePreview={imagePreview}
        handleImage={handleImage}
        imageText={imageText}
        loading={loading}
      />
    </>
  );
};

export default AddContest;
