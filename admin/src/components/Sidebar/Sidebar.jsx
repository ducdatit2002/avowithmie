import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/actionAuth';
import sidebarConfig from '../../constants/SidebarConfig';
import logo from '../../assets/logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import { RiLogoutBoxLine } from 'react-icons/ri';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };
    return (
        <div className="relative">
<div className="fixed">
<button className="text-3xl text-gray-700 p-4 md:hidden absolute" onClick={toggleSidebar}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div className={`flex flex-col w-64 h-screen shadow-md bg-black absolute md:static md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:transition-none transition-transform duration-300 ease-in-out z-50`}>
                <div className="mx-2 px-1 py-4 overflow-auto">
                    <img src={logo} alt="" className="w-32 h-32 mx-auto my-4" />
                    <ul className="space-y-0.5">
                        {sidebarConfig.map((section) => (
                            <React.Fragment key={section.title}>
                                <h1 className="text-lg font-bold text-gray px-2">{section.title}</h1>
                                {section.links.map(({ to, label, Icon }) => (
                                    <li key={to} onClick={closeSidebar}>
                                        <Link to={to} className="flex items-center p-2 hover:bg-blur hover:text-orange rounded-lg space-x-2 text-white_blue">
                                            <Icon className="text-xl" />
                                            <span>{label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </React.Fragment>
                        ))}
                        <li onClick={handleLogout} className="flex items-center p-2 hover:bg-blur hover:text-orange rounded-lg space-x-2 text-white_blue cursor-pointer">
                            <RiLogoutBoxLine className="text-xl" />
                            <span>Logout</span>
                        </li>
                    </ul>
                </div>
            </div>
</div>
        </div>
    );
};

export default Sidebar;
