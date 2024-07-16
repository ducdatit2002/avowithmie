import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/actions/actionUser";
import Transition from "@/utils/Transition";
import { FiPlus } from "react-icons/fi";

import { UserTable } from "./UserTable";
import { SheetAddUser } from "./SheetAddUser"; // Import SheetAddUser component

import IconButton from "../components/IconButton";

const Users = () => {
  const users = useSelector(state => state.users.users || []); 
  const dispatch = useDispatch();
  const [showAddUser, setShowAddUser] = useState(false); // State to manage the SheetAddUser visibility

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    setShowAddUser(true); // Set the state to true to open the sheet
  };

  const handleCloseAddUser = () => {
    setShowAddUser(false); // Set the state to false to close the sheet
  };

  return (
    <>
      <div className="relative">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <p className="text-3xl not-italic font-bold text-black">Users</p>
          <div className="flex items-center gap-4">
            <IconButton
              icon={FiPlus}
              label="Add User"
              onClick={handleAddUser}
              className="bg-blue_super_dark text-white rounded px-3 py-1.5 hover:bg-blue_dark"
            />
          </div>
        </div>
        <div className="flex items-center justify-between p-4 ">
          <p className="text-xl not-italic text-black ">
            Number of Users: {users.length}
          </p>
        </div>
        <SheetAddUser isOpen={showAddUser} onClose={handleCloseAddUser} />

        <Transition className="flex flex-col p-4">
          <UserTable users={users} />
        </Transition>
      </div>
    </>
  );
};

export default Users;
