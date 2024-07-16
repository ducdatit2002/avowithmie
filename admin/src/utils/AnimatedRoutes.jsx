import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../components/LoginPage/SignInPage";
import Users from "../components/Accounts/Users";
import PrivateRoute from "./PrivateRoute";
import Books from "@/components/Books/Books";
import Podcasts from "@/components/Podcasts/Podcasts";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route path="users" element={<Users />} />
          <Route path="book" element={<Books />} />
          <Route path="podcast" element={<Podcasts />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
