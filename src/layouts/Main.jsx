import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="w-11/12 mx-auto font-mulish">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
