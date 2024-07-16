// components/HeaderWithExport.jsx
const HeaderWithExport = ({ title, itemCount, rightContent}) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-between px-4 py-2 ">
        <p className="text-m not-italic text-black">
          Number of {title}: {itemCount}
        </p>
        <div className="flex items-center gap-4">
        {rightContent}
      </div>
      </div>
    </div>
  );
};

export default HeaderWithExport;
