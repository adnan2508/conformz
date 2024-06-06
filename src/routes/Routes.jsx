import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home.jsx';
import NotFound from '../pages/NotFound.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Secret from '../components/Secret.jsx';
import Main from "../layouts/Main.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";

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
        path: "/secret",
        element: <PrivateRoutes><Secret /></PrivateRoutes>,
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
])