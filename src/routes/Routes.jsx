import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home.jsx';
import NotFound from '../pages/NotFound.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Secret from '../components/Secret.jsx';
import Main from "../layouts/Main.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx"; 
import AllContests from "../pages/AllContests.jsx";
import ContestDetails from "../pages/ContestDetails.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import AddContest from "../pages/creator/AddContest.jsx";
import MyCreatedContest from "../pages/creator/MyCreatedContest.jsx";
import ContestSubmitted from "../pages/creator/ContestSubmitted.jsx";
import MyProfile from "../pages/user/MyProfile.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound/>,
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
        path: "/contest/:id",
        element: <PrivateRoutes><ContestDetails /></PrivateRoutes>,
      },
    ]
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
    ],
  },
])