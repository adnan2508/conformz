import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Secret from "../components/Secret.jsx";
import Main from "../layouts/Main.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import AllContests from "../pages/AllContests.jsx";
import ContestDetails from "../pages/ContestDetails.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import AddContest from "../pages/creator/AddContest.jsx";
import MyCreatedContest from "../pages/creator/MyCreatedContest.jsx";
import ContestSubmitted from "../pages/creator/ContestSubmitted.jsx";
import MyProfile from "../pages/user/MyProfile.jsx";
import MyParticipatedContest from "../pages/user/MyParticipatedContest.jsx";
import WinningContest from "../pages/user/WinningContest.jsx";
import ManageUsers from "../pages/admin/ManageUsers.jsx";
import ManageContest from "../pages/admin/ManageContest.jsx";
import UpdateMyContest from "../pages/creator/UpdateMyContest.jsx";
import PaymentSuccess from "../components/PaymentSuccess.jsx";
import SubmitAnswer from "../pages/user/SubmitAnswer.jsx";
import ContestDetailsPage from "../pages/creator/ContestDetailsPage.jsx";
import LeaderBoard from "../pages/LeaderBoard.jsx";
import AboutUs from "../pages/AboutUs.jsx";
// import Payments from "../pages/Payments.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allContests",
        element: <AllContests />,
      },
      {
        path: "/leader-board",
        element: <LeaderBoard />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: 'payment/success/:tranId',
        element: <PaymentSuccess></PaymentSuccess>
      },
      {
        path: "/contest/:id",
        element: (
          <PrivateRoutes>
            <ContestDetails />
          </PrivateRoutes>
        ),
      },
      // {
      //   path: "/contest/registration/:id",
      //   element: (
      //     <PrivateRoutes>
      //       <Payments />
      //     </PrivateRoutes>
      //   ),
      // },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "add-contest",
        element: <AddContest />,
      },
      {
        path: "my-created-contest",
        element: <MyCreatedContest />,
      },
      {
        path: "contest-submitted",
        element: <ContestSubmitted />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "my-participated-contest",
        element: <MyParticipatedContest />,
      },
      {
        path: "contest/submit/:id",
        element: <SubmitAnswer />,
      },
      {
        path: "contest-details-submissions/:id",
        element: <ContestDetailsPage />,
      },
      {
        path: "my-winning-contest",
        element: <WinningContest />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-contest",
        element: <ManageContest />,
      },
      {
        path:"my-contest/update/:id",
        element: <UpdateMyContest></UpdateMyContest>
      }
    ],
  },
]);
