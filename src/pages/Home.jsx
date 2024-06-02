import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="font-mulish">
      <Navbar />
      <div className="w-11/12 mx-auto">
        <h2>This is home</h2>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
