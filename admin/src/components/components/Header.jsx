// components/Header.jsx
import IconButton from "./IconButton";
import { FiUpload, FiPlus } from "react-icons/fi";

const Header = ({ title, handleFileUpload, handleAdd, itemType }) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <p className="text-3xl not-italic font-bold text-black">{title}</p>
        <div className="flex items-center gap-4">
          <IconButton
            icon={FiUpload}
            label="Import"
            onClick={handleFileUpload}
            className="border rounded px-3 py-1 bg-white text-blue_super_dark border-blue_super_dark hover:bg-blue_super_dark hover:text-white"
          />
          <IconButton
            icon={FiPlus}
            label={`Add 1 ${itemType}`}
            onClick={handleAdd}
            className="bg-blue_super_dark text-white rounded px-3 py-1.5 hover:bg-blue_dark"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
