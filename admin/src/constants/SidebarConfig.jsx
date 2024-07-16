import { MdCastForEducation } from 'react-icons/md';
import { IoBookOutline } from 'react-icons/io5';
import { RiAccountCircleLine } from 'react-icons/ri';


const sidebarConfig = [
    {
        title: "MANAGEMENT",
        links: [
            { to: "/podcast", label: "Podcast", Icon: MdCastForEducation },
            { to: "/book", label: "Book", Icon: IoBookOutline },
            { to: "/users", label: "Users Management", Icon: RiAccountCircleLine },
        ]
    }
];

export default sidebarConfig;
