import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Directly check local storage for the token
  const token = localStorage.getItem('x-auth-token');

  console.log("Token in PrivateRoute:", token);

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
