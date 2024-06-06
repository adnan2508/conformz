import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProviders';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if (loading) return <p>Loading... </p>
    if (user) return children

    return <Navigate to='/login' state={location.pathname} replace={true}/>
};

export default PrivateRoutes;



// import  { useContext } from 'react';
// import { AuthContext } from '../providers/AuthProviders';
// import { Navigate,  } from 'react-router-dom';
// import { verifyToken } from '../helpers/verifyToken';

// const PrivateRoutes = (children, role) => {
//     const {  logOut} = useContext(AuthContext);
//     const token = localStorage.getItem("token");

//     let user;
//     if (user) {
//       user = verifyToken(token);
//     }
//     if (role !== undefined && role !== user?.role) {
//       logOut()
//         return <Navigate to="/login" replace={true} />;
//     }
//       if (!token) {
//         return <Navigate to="/login" replace={true} />;
//       }
//       return children;
// };

// export default PrivateRoutes;


