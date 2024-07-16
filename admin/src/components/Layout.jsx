import Transition from "@/utils/Transition";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const Layout = () => {
  return (
    <Transition className="flex ">
      <Sidebar />
      <div className="flex-1 md:pl-64">
        <Outlet />
      </div>
    </Transition>
  );
};

export default Layout;
