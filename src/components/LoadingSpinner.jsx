import { SyncLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      
      <SyncLoader size={100} color="#41A5D2"/>
    </div>
  );
};

export default LoadingSpinner;