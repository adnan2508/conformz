import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div className="font-mulish">
      <Helmet>
        <title>Conformz | Home</title>
      </Helmet>
      <Navbar />
      <div className="w-11/12 mx-auto">
        <h2>This is home</h2>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
