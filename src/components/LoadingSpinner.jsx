import { SyncLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="p-5 flex flex-col justify-center items-center">
      
      <SyncLoader size={10} color="black"/>
    </div>
  );
};

export default LoadingSpinner;

// #41A5D2